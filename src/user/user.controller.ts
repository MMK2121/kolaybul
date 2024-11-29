import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDto } from './dto';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the user to retrieve.',
    example: 2,
  })
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Get a user by ID',
    description:
      'Retrieve a user using their ID. Requires a valid access token.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the user.',
    type: UserDto,
    schema: {
      example: {
        id: 2,
        email: 'mustafamertkilinc@gmail.com',
        hash: '$argon2id$v=19$m=65536,t=3,p=4$h2Deqq/CrbpFfVa4bpihFA$OBPSQXwwi/vPjwIJPscPvluswhGjNGVCbUw0PGjvXfs',
        firstName: 'Mustafa Mert',
        lastName: 'Kılınç',
        role: 'GUEST',
        createdAt: '2024-11-27T17:38:38.890Z',
        updatedAt: '2024-11-27T17:38:38.890Z',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Token is missing or invalid.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  getUserById(@Param('id') id: string) {
    return this.userService.findUserById(Number(id));
  }
}
