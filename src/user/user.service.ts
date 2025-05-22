import { Injectable } from '@nestjs/common';
import { User } from './types/types';
import { CreateUserDTO } from './dto/request/CreateUserDTO';
import { UpdateUserDTO } from './dto/request/UpdateUserDTO';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}
  users: User[] = [];

  async getAllUsers(): Promise<User[] | string> {
    return this.userRepository.getAllUser();
  }

  async createUser(data: CreateUserDTO): Promise<User | string> {
    return this.userRepository.createUser(data);
  }

  async getUser(id: string): Promise<User | string> {
    return this.userRepository.getUser(id);
  }

  async deleteUser(id: string): Promise<string> {
    return this.userRepository.deleteUser(id);
  }

  async updateUser(id: string, reqBody: UpdateUserDTO): Promise<string> {
    return this.userRepository.updateUser(id, reqBody);
  }
}
