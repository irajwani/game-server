import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import User from '../Entities/user.entity';
import Token from '../Entities/token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Token])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
