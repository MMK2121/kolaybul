import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ListingDto } from './dto/listing.dto';

@Injectable()
export class ListingService {
  constructor(@Inject('LISTING_SERVICE') private listingService: ClientProxy) {}
  create(createListingDto: ListingDto) {
    return this.listingService.send('listing.create', createListingDto);
  }

  findAll() {
    return this.listingService.send('listing.findAll', {});
  }

  findOne(id: number) {
    return this.listingService.send('listing.findOne', id);
  }
}
