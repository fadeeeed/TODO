import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { ToDoService } from '@/services/todo.service';
import { ToDoInterface } from '@/interfaces/todo.interface';

export class ToDoController {
  public todo: ToDoService = Container.get(ToDoService);

  /**
   * Retrieves all tasks.
   *
   * @param req - The request object containing information about the HTTP request.
   * @param res - The response object used to send the HTTP response.
   * @param next - The next function used to pass control to the next middleware.
   * @returns An array of `ToDoInterface` objects representing all tasks.
   */
  public getTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tasks: ToDoInterface[] = await this.todo.getTasks();
      res.status(200).json({ data: tasks, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Creates a new task.
   *
   * @param req - The request object containing information about the HTTP request.
   * @param res - The response object used to send the HTTP response.
   * @param next - The next function used to pass control to the next middleware.
   * @returns The created task as a `ToDoInterface` object.
   */
  public createTask = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const reqBody: ToDoInterface = req.body as ToDoInterface;
      const task: ToDoInterface = await this.todo.createTask(reqBody);
      res.status(200).json({ data: task, message: 'createTask' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Updates an existing task.
   *
   * @param req - The request object containing information about the HTTP request.
   * @param res - The response object used to send the HTTP response.
   * @param next - The next function used to pass control to the next middleware.
   * @returns The updated task as a `ToDoInterface` object.
   */
  public updateTask = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const reqBody: ToDoInterface = req.body;
      const id: string = req.params.id;
      const task: ToDoInterface = await this.todo.updateTask(reqBody, id);
      res.status(200).json({ data: task, message: 'updateTask' });
    } catch (error) {
      next(error);
    }
  };
}
