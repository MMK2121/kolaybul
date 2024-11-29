import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ListingModule } from './listing/listing.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BookingService } from './booking/booking.service';
import { BookingController } from './booking/booking.controller';
import { ReviewService } from './review/review.service';
import { ReviewController } from './review/review.controller';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    ListingModule,
    PrismaModule,
    ReviewModule,
  ],
  controllers: [BookingController, ReviewController],
  providers: [BookingService, ReviewService],
})
export class AppModule {}
