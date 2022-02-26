/* eslint-disable */
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import secret from "../config/jwt.secret";

export const checkJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Get the jwt token from the head
  // if(req.get("Content-Type")!="application/json") return res.status(401).send("Invalid header format.");
  const token = <string>req.headers["auth"];
  let jwtPayload = null;
  // console.log(token);

  //Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, secret.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).send(error);
    return;
  }

  //The token is valid for 1 hour
  //We want to send a new token on every request
  const { userId, username } = jwtPayload;
  const newToken = jwt.sign({ userId, username }, secret.jwtSecret, {
    expiresIn: "24h",
  });
  res.setHeader("token", newToken);

  //Call the next middleware or controller
  next();
};
