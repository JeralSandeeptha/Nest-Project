import { Injectable } from '@nestjs/common';
import { User } from './types/types';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDTO } from './dto/request/CreateUserDTO';
import { UpdateUserDTO } from './dto/request/UpdateUserDTO';

@Injectable()
export class UserService {
  users: User[] = [];

  async getAllUsers(): Promise<User[]> {
    return new Promise((resolve) => {
      resolve(this.users);
    });
  }

  async createUser(data: CreateUserDTO): Promise<User> {
    return new Promise((resolve) => {
      const createdDate = new Date();
      const newUser = {
        _id: uuidv4(),
        name: data.name,
        age: data.age,
        createdAt: createdDate,
        updatedAt: createdDate,
      };
      this.users.push(newUser);
      resolve(newUser);
    });
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async getUser(id: string): Promise<User | string> {
    const user = this.users.find((user) => {
      return user._id === id;
    });
    if (!user) return 'No User Found';
    return user;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async deleteUser(id: string): Promise<string> {
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

  // eslint-disable-next-line @typescript-eslint/require-await
  async updateUser(id: string, reqBody: UpdateUserDTO): Promise<string> {
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
