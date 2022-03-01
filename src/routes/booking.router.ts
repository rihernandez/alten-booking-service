/* eslint-disable */
import express from "express";
import BookingController from "../controllers/booking.controller";
import { log } from "../config/logger";

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new BookingController();
  const response = await controller.getBookings();
  log.silly(response);
  return res.send(response);
});

router.post("/", async (req, res) => {
  const controller = new BookingController();
  const response = await controller.createBooking(req.body);
  log.silly(response);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const controller = new BookingController();
  const response = await controller.getBooking(req.params.id);
  if (!response) {
    log.warn(response);
    return res.status(404).send({ message: "No Booking found" });
  }
  log.silly(response);
  return res.send(response);
});

export default router;
