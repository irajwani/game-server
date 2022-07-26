import { IsDefined, IsString } from 'class-validator';

export class CreateClubRequestBody {
  @IsDefined()
  @IsString()
  name: string;
}
