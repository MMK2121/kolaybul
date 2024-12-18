import { Injectable, NotFoundException } from '@nestjs/common';
import { ListingDto } from './dto/listing.dto';
import { PrismaService } from 'shared/prisma/prisma.service';

@Injectable()
export class ListingService {
  constructor(private readonly prisma: PrismaService) {}

  // GET: Tüm Listeleri Getir
  async getAllListings() {
    return this.prisma.listing.findMany({
      include: { host: true, bookings: true, reviews: true }, // İsteğe bağlı: Host bilgilerini de ekler
    });
  }

  // GET: ID'ye Göre Liste Getir
  async getListingById(id: number) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
      include: { host: true, bookings: true, reviews: true }, // İsteğe bağlı: Host bilgilerini de ekler
    });
    if (!listing) {
      throw new NotFoundException(`Listing with ID ${id} not found`);
    }

    return listing;
  }

  // POST: Yeni Liste Oluştur
  async createListing(createListingDto: ListingDto) {
    return await this.prisma.listing.create({
      data: {
        title: createListingDto.title,
        description: createListingDto.description,
        noOfPeople: createListingDto.noOfPeople,
        country: createListingDto.country,
        city: createListingDto.city,
        price: createListingDto.price,
        host: {
          connect: { id: createListingDto.hostId },
        },
      },
    });
  }
}
