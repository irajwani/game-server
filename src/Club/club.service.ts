import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Club from '../Entities/club.entity';
import { IUser } from '../User/Types/user';
import Constants from '../Common/constants';
import { InsufficientFundsException } from '../Common/Errors';

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(Club)
    private clubRepository: Repository<Club>,
  ) {}

  public async create(user: IUser, clubName: string): Promise<string> {
    if (user.hard_currency < Constants.CLUB_CREATION_COST)
      throw new InsufficientFundsException();
    const club = { createdBy: user.id, name: clubName };
    await this.clubRepository.create();

    return 'true';
  }
}
