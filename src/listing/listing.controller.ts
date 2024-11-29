import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ListingService } from './listing.service';
import { ListingDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Listing')
@Controller('listing')
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Get a listing by ID',
    description: 'Retrieve a specific listing using its ID.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'The ID of the listing to retrieve.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the listing.',
  })
  @ApiResponse({ status: 404, description: 'Listing not found.' })
  getListingById(@Param('id') id: string) {
    return this.listingService.getListingById(Number(id));
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({
    summary: 'Create a new listing',
    description: 'Add a new listing to the database.',
  })
  @ApiBearerAuth('access-token')
  @ApiBody({
    description: 'Data required to create a new listing.',
    type: ListingDto,
    examples: {
      FirstExample: {
        value: {
          title: 'Cozy Apartment',
          description: 'Nice place in the city center',
          noOfPeople: 4,
          country: 'Turkey',
          city: 'Istanbul',
          price: 120,
        },
      },
      SecondExample: {
        value: {
          title: 'Luxury Villa',
          description: 'A luxurious villa with a pool',
          noOfPeople: 8,
          country: 'Spain',
          city: 'Barcelona',
          price: 500,
        },
      },
      ThirdExample: {
        value: {
          title: 'Beach House',
          description: 'A beautiful house by the beach',
          noOfPeople: 6,
          country: 'Italy',
          city: 'Sicily',
          price: 300,
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Listing created successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @HttpCode(HttpStatus.CREATED)
  createListing(@Body() data: ListingDto, @Request() req) {
    data.hostId = req.user.userId;
    return this.listingService.createListing(data);
  }
}
