import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { ToDoService } from '@/services/todo.service';
import { ToDoInterface } from '@/interfaces/todo.interface';

export class ToDoController {
  public todo = Container.get(ToDoService);

  public getTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tasks: ToDoInterface[] = await this.todo.getTasks();
      res.status(200).json({ data: tasks, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

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
