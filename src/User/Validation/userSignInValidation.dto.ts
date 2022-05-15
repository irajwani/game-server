import { IsDefined, IsEmail } from 'class-validator';

export class UserSignInRequestBody {
  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  password: string;
}
