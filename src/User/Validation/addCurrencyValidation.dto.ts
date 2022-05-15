import { IsUUID, IsIn, IsNumber, IsDefined } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

const currencies = ['soft_currency', 'hard_currency'];

export class AddCurrencyRequestBody {
  @IsDefined()
  @IsIn(currencies)
  type: string;

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
