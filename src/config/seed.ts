import { getRepository } from "typeorm";
import { log } from "./logger";
import * as dotenv from "dotenv";
import { createConnection } from "typeorm";
import dbConfig from "./database";

import { Role } from "../models";
import { createRole } from "../repositories/role.repository";

import { User } from "../models";
import { createUser } from "../repositories/user.repository";

export default class Seed {
  roles: any = [
    {
      description: "application-admin",
      isActive: true,
    },
    {
      description: "application-user",
      isActive: true,
    },
  ];

  users = [
    {
      name: "admin",
      username: "admin",
      password: "Qwerty04@",
      email: "admin@gmail.com",
      role: 1,
      isActive: true,
    },
    {
      name: "user",
      username: "user",
      password: "Qwerty04@",
      email: "user@gmail.com",
      role: 2,
      isActive: true,
    },
  ];

  execute = async () => {
    dotenv.config();
    createConnection(dbConfig)
      .then(_connection => {
        log.info("Database connected:", _connection.isConnected);
        this.seeding();
      })
      .catch(err => {
        log.error("Unable to connect to db", err);
        process.exit(1);
      });
  };

  seeding = async () => {
    const role = getRepository(Role);
    const user = getRepository(User);
    if ((await role.count()) == 0 && (await user.count()) == 0) {
      this.roles.map(async (role: any) => {
        await createRole(role);
      });

      this.users.map(async (user: any) => {
        await new Promise(resolve => setTimeout(resolve, 5000));
        await createUser(user);
      });

      log.info("User and Role Entities have been seeded!");
    } else {
      log.warn("User and Role have been seeded previously!");
    }
  };
}

const seed = new Seed();
seed.execute();
