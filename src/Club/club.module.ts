import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubController } from './club.controller';
import { ClubService } from './club.service';
import User from '../Entities/user.entity';
import Token from '../Entities/token.entity';
import Club from '../Entities/club.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Token, Club])],
  controllers: [ClubController],
  providers: [ClubService],
})
export class ClubModule {}
