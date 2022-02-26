/* eslint-disable */
import { ConnectionOptions } from "typeorm";
import * as dotenv from "dotenv";
import { Role, User } from "../models";

dotenv.config();

const config: ConnectionOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "alten-testing",
  entities: [User, Role],
  synchronize: true,
};

export default config;
