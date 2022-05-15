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
import { ProtectedResourceRequest } from '../Common/Types/protectedResourceRequest';
import { CreateClubRequestBody } from './Validation/createClubValidation.dto';
import { ClubIdRequestParams } from './Validation/ClubIdParamsValidation.dto';

@Controller('clubs')
@ApiTags('clubs')
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Get()
  public async listClubs(@Res() response?: Response) {
    const clubs = await this.clubService.listClubs();
    return response.status(HttpStatus.OK).json(clubs);
  }

  @Get(':clubId')
  public async getClub(
    @Param() params: ClubIdRequestParams,
    @Res() response?: Response,
  ) {
    const { clubId } = params;
    const club = await this.clubService.getClub(clubId);
    return response.status(HttpStatus.OK).json(club);
  }

  @Post()
  public async create(
    @Headers('token') token: string,
    @Req() request: ProtectedResourceRequest,
    @Body() body: CreateClubRequestBody,
    @Res() response?: Response,
  ) {
    const { user } = request;
    const { name: clubName } = body;
    const clubId = await this.clubService.create(clubName, user);
    return response
      .status(HttpStatus.OK)
      .json({ message: `Successfully created club with ID: ${clubId}` });
  }

  @Post(':clubId/join')
  public async joinClub(
    @Req() request: ProtectedResourceRequest,
    @Param() params: ClubIdRequestParams,
    @Res() response?: Response,
  ) {
    const { user } = request;
    const { clubId } = params;
    await this.clubService.join(clubId, user);
    return response.status(HttpStatus.OK).json({
      message: `User ${user.id} has successfully joined club with ID: ${clubId}`,
    });
  }
}
