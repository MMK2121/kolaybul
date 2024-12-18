import { Module } from '@nestjs/common';
import { KolaybulApiGatewayController } from './kolaybul-api-gateway.controller';
import { KolaybulApiGatewayService } from './kolaybul-api-gateway.service';
import { ListingModule } from './listing/listing.module';
import { ReviewModule } from './review/review.module';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './booking/booking.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    BookingModule,
    UserModule,
    ReviewModule,
    ListingModule,
  ],
  controllers: [KolaybulApiGatewayController],
  providers: [KolaybulApiGatewayService],
})
export class KolaybulApiGatewayModule {}
