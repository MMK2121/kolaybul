import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthDto } from './dto/auth.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  @ApiOperation({ summary: 'Signup for a new account' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request parameters.',
  })
  @ApiResponse({
    status: 409,
    description: 'Email already exists.',
  })
  @ApiBody({
    description: 'Signup request payload',
    schema: {
      type: 'object',
      properties: {
        firstName: {
          type: 'string',
          description: 'Firstname of the user',
          example: 'Mustafa Mert',
        },
        lastName: {
          type: 'string',
          description: 'Lastname of the user',
          example: 'Kilinc',
        },
        email: {
          type: 'string',
          description: 'The email address of the user',
          example: 'user@example.com',
        },
        password: {
          type: 'string',
          description: 'The password for the user account',
          example: 'password123',
        },
      },
      required: ['email', 'password', 'firstName', 'lastName'],
    },
  })
  signup(@Body() CreateAuthDto: AuthDto) {
    return this.authService.signup(CreateAuthDto);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Sign in to an existing account' })
  @ApiResponse({
    status: 200,
    description: 'User successfully signed in.',
    type: AuthDto,
    schema: {
      type: 'object',
      properties: {
        accessToken: {
          type: 'string',
          description: 'JWT access token for authentication.',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
        user: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            email: { type: 'string', example: 'mustafamertkilinc@gmail.com' },
            password: {
              type: 'string',
              description: 'The password for the user account',
              example: 'password123',
            },
          },
        },
      },
      required: ['email', 'password'],
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials.',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 401 },
        message: { type: 'string', example: 'Invalid email or password' },
        error: { type: 'string', example: 'Unauthorized' },
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'User not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 403 },
        message: { type: 'string', example: 'User not found' },
        error: { type: 'string', example: 'Forbidden' },
      },
    },
  })
  @ApiBody({
    description: 'User login credentials',
    required: true,
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'user@example.com',
        },
        password: {
          type: 'string',
          example: 'password123',
        },
      },
    },
  })
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
