import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ReviewDto } from './dto';
import { ReviewService } from './review.service';

@Controller('reviews')
@ApiTags('Review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiBearerAuth('access-token')
  @ApiBody({
    description: 'Create a new review for a booking.',
    type: ReviewDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully review created.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async createReview(@Body() reviewDto: ReviewDto, @Request() req) {
    reviewDto.authorId = req.user.userId;
    return this.reviewService.createReview(reviewDto);
  }
}
