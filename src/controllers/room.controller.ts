/* eslint-disable */
import {
  getRooms,
  getRoom,
  createRoom,
  IRoomPayload,
} from "../repositories/room.repository";
import { Get, Route, Tags, Post, Body, Path, Put } from "tsoa";
import { Room } from "../models";

@Route("rooms")
@Tags("Room")
export default class RoomController {
  @Get("/")
  public async getRooms(): Promise<Array<Room>> {
    return getRooms();
  }

  @Post("/")
  public async createRoom(@Body() body: IRoomPayload): Promise<Room> {
    return createRoom(body);
  }

  @Get("/:id")
  public async getRoom(@Path() id: string): Promise<Room | null> {
    return getRoom(id);
  }
}
