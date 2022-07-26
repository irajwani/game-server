import { IsDefined, IsEmail } from 'class-validator';

export class CreateUserRequestBody {
  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  password: string;

  @IsDefined()
  name: string;
}
