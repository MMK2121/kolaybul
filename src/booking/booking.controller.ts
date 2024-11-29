import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import {
  ApiBearerAuth,
  ApiParam,
  ApiResponse,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { BookingDto } from './dto';

@Controller('booking')
@ApiTags('Booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
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
  createBooking(@Body() createBookingDto: BookingDto, @Request() req) {
    createBookingDto.guestId = req.user.userId;
    return this.bookingService.createBooking(
      createBookingDto.startDate,
      createBookingDto.endDate,
      createBookingDto.listingId,
      createBookingDto.guestId,
      createBookingDto.numberOfGuests,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':userId')
  @ApiBearerAuth('access-token')
  @ApiParam({
    name: 'userId',
    type: Number,
    description: 'ID of the user whose bookings need to be retrieved',
  })
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
  async getSelectedUserBookings(@Param('userId') userId: number) {
    return await this.bookingService.getSelectedUserBookings(userId);
  }
}
