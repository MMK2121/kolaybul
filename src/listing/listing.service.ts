import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ListingDto } from './dto';

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

  // PUT: Mevcut Listeyi Güncelle
  async updateListing(id: number, data: ListingDto) {
    const listingExists = await this.prisma.listing.findUnique({
      where: { id },
    });

    if (!listingExists) {
      throw new NotFoundException(`Listing with ID ${id} not found`);
    }

    return this.prisma.listing.update({
      where: { id },
      data,
    });
  }

  // DELETE: Listeyi Sil
  async deleteListing(id: number) {
    const listingExists = await this.prisma.listing.findUnique({
      where: { id },
    });

    if (!listingExists) {
      throw new NotFoundException(`Listing with ID ${id} not found`);
    }

    return this.prisma.listing.delete({
      where: { id },
    });
  }
}
