import { Injectable, Param } from '@nestjs/common';
import { BookingDto } from './dto/booking.dto';
import { PrismaService } from 'shared/prisma/prisma.service';

@Injectable()
export class BookingService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createBookingDto: BookingDto) {
    return await this.prisma.booking.create({
      data: {
        startDate: createBookingDto.startDate,
        endDate: createBookingDto.endDate,
        listing: {
          connect: { id: createBookingDto.listingId },
        },
        guest: {
          connect: { id: createBookingDto.guestId },
        },
        numberOfGuests: createBookingDto.numberOfGuests,
      },
    });
  }

  async getSelected(@Param('id') userId: number) {
    const bookings = await this.prisma.booking.findMany({
      where: {
        guestId: Number(userId),
      },
    });
    if (!bookings) {
      return null;
    }
    return bookings;
  }
}
