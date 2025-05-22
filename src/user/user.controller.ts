import {
  Body,
  Controller,
  Delete,
  Get,
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
  async getAllUsers(): Promise<User[] | string> {
    return await this.userService.getAllUsers();
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createNewUser(@Body() reqBody: CreateUserDTO): Promise<User | string> {
    return await this.userService.createUser(reqBody);
  }

  @Get(':id')
  async getSingleUser(@Param('id') id: string): Promise<User | string> {
    return await this.userService.getUser(id);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<string> {
    return await this.userService.deleteUser(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() reqBody: UpdateUserDTO,
  ): Promise<string> {
    return await this.userService.updateUser(id, reqBody);
  }
}
