import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { uuid } from 'uuidv4';
import * as moment from 'moment';
import Club from '../Entities/club.entity';
import { IUser } from '../User/Types/user';
import Constants from '../Common/constants';
import {
  CannotDonateToOwnRequestException,
  ClubMemberExistsException,
  ClubMembersLimitReachedException,
  ClubNotFoundException,
  DonationRequestExpiredException,
  DonationRequestFulfilledException,
  DonationRequestNotFoundException,
  DonationRequestTooSoonException,
  InsufficientFundsException,
  InsufficientFundsToCreateClubException,
  InsufficientFundsToJoinClubException,
  NotClubMemberException,
} from '../Common/Errors';
import { UserService } from '../User/user.service';
import { IMessage } from './Types/message';
import { IDonationRequest } from './Types/donationRequest';
import DonationRequest from '../Entities/donation-request.entity';
import { IDonateResponse } from './Types/donateResponse';

const {
  CLUB_CREATION_COST,
  CLUB_ENTRY_COST,
  CLUB_MEMBERS_LIMIT,
  MANDATORY_MINUTES_SINCE_LAST_DONATION_REQUEST,
  DONATION_REQUEST_EXPIRATION_MINUTES,
  DONATION_REQUEST_AMOUNT,
} = Constants;

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(Club)
    private clubRepository: Repository<Club>,
    @InjectRepository(DonationRequest)
    private donationRequestRepository: Repository<DonationRequest>,
    private readonly userService: UserService,
  ) {}

  public async listClubs(): Promise<Club[]> {
    return await this.clubRepository.find();
  }

  public async getClub(clubId): Promise<Club> {
    const club = await this.clubRepository.findOneBy({ id: clubId });
    if (!club) throw new ClubNotFoundException();
    return club;
  }

  public async create(clubName: string, user: IUser): Promise<string> {
    if (user.hard_currency < CLUB_CREATION_COST)
      throw new InsufficientFundsToCreateClubException();

    const clubData: Partial<Club> = {
      createdBy: user.id,
      name: clubName,
      members: [user.id],
      messages: [],
    };
    const club = await this.clubRepository.save(clubData);
    await this.userService.updateUserWallet({
      userId: user.id,
      type: 'hard_currency',
      amount: -CLUB_CREATION_COST,
    });

    return club.id;
  }

  public async join(clubId: string, user: IUser): Promise<void> {
    const club = await this.getClub(clubId);
    if (club.members.includes(user.id)) throw new ClubMemberExistsException();

    if (club.members.length >= CLUB_MEMBERS_LIMIT)
      throw new ClubMembersLimitReachedException();

    if (user.soft_currency < CLUB_ENTRY_COST)
      throw new InsufficientFundsToJoinClubException();

    Object.assign(club, { members: [...club.members, user.id] });
    await this.clubRepository.update({ id: clubId }, club);
    await this.userService.updateUserWallet({
      userId: user.id,
      type: 'soft_currency',
      amount: -CLUB_ENTRY_COST,
    });
    return;
  }

  public async getMessages(clubId: string): Promise<IMessage[]> {
    const club = await this.getClub(clubId);
    return club.messages;
  }

  public async sendMessage(
    clubId: string,
    message: string,
    user: IUser,
  ): Promise<void> {
    const club = await this.getClub(clubId);
    if (!club) throw new ClubNotFoundException();
    if (!club.members.includes(user.id)) throw new NotClubMemberException();
    const newMessage = {
      id: uuid(),
      name: user.name,
      text: message,
      createdAt: new Date(),
    };
    await this.clubRepository.update(
      { id: clubId },
      { messages: [...club.messages, newMessage] },
    );
    return;
  }

  public async createDonationRequest(
    clubId: string,
    userId: string,
  ): Promise<IDonationRequest> {
    const club = await this.getClub(clubId);
    if (!club) throw new ClubNotFoundException();
    if (!club.members.includes(userId)) throw new NotClubMemberException();
    const lastDonationRequest = await this.donationRequestRepository.findOne({
      where: [{ clubId, userId }],
      order: { createdAt: 'DESC' },
    });

    let donated = 0;
    let excess = 0;
    let isFulfilled = false;

    if (lastDonationRequest) {
      const now = moment();
      if (
        now.diff(lastDonationRequest.createdAt, 'minutes') <
        MANDATORY_MINUTES_SINCE_LAST_DONATION_REQUEST
      )
        throw new DonationRequestTooSoonException();

      donated = ClubService.calculateDonatedFromExcess(lastDonationRequest);
      excess =
        ClubService.calculateUpdatedExcessFromExcess(lastDonationRequest);
      isFulfilled = donated === DONATION_REQUEST_AMOUNT;
    }

    const donationRequestData: Partial<IDonationRequest> = {
      userId,
      clubId,
      donated,
      excess,
      isFulfilled,
    };

    if (isFulfilled)
      await this.userService.updateUserWallet({
        userId: lastDonationRequest.userId,
        type: 'soft_currency',
        amount: DONATION_REQUEST_AMOUNT,
      });

    return await this.donationRequestRepository.save(donationRequestData);
  }

  private static calculateDonatedFromExcess(donationRequest: IDonationRequest) {
    let donated = 0;
    if (donationRequest && donationRequest.excess > 0) {
      if (donationRequest.excess > DONATION_REQUEST_AMOUNT) {
        return DONATION_REQUEST_AMOUNT;
      }
      donated += donationRequest.excess;
    }
    return donated;
  }

  private static calculateUpdatedExcessFromExcess(
    donationRequest: IDonationRequest,
  ) {
    if (donationRequest && donationRequest.excess > DONATION_REQUEST_AMOUNT) {
      return donationRequest.excess - DONATION_REQUEST_AMOUNT;
    }
    return 0;
  }

  public async donateToClub(
    donationRequestId: string,
    amount: number,
    user: IUser,
  ): Promise<IDonateResponse> {
    const donationRequest = await this.donationRequestRepository.findOneBy({
      id: donationRequestId,
    });

    if (!donationRequest) throw new DonationRequestNotFoundException();
    if (donationRequest.hasExpired) throw new DonationRequestExpiredException();
    if (donationRequest.isFulfilled)
      throw new DonationRequestFulfilledException();

    const club = await this.getClub(donationRequest.clubId);
    if (!club) throw new ClubNotFoundException();
    if (!club.members.includes(user.id)) throw new NotClubMemberException();

    const now = moment();
    if (
      now.diff(donationRequest.createdAt, 'minutes') >
      DONATION_REQUEST_EXPIRATION_MINUTES
    ) {
      await this.donationRequestRepository.update(
        { id: donationRequest.id },
        { hasExpired: true },
      );
      throw new DonationRequestExpiredException();
    }

    if (user.id === donationRequest.userId)
      throw new CannotDonateToOwnRequestException();

    if (user.soft_currency < amount) throw new InsufficientFundsException();

    const amountAfterDonation = donationRequest.donated + amount;
    const excess = amountAfterDonation - donationRequest.requested;
    const isFulfilled = amountAfterDonation >= DONATION_REQUEST_AMOUNT;

    await this.donationRequestRepository.update(
      { id: donationRequest.id },
      {
        donated:
          excess > 0 ? amountAfterDonation - excess : amountAfterDonation,
        excess: excess > 0 ? excess : 0,
        isFulfilled,
      },
    );

    await this.userService.updateUserWallet({
      userId: user.id,
      type: 'soft_currency',
      amount: -amount,
    });

    if (isFulfilled)
      await this.userService.updateUserWallet({
        userId: donationRequest.userId,
        type: 'soft_currency',
        amount: DONATION_REQUEST_AMOUNT,
      });

    return {
      id: donationRequest.id,
      clubId: donationRequest.clubId,
      isFulfilled,
      excess,
    };
  }
}
