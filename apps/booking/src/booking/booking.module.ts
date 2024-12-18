import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { PrismaService } from 'shared/prisma/prisma.service';
import { PrismaModule } from 'shared/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, ConfigModule.forRoot()],
  controllers: [BookingController],
  providers: [BookingService, PrismaService],
})
export class BookingModule {}
