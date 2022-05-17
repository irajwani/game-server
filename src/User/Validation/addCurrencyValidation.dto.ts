import { IsUUID, IsIn, IsNumber, IsDefined } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Currencies } from '../Types/wallet';

const currencies = ['soft_currency', 'hard_currency'];

export class AddCurrencyRequestBody {
  @IsDefined()
  @IsIn(currencies)
  type: Currencies;

  @IsDefined()
  @IsNumber()
  amount: number;
}

export class AddCurrencyRequestParams {
  @IsUUID()
  @Type(() => String)
  @ApiProperty({
    description: 'User Id',
  })
  userId: string;
}
