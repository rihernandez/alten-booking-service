/* eslint-disable */
import "reflect-metadata";
import { createConnection } from "typeorm";
import express, { Application } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import * as dotenv from "dotenv";
import cors from "cors";
import { log } from "./config/logger";

import xssAdvanced from "xss-advanced";

import Router, { initRoute } from "./routes";
import dbConfig from "./config/database";

export default class App {
  app: Application;

  constructor(private port?: number) {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(xssAdvanced());
    this.app.use(morgan("dev"));
    this.app.use(express.static("public"));
  }

  private async settings() {
    dotenv.config();
    await createConnection(dbConfig);
    this.app.listen(process.env.PORT || this.port, () => {
      log.info("Server is running on port:", process.env.PORT || this.port);
    });
  }

  private routes() {
    this.app.use(initRoute);
    this.app.use(`${process.env.API_VERSION}`, Router);
  }
}
