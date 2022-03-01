/* eslint-disable */
import { Booking, Room, User } from "../models";
import { getRepository } from "typeorm";

export interface IBookingPayload {
  userId: User;
  bookingStart: Date;
  bookingEnd: Date;
  startHour: Number;
  duration: Number;
  purpose: String;
  roomId: Room;
  isActive: boolean;
}

export const getBookings = async (): Promise<Array<Booking>> => {
  const repository = getRepository(Booking);
  return repository.find();
};

export const createBooking = async (
  payload: IBookingPayload
): Promise<Booking> => {
  const repository = getRepository(Booking);
  const booking = new Booking();
  return repository.save({
    ...booking,
    ...payload,
  });
};

export const getBooking = async (id: string): Promise<Booking | null> => {
  const repository = getRepository(Booking);
  const booking = await repository.findOne({ id: id });
  if (!booking) return null;
  return booking;
};

export const updateBookingStatus = async (
  id: string
): Promise<Booking | null> => {
  const repository = getRepository(Booking);
  const booking = await repository.findOne({ id: id });
  if (!booking) return null;
  await repository.save(booking);
  return booking;
};
