import { Inject, Injectable } from '@nestjs/common';
import { BookingDto } from './dto/booking.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class BookingService {
  constructor(@Inject('BOOKING_SERVICE') private userService: ClientProxy) {}

  create(createBookingDto: BookingDto) {
    return this.userService.send('booking.create', createBookingDto);
  }

  findOne(id: number) {
    return this.userService.send('booking.findSelected', id);
  }
}
