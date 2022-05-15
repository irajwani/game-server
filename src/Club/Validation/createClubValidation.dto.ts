import { IsDefined, IsEmail, IsUUID } from 'class-validator';

export class CreateClubRequestBody {
  @IsDefined()
  name: string;
}
