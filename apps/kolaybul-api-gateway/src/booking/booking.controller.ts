import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingDto } from './dto/booking.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new booking' })
  @ApiBearerAuth('access-token')
  @ApiBody({
    description: 'Create a new booking with provided details.',
    examples: {
      'Booking Request': {
        value: {
          startDate: '2024-11-25T00:00:00.000Z',
          endDate: '2024-12-01T23:59:59.000Z',
          listingId: 1,
          numberOfGuests: 2,
        },
      },
    },
    type: BookingDto,
  })
  @ApiResponse({
    status: 200,
    description: 'No payment transaction needed.',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully created the booking.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  create(@Body() createBookingDto: BookingDto) {
    return this.bookingService.create(createBookingDto);
  }

  @Get(':id')
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the user bookings.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 200,
    description:
      'Bookings retrieved successfully with status (Successful, Error).',
  })
  @ApiOperation({ summary: 'Get a booking by userId' })
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(+id);
  }
}
