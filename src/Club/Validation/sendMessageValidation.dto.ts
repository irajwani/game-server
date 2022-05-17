import { IsDefined, IsString } from 'class-validator';

export class SendMessageRequestBody {
  @IsDefined()
  @IsString()
  message: string;
}
