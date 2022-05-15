import { IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ClubIdRequestParams {
  @IsUUID()
  @Type(() => String)
  @ApiProperty({
    description: 'Club Id',
  })
  clubId: string;
}
