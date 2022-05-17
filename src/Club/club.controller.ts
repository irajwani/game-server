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
import { SendMessageRequestBody } from './Validation/sendMessageValidation.dto';
import * as moment from 'moment';
import Constants from '../Common/constants';
import { DonateToClubRequestBody } from './Validation/donateToClubValidation.dto';
import { DonationRequestIdRequestParams } from './Validation/DonationRequestIdParamsValidation.dto';

const { DONATION_REQUEST_EXPIRATION_MINUTES } = Constants;

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

  @Get(':clubId/messages')
  public async getMessages(
    @Param() params: ClubIdRequestParams,
    @Res() response?: Response,
  ) {
    const { clubId } = params;
    const messages = await this.clubService.getMessages(clubId);
    return response.status(HttpStatus.OK).json(messages);
  }

  @Post(':clubId/message')
  public async sendMessage(
    @Req() request: ProtectedResourceRequest,
    @Param() params: ClubIdRequestParams,
    @Body() body: SendMessageRequestBody,
    @Res() response?: Response,
  ) {
    const { user } = request;
    const { clubId } = params;
    const { message } = body;
    await this.clubService.sendMessage(clubId, message, user);
    return response.status(HttpStatus.OK).json({
      message: `Message: "${message}" has successfully been sent to club with ID: ${clubId}`,
    });
  }

  @Post(':clubId/donation-request')
  public async createDonationRequest(
    @Req() request: ProtectedResourceRequest,
    @Param() params: ClubIdRequestParams,
    @Res() response?: Response,
  ) {
    const { user } = request;
    const { clubId } = params;
    const donationRequest = await this.clubService.createDonationRequest(
      clubId,
      user.id,
    );
    const expiration = moment(donationRequest.createdAt).add(
      DONATION_REQUEST_EXPIRATION_MINUTES,
      'm',
    );
    return response.status(HttpStatus.OK).json({
      message: `Created a donation request with ID: ${donationRequest.id} for club with ID: ${clubId}. It will expire at ${expiration}.`,
    });
  }

  @Post('donate/:donationRequestId')
  public async donateToClub(
    @Req() request: ProtectedResourceRequest,
    @Param() params: DonationRequestIdRequestParams,
    @Body() body: DonateToClubRequestBody,
    @Res() response?: Response,
  ) {
    const { user } = request;
    const { donationRequestId } = params;
    const { amount } = body;
    const { id, clubId, excess, isFulfilled } =
      await this.clubService.donateToClub(donationRequestId, amount, user);
    return response.status(HttpStatus.OK).json({
      id,
      excess,
      isFulfilled,
      message: `You have donated ${amount} soft_currency to for donation request with ID: ${donationRequestId}. It has ${
        !isFulfilled ? 'not' : ''
      } reached its requested amount. ${
        excess > 0
          ? `Excess of ${excess} will be allocated next time the user, who created this donation request, creates a donation request.`
          : ''
      }`,
    });
  }
}
