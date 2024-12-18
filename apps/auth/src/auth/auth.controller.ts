import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthDto } from './dto/auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.signup')
  signup(@Payload() createAuthDto: CreateAuthDto) {
    return this.authService.signup(createAuthDto);
  }

  @MessagePattern('auth.signin')
  signin(@Payload() auth: AuthDto) {
    return this.authService.signin(auth);
  }
}
