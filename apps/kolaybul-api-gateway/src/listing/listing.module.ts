import { Module } from '@nestjs/common';
import { ListingService } from './listing.service';
import { ListingController } from './listing.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'LISTING_SERVICE',
        transport: Transport.TCP,
        options: {port:3004 },

      },
    ]),
  ],
  controllers: [ListingController],
  providers: [ListingService],
})
export class ListingModule {}
