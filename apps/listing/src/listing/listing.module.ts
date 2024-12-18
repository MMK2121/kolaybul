import { Module } from '@nestjs/common';
import { ListingService } from './listing.service';
import { ListingController } from './listing.controller';
import { PrismaService } from 'shared/prisma/prisma.service';
import { PrismaModule } from 'shared/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, ConfigModule.forRoot()],
  controllers: [ListingController],
  providers: [ListingService, PrismaService],
})
export class ListingModule {}
