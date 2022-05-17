import { IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class DonationRequestIdRequestParams {
  @IsUUID()
  @Type(() => String)
  @ApiProperty({
    description: 'Donation Request Id',
  })
  donationRequestId: string;
}
