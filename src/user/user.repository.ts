import { Injectable } from '@nestjs/common';
import { Error, Model } from 'mongoose';
import { User, UserDocument } from './schema/User.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDTO } from './dto/request/CreateUserDTO';
import { UpdateUserDTO } from './dto/request/UpdateUserDTO';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAllUser(): Promise<User[] | string> {
    try {
      return this.userModel.find();
    } catch (error) {
      console.log(error);
      return 'Internal Server Error';
    }
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<User | string> {
    try {
      const newUserData = new this.userModel(createUserDTO);
      const newUser = await newUserData.save();
      return newUser;
    } catch (error) {
      console.log(error);
      return 'Internal Server Error';
    }
  }

  async getUser(id: string): Promise<User | string> {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        return 'User not found related to this userId';
      }
      return user;
    } catch (error) {
      console.log(error);
      return 'Internal Server Error';
    }
  }

  async deleteUser(id: string): Promise<string> {
    try {
      const user = await this.userModel.findById(id);
      console.log('access');
      console.log(user);
      if (!user) {
        return `User not found for ${id}`;
      }
      await this.userModel.findByIdAndDelete(id);
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      return `${user._id} User deleted successfully`;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.log(error.message);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return `${error.message}`;
    }
  }

  async updateUser(id: string, updateUserDTO: UpdateUserDTO): Promise<string> {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        return `User not found for ${id}`;
      }
      await this.userModel.findByIdAndUpdate(id, updateUserDTO, { new: true });
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      return `${user._id} updated successfully`;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.log(error.message);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return `${error.message}`;
    }
  }
}
