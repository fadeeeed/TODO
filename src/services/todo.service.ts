import { Service } from 'typedi';
import { ToDoModel } from '@models/todo.model';
import { ToDoInterface } from '@interfaces/todo.interface';
import { HttpException } from '@/exceptions/HttpException';

@Service()
export class ToDoService {
  /**
   * Retrieves all tasks from the database.
   * @returns An array of ToDoInterface objects representing all tasks.
   */
  public async getTasks(): Promise<ToDoInterface[]> {
    const tasks: ToDoInterface[] = await ToDoModel.find().lean();
    return tasks;
  }

  /**
   * Creates a new task in the database.
   * @param body - The data for creating a new task.
   * @returns The created task as a ToDoInterface object.
   */
  public async createTask(body: ToDoInterface): Promise<ToDoInterface> {
    const task: ToDoInterface = await ToDoModel.create(body);
    return task;
  }

  /**
   * Updates an existing task in the database.
   * @param body - The data for updating the task.
   * @param id - The ID of the task to be updated.
   * @returns The updated task as a ToDoInterface object.
   * @throws HttpException with a status code of 404 and a message of 'Task not found' if the task is not found.
   */
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
