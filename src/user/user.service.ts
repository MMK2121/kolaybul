import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Kullanıcıyı ID ile bulma

  async findUserById(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { reviews: true, bookings: true, listings: true },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
