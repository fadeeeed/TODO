import cors from "cors";
import express from "express";
import "reflect-metadata";
import { dbConnection } from "@database";
import { NODE_ENV, PORT } from "@config";
import { Routes } from "./interfaces/routes.interface";
import{ErrorMiddleware} from "@middlewares/error.middleware"

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || "development";
    this.port = PORT || 3000;
    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  private async connectToDatabase() {
    await dbConnection();
  }

  private initializeMiddlewares() {
    this.app.use(cors({ origin: "*" }));
    this.app.use(express.json());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(
        "================================================================"
      );
      console.log(`======= ENV: ${this.env} =======`);
      console.log(`🚀 App listening on the port ${this.port}`);
      console.log(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }
}

export default App;
