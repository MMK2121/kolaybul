import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ListingService } from './listing.service';
import { ListingDto } from './dto/listing.dto';

@Controller()
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  @MessagePattern('listing.create')
  create(@Payload() createListingDto: ListingDto) {
    return this.listingService.createListing(createListingDto);
  }

  @MessagePattern('listing.findOne')
  findOne(@Payload() id: number) {
    return this.listingService.getListingById(id);
  }

  @MessagePattern('listing.findAll')
  findAll() {
    return this.listingService.getAllListings();
  }
}
