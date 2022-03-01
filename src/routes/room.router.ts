/* eslint-disable */
import express from "express";
import RoomController from "../controllers/room.controller";
import { log } from "../config/logger";

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new RoomController();
  const response = await controller.getRooms();
  log.silly(response);
  return res.send(response);
});

router.post("/", async (req, res) => {
  const controller = new RoomController();
  const response = await controller.createRoom(req.body);
  log.silly(response);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const controller = new RoomController();
  const response = await controller.getRoom(req.params.id);
  if (!response) {
    log.warn(response);
    return res.status(404).send({ message: "No Room found" });
  }
  log.silly(response);
  return res.send(response);
});

export default router;
