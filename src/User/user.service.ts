import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from '../Entities/user.entity';
import { Repository } from 'typeorm';
import { IUser } from './Types/user';
import { UserExistsException } from '../Common/Errors';
import Utils from '../Common/utils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async register(user: Partial<IUser>) {
    // const oldUser: Omit<IUser, 'password'> =
    //   await this.usersRepository.findOneBy({ email: user.email });
    // if (oldUser) throw new UserExistsException();
    Object.assign(user, {
      soft_currency: Utils.generateRandomInt(5, 100),
      hard_currency: Utils.generateRandomInt(10, 1000),
    });
    await this.userRepository.save(user);
    return user;
  }
}
