import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  HttpStatus,
  Put,
  Patch,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UserService } from './user.service';
import { CreateUserRequestBody } from './Validation/createUserValidation.dto';
import { UserSignInRequestBody } from './Validation/userSignInValidation.dto';
import {
  AddCurrencyRequestBody,
  AddCurrencyRequestParams,
} from './Validation/addCurrencyValidation.dto';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  public async register(
    @Body() body: CreateUserRequestBody,
    @Res() response?: Response,
  ) {
    const user = await this.userService.register(body);
    return response.status(HttpStatus.OK).json({ user });
  }

  @Post('login')
  public async login(
    @Body() body: UserSignInRequestBody,
    @Res() response?: Response,
  ) {
    const { email, password } = body;
    const user = await this.userService.login({ email, password });
    return response.status(HttpStatus.OK).json({ user });
  }

  @Patch(':userId/add-currency')
  public async addCurrency(
    @Param() params: AddCurrencyRequestParams,
    @Body() body: AddCurrencyRequestBody,
    @Res() response?: Response,
  ) {
    const { userId } = params;
    const { type, amount } = body;
    await this.userService.updateUserWallet({
      userId,
      type,
      amount,
    });
    return response
      .status(HttpStatus.OK)
      .json({ message: `successfully updated wallet for user: ${userId}` });
  }
}
