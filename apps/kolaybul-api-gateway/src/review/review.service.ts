import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ReviewDto } from './dto/review.dto';

@Injectable()
export class ReviewService {
  constructor(@Inject('REVIEW_SERVICE') private reviewService: ClientProxy) {}

  create(reviewDto: ReviewDto) {
    return this.reviewService.send('review.create', reviewDto);
  }

  findAll() {
    return this.reviewService.send('review.findAll', {});
  }
}
