import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class BookingDto {
  @ApiProperty({
    example: '2024-11-25T00:00:00.000Z',
    description: 'The start date of the booking',
  })
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @ApiProperty({
    example: '2024-12-01T23:59:59.000Z',
    description: 'The end date of the booking',
  })
  @IsNotEmpty()
  @IsDateString()
  endDate: Date;

  @ApiProperty({
    example: 1,
    description: 'The id of the listing',
  })
  @IsNotEmpty()
  @IsNumber()
  listingId: number;

  @ApiProperty({
    example: 1,
    description: 'The id of the guest',
  })
  guestId: number;

  @ApiProperty({
    example: 2,
    description: 'The number of guests',
  })
  @IsNotEmpty()
  @IsNumber()
  numberOfGuests: number;
}
