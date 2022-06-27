import { Request, Get, Post, Body, Put, Delete, Param, Controller, UsePipes, UseInterceptors, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './user.decorator';
import { ValidationPipe } from '../shared/pipes/validation.pipe';

import {
  ApiBearerAuth, ApiTags
} from '@nestjs/swagger';
import { HashPasswordInterceptor } from 'src/auth/hash-password.interceptor';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { UserResponse } from './user.interface';

@ApiBearerAuth()
@ApiTags('user')
@Controller()
export class UserController {

  constructor(private authService: AuthService, private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('users/:id')
  async findMe(@Param() params): Promise<UserResponse> {
    return await this.userService.findById(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('user')
  async update(@User('uuid') userId: string, @Body('user') userData: UpdateUserDto) {
    return await this.userService.update(userId, userData);
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @Post('users')
  async create(@Body('user') userData: CreateUserDto) {
    return this.userService.create(userData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('users/:id')
  async delete(@Param() params) {
    return await this.userService.delete(params.id);
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(LocalAuthGuard)
  @UseInterceptors(HashPasswordInterceptor)
  @Post('users/login')
  async login(@Request() req) {
    return this.authService.loginWithCredentials(req.user);
  }
}