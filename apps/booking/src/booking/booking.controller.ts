import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BookingService } from './booking.service';
import { BookingDto } from './dto/booking.dto';

@Controller()
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @MessagePattern('booking.create')
  create(@Payload() createBookingDto: BookingDto) {
    return this.bookingService.create(createBookingDto);
  }

  @MessagePattern('booking.findSelected')
  getSelectedUserBooking(@Payload() id: number) {
    return this.bookingService.getSelected(id);
  }
}
