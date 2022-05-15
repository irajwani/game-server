import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from '../Entities/user.entity';
import { Repository } from 'typeorm';
import { IUser } from './Types/user';
import {
  InsufficientPermissionException,
  InternalServerException,
  InvalidCredentialsException,
  PostgresErrorCodes,
  UserExistsException,
} from '../Common/Errors';
import Utils from '../Common/utils';
import * as bcrypt from 'bcrypt';
import { IUpdateUserWallet } from './Types/wallet';
import Token from '../Entities/token.entity';

const formatUser = (user) => ({
  ...user,
  password: undefined,
});

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
  ) {}

  public async register(user: Partial<IUser>): Promise<Partial<IUser>> {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    Object.assign(user, {
      soft_currency: Utils.generateRandomInt(5, 100),
      hard_currency: Utils.generateRandomInt(10, 1000),
      password: hashedPassword,
    });

    let newUser: IUser;
    try {
      newUser = await this.userRepository.save(user);
    } catch (error) {
      if (error?.code === PostgresErrorCodes.UniquePropViolation) {
        throw new UserExistsException();
      }
      throw new InternalServerException();
    }

    const tokenCode = await this.generateUserToken(newUser.id);
    Object.assign(newUser, { tokenCode });
    return formatUser(newUser);
  }

  private async getUserByEmail(email: string) {
    const user: IUser = await this.userRepository.findOneBy({
      email: email,
    });
    return user;
  }

  public async login({
    email,
    password,
  }: Record<string, string>): Promise<Omit<IUser, 'password'>> {
    const user = await this.getUserByEmail(email);
    await UserService.verifyPassword(password, user.password);
    const tokenCode = await this.getTokenByUser(user.id);
    Object.assign(user, { tokenCode });
    return formatUser(user);
  }

  static async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const doesPasswordMatch = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!doesPasswordMatch) {
      throw new InvalidCredentialsException();
    }
  }

  private async generateUserToken(user: string): Promise<string> {
    const tokenCode: string = Utils.generateToken();
    try {
      await this.tokenRepository.save({ tokenCode: tokenCode, userId: user });
    } catch (error) {
      throw new InternalServerException();
    }
    return tokenCode;
  }

  private async getTokenByUser(user: string): Promise<string> {
    let tokenCode;
    try {
      ({ tokenCode } = await this.tokenRepository.findOneBy({
        userId: user,
      }));
    } catch (error) {
      throw new InternalServerException();
    }
    return tokenCode;
  }

  public async getUserByToken(token: string): Promise<Omit<IUser, 'password'>> {
    try {
      const { userId }: Token = await this.tokenRepository.findOneBy({
        tokenCode: token,
      });
      return await this.userRepository.findOneBy({
        id: userId,
      });
    } catch (error) {
      throw new InsufficientPermissionException();
    }
  }

  public async updateUserWallet({
    userId,
    type,
    amount,
  }: IUpdateUserWallet): Promise<void> {
    try {
      await this.userRepository.increment({ id: userId }, type, amount);
    } catch (e) {
      throw new InternalServerException();
    }
  }
}
