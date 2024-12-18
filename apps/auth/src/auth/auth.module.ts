import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { PrismaModule } from 'shared/prisma/prisma.module'; // PrismaModule
import { ConfigModule } from '@nestjs/config'; // ConfigModule import et
import { PrismaService } from 'shared/prisma/prisma.service'; // PrismaService
import { ConfigService } from '@nestjs/config'; // ConfigService

@Module({
  imports: [
    JwtModule.register({}), // JwtModule'u dahil et
    PrismaModule, // PrismaModule'u dahil et
    ConfigModule.forRoot(), // ConfigModule'u dahil et
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PrismaService, ConfigService], // PrismaService ve ConfigService'i providers'a ekle
})
export class AuthModule {}
