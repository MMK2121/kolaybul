import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  Max,
} from 'class-validator';

export class ReviewDto {
  @ApiProperty({
    description: 'The rating given by the user (between 0 and 5)',
    example: 4,
  })
  @IsInt()
  @Min(0)
  @Max(5)
  rating: number;

  @ApiProperty({
    description: 'The review comment provided by the user',
    example: 'The place was fantastic and very clean!',
  })
  @IsString()
  @IsNotEmpty()
  comment: string;

  @ApiProperty({
    description: 'The ID of the booking related to this review',
    example: 123,
  })
  @IsInt()
  @IsNotEmpty()
  bookingId: number;

  @IsInt()
  @IsOptional()
  authorId?: number;
}
