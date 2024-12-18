import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsNotEmpty } from 'class-validator';

export class ListingDto {
  @ApiProperty({
    example: 'Villa',
    description: 'The title of the listing',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'A beautiful villa with a pool',
    description: 'The description of the listing',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    example: 4,
    description: 'The number of people the listing can accommodate',
  })
  @IsNumber()
  noOfPeople: number;

  @ApiProperty({
    example: 'Turkey',
    description: 'The country where the listing is located',
  })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({
    example: 'Istanbul',
    description: 'The city where the listing is located',
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    example: 120,
    description: 'The price per night to stay at the listing',
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: 2,
    description: 'The ID of the host who owns the listing',
  })
  @IsOptional()
  @IsNumber()
  hostId: number;
}
