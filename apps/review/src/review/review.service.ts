import { Injectable } from '@nestjs/common';
import { ReviewDto } from './dto/review.dto';
import { PrismaService } from 'shared/prisma/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async create(reviewDto: ReviewDto) {
    const { rating, comment, bookingId, authorId } = reviewDto;
    const booking = await this.prisma.booking.findUnique({
      where: {
        id: reviewDto.bookingId,
      },
    });

    return await this.prisma.review.create({
      data: {
        rating,
        comment,
        bookingId,
        authorId,
        listingId: Number(booking.listingId),
      },
    });
  }

  async findAll() {
    return await this.prisma.review.findMany();
  }
}
