import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from './types/types';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/request/CreateUserDTO';
import { UpdateUserDTO } from './dto/request/UpdateUserDTO';

@Controller('api/v1/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAllUsers(): User[] {
    return this.userService.getAllUsers();
  }

  @Post()
  createNewUser(@Body() reqBody: CreateUserDTO): User {
    return this.userService.createUser(reqBody);
  }

  @Get(':id')
  getSingleUser(@Param('id') id: string): User | string {
    return this.userService.getUser(id);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): string {
    return this.userService.deleteUser(id);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() reqBody: UpdateUserDTO): string {
    return this.userService.updateUser(id, reqBody);
  }
}
