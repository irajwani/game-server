import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubController } from './club.controller';
import { ClubService } from './club.service';
import Club from '../Entities/club.entity';
import { UserModule } from '../User/user.module';
import DonationRequest from '../Entities/donation-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Club, DonationRequest]), UserModule],
  controllers: [ClubController],
  providers: [ClubService],
})
export class ClubModule {}
