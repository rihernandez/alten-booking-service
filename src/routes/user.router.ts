/* eslint-disable */
import express from "express";
import UserController from "../controllers/user.controller";
import { log } from "../config/logger";
import { schema, malformedPassword } from "../middlewares/validPassword";

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new UserController();
  const response = await controller.getUsers(
    Number(_req.query?.skip),
    Number(_req.query?.take)
  );
  const results = JSON.parse(JSON.stringify(response));
  results.map((result: any) => {
    result.label = result.name;
  });
  log.silly(results);
  return res.send(results);
});

router.post("/", async (req, res) => {
  const controller = new UserController();
  if (schema.validate(req.body.password) == true) {
    const response = await controller.createUser(req.body);
    log.silly(response);
    return res.send(response);
  } else {
    log.warn(malformedPassword);
    return res.status(400).send({ msg: malformedPassword });
  }
});

router.get("/:id", async (req, res) => {
  const controller = new UserController();
  const response = await controller.getUser(req.params.id);
  if (!response) {
    log.warn(response);
    return res.status(404).send({ message: "No User found" });
  }
  log.silly(response);
  return res.send(response);
});

router.put("/:id", async (req, res) => {
  const controller = new UserController();
  const response = await controller.updateUserStatus(
    req.params.id,
    req.query.auth
  );
  if (!response) {
    log.warn(response);
    return res.status(404).send({ message: "No User found" });
  }
  log.silly(response);
  return res.send(response);
});

export default router;
