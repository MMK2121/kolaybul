import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ListingService } from './listing.service';
import { ListingDto } from './dto/listing.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('listing')
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  @ApiOperation({ summary: 'Create a listing' })
  @Post()
  create(@Body() createListingDto: ListingDto) {
    return this.listingService.create(createListingDto);
  }

  @ApiOperation({ summary: 'Get all the listing' })
  @Get()
  findAll() {
    return this.listingService.findAll();
  }

  @ApiOperation({ summary: 'Get selected listing' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listingService.findOne(+id);
  }
}
