import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ReviewService } from './review.service';
import { ReviewDto } from './dto/review.dto';

@Controller()
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @MessagePattern('review.create')
  create(@Payload() createReviewDto: ReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  @MessagePattern('review.findAll')
  findAll() {
    return this.reviewService.findAll();
  }
}
