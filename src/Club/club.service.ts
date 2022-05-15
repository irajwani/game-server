import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Club from '../Entities/club.entity';
import { IUser } from '../User/Types/user';
import Constants from '../Common/constants';
import {
  ClubMemberExistsException,
  ClubMembersLimitReachedException,
  ClubNotFoundException,
  InsufficientFundsToCreateClubException,
  InsufficientFundsToJoinClubException,
} from '../Common/Errors';
import { UserService } from '../User/user.service';

const { CLUB_CREATION_COST, CLUB_ENTRY_COST, CLUB_MEMBERS_LIMIT } = Constants;

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(Club)
    private clubRepository: Repository<Club>,
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

  public async join(clubId: string, user: IUser): Promise<string> {
    const club = await this.clubRepository.findOneBy({ id: clubId });

    if (!club) throw new ClubNotFoundException();
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
    return club.id;
  }
}
