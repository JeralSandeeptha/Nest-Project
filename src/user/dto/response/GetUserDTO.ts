import { Date, ObjectId } from 'mongoose';

export type GetUserDTO = {
  _id: ObjectId;
  name: string;
  age: number;
  createdAt: Date;
  updatedAt: Date;
};
