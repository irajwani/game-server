import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UserService } from './user.service';
import { CreateUserRequestValidation } from './Validation/createUserValidation.dto';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Get()
  // async get(@Query() query: ChangelogGetter) {
  //   return this.changelogService.get(query);
  // }

  @Post('register')
  public async register(
    @Body() body: CreateUserRequestValidation,
    @Res() response?: Response,
  ) {
    const user = await this.userService.register(body);
    return response.status(HttpStatus.OK).json({ user });
  }
}
