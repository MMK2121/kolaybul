import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'shared/prisma/prisma.service';
import { PrismaModule } from 'shared/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, ConfigModule.forRoot()],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
