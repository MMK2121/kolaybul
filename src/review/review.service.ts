import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReviewDto } from './dto';

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async createReview(reviewDto: ReviewDto) {
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
}
