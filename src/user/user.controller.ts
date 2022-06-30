import { Get, Post, Body, Delete, Param, Controller, UsePipes, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto';
import { ValidationPipe } from '../shared/pipes/validation.pipe';

import {
  ApiBearerAuth, ApiTags
} from '@nestjs/swagger';
import { UserResponse } from './user.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('user')
@Controller()
export class UserController {

  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param() params): Promise<UserResponse> {
    return await this.userService.findById(params.id);
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body('user') userData: CreateUserDto) {
    return this.userService.create(userData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param() params) {
    return await this.userService.delete(params.id);
  }
}