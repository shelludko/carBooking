import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDTO {
  @ApiProperty({ type: 'number', example: 1 })
  userId: number;

  @ApiProperty({ type: 'number', example: 1 })
  carId: number;

  @ApiProperty({ type: 'string', format: 'date-time', example: new Date() })
  startDay: string;

  @ApiProperty({
    type: 'string',
    format: 'date-time',
    example: new Date(new Date().setDate(new Date().getDate())),
  })
  endDay: string;
}
