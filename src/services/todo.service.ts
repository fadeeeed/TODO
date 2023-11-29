import { Service } from 'typedi';
import { ToDoModel } from '@models/todo.model';
import { ToDoInterface } from '@interfaces/todo.interface';
import { HttpException } from '@/exceptions/HttpException';

@Service()
export class ToDoService {
  public async getTasks(): Promise<ToDoInterface[]> {
    const tasks: ToDoInterface[] = await ToDoModel.find().lean();
    return tasks;
  }

  public async createTask(body: ToDoInterface): Promise<ToDoInterface> {
    const task: ToDoInterface = await ToDoModel.create(body);
    return task;
  }

  public async updateTask(
    body: ToDoInterface,
    id: string
  ): Promise<ToDoInterface> {
    let task = await ToDoModel.findById(id);
    if (!task) {
      throw new HttpException(404, 'Task not found');
    }
    task.title = body.title || task.title;
    task.description = body.description || task.description;
    task.updatedAt = new Date();
    return await task.save();
  }
}
