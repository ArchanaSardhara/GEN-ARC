/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// user.controller.ts
@Controller('users')
export class UserController {
  constructor(private service: UserService) {}

  @Post()
  async create(@Body() body: any) {
    // return success(await this.service.create(body), 'CREATE_USER');
  }

  @Get()
  async findAll() {
    // return success(await this.service.findAll(), 'GET_USERS');
  }
}
