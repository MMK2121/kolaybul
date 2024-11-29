import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}
  async createBooking(
    startDate: Date,
    endDate: Date,
    listingId: number,
    guestId: number,
    numberOfGuests: number,
  ) {
    return await this.prisma.booking.create({
      data: {
        startDate: startDate,
        endDate: endDate,
        listing: {
          connect: { id: listingId },
        },
        guest: {
          connect: { id: guestId },
        },
        numberOfGuests: numberOfGuests,
      },
    });
  }

  async getSelectedUserBookings(userId: number) {
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
