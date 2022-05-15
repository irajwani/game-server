import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubController } from './club.controller';
import { ClubService } from './club.service';
import Club from '../Entities/club.entity';
import { UserModule } from '../User/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Club]), UserModule],
  controllers: [ClubController],
  providers: [ClubService],
})
export class ClubModule {}
