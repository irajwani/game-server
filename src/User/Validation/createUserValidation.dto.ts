import {
  IsDefined,
  IsEnum,
  IsMongoId,
  IsUUID,
  IsNumber,
  IsOptional,
  IsEmail,
} from 'class-validator';

export class CreateUserRequestValidation {
  @IsUUID()
  @IsDefined()
  id: string;

  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  password: string;

  @IsDefined()
  name: string;
}
