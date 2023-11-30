import { Router } from 'express';
import { ToDoController } from '@/controllers/todo.controller';

import { Routes } from '@/interfaces/routes.interface';
import { apiKeyMiddleware } from '@/middlewares/api-key-validate.middleware';

export class ToDoRoute implements Routes {
  public path = '/todo';
  public router = Router();
  public todo = new ToDoController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use('/todo', apiKeyMiddleware);
    this.router.get(`${this.path}/tasks`, this.todo.getTasks);
    this.router.post(`${this.path}/create`, this.todo.createTask);
    this.router.put(`${this.path}/update/:id`, this.todo.updateTask);
  }
}
