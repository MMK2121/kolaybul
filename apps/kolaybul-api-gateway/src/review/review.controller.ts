import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewDto } from './dto/review.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(AuthGuard('jwt'))
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
  @Post()
  create(@Body() review: ReviewDto, @Request() req) {
    const payload = { ...review, authorId: req.user.userId };
    return this.reviewService.create(review);
  }

  @ApiOperation({ summary: 'Get all reviews.' })
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Successfully get all the listing.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  findAll() {
    return this.reviewService.findAll();
  }
}
