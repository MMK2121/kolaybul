import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('user.findUserById')
  findUserById(@Payload() id: number) {
    return this.userService.findUserById(id);
  }
}
