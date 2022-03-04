/* eslint-disable */
import express from "express";

import UserRouter from "./user.router";
import RoleRouter from "./role.router";
import AuthRouter from "./auth.router";
import RoomRouter from "./room.router";
import BookingRouter from "./booking.router";

import swaggerUi from "swagger-ui-express";
import { checkJwt } from "../middlewares/checkJwt";

const router = express.Router();

const initRoute = router.get("/", async (req, res) => {
  return res.redirect(`${process.env.API_VERSION}/docs`);
});

// router.use(
//   `${process.env.API_VERSION}/docs`,
//   swaggerUi.serve,
//   swaggerUi.setup(undefined, {
//     swaggerOptions: {
//       url: "/swagger.json",
//     },
//   })
// );

router.use("/auth", AuthRouter);
router.use("/users", UserRouter);
router.use("/bookings", BookingRouter);
router.use("/roles", RoleRouter);
router.use("/rooms", RoomRouter);

export default router;
export { initRoute };
