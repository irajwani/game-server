import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from '../../User/user.service';
import {
  InsufficientPermissionException,
  MissingTokenHeaderException,
} from '../Errors';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const token: string = req.headers['token'] as string;
    if (!token) throw new MissingTokenHeaderException();
    const user = await this.userService.getUserByToken(token);
    Object.assign(req, { user });

    next();
  }
}
