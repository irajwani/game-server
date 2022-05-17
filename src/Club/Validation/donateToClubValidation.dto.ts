import { IsDefined, IsNumber } from 'class-validator';

export class DonateToClubRequestBody {
  @IsDefined()
  @IsNumber({ maxDecimalPlaces: 0 })
  amount: number;
}
