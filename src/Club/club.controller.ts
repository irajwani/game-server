import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
  Req,
  Res,
  HttpStatus,
  Put,
  Patch,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ClubService } from './club.service';
import { CreateClubRequestBody } from './Validation/createClubValidation.dto';
import { ProtectedResourceRequest } from '../Common/Types/protectedResourceRequest';

@Controller('clubs')
@ApiTags('clubs')
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Post()
  public async create(
    @Headers('token') token: string,
    @Req() request: ProtectedResourceRequest,
    @Body() body: CreateClubRequestBody,
    @Res() response?: Response,
  ) {
    const { user } = request;
    const { name: clubName } = body;
    await this.clubService.create(user, clubName);
    return response
      .status(HttpStatus.OK)
      .json({ message: `Successfully created club with` });
  }
}
