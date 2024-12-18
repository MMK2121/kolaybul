import { Inject, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthDto } from './dto/auth.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_SERVICE') private authService: ClientProxy) {}

  signup(createAuthDto: CreateAuthDto) {
    return this.authService.send('auth.signup', createAuthDto);
  }
  signin(authDto: AuthDto) {
    return this.authService.send('auth.signin', authDto);
  }
}
