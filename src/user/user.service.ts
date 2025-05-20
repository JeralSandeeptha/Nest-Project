import { Injectable } from '@nestjs/common';
import { User } from './types/types';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDTO } from './dto/request/CreateUserDTO';
import { UpdateUserDTO } from './dto/request/UpdateUserDTO';

@Injectable()
export class UserService {
  users: User[] = [];

  getAllUsers(): User[] {
    return this.users;
  }

  createUser(data: CreateUserDTO): User {
    const createdDate = new Date();
    const newUser = {
      _id: uuidv4(),
      name: data.name,
      age: data.age,
      createdAt: createdDate,
      updatedAt: createdDate,
    };
    this.users.push(newUser);
    return newUser;
  }

  getUser(id: string): User | string {
    const user = this.users.find((user) => {
      return user._id === id;
    });
    if (!user) return 'No User Found';
    return user;
  }

  deleteUser(id: string): string {
    const user = this.users.find((user) => {
      return user._id === id;
    });
    if (!user) {
      return 'No User Found';
    }
    const userIndex = this.users.findIndex((user) => {
      return user._id === id;
    });
    this.users.splice(userIndex, 1);
    return `${user.name} User deleted successfully`;
  }

  updateUser(id: string, reqBody: UpdateUserDTO): string {
    const user = this.users.find((user) => {
      return user._id === id;
    });
    if (!user) {
      return 'No User Found';
    }
    user.name = reqBody.name;
    user.age = reqBody.age;
    user.updatedAt = new Date();
    return `${user._id} User updated successfully`;
  }
}
