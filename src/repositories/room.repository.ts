/* eslint-disable */
import { Room } from "../models";
import { getRepository } from "typeorm";

export interface IRoomPayload {
  name: string;
  floor: number;
  capacity: number;
  assets: string;
  isActive: boolean;
}

export const getRooms = async (): Promise<Array<Room>> => {
  const repository = getRepository(Room);
  return repository.find();
};

export const createRoom = async (payload: IRoomPayload): Promise<Room> => {
  const repository = getRepository(Room);
  const room = new Room();
  return repository.save({
    ...room,
    ...payload,
  });
};

export const getRoom = async (id: string): Promise<Room | null> => {
  const repository = getRepository(Room);
  const room = await repository.findOne({ id: id });
  if (!room) return null;
  return room;
};

export const updateRoomStatus = async (id: string): Promise<Room | null> => {
  const repository = getRepository(Room);
  const room = await repository.findOne({ id: id });
  if (!room) return null;
  await repository.save(room);
  return room;
};
