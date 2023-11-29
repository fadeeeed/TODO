import { ObjectId } from "mongodb";

export interface ToDoInterface {
  _id?: ObjectId;
  title: string;
  description?: string;
  dueDate?: Date;
  priority?: string;
  status?: string;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
