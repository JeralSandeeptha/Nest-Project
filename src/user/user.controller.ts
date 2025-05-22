import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from './types/types';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/request/CreateUserDTO';
import { UpdateUserDTO } from './dto/request/UpdateUserDTO';

@Controller('api/v1/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @HttpCode(200)
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Post()
  @UsePipes(ValidationPipe)
  @HttpCode(201)
  async createNewUser(@Body() reqBody: CreateUserDTO): Promise<User> {
    return await this.userService.createUser(reqBody);
  }

  @Get(':id')
  @HttpCode(200)
  async getSingleUser(@Param('id') id: string): Promise<User | string> {
    return await this.userService.getUser(id);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id') id: string): Promise<string> {
    return await this.userService.deleteUser(id);
  }

  @Put(':id')
  @HttpCode(205)
  async updateUser(
    @Param('id') id: string,
    @Body() reqBody: UpdateUserDTO,
  ): Promise<string> {
    return await this.userService.updateUser(id, reqBody);
  }
}
