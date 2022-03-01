/* eslint-disable */
import {
  getBookings,
  getBooking,
  createBooking,
  IBookingPayload,
} from "../repositories/booking.repository";
import { Get, Route, Tags, Post, Body, Path, Put } from "tsoa";
import { Booking } from "../models";

@Route("bookings")
@Tags("Booking")
export default class BookingController {
  @Get("/")
  public async getBookings(): Promise<Array<Booking>> {
    return getBookings();
  }

  @Post("/")
  public async createBooking(@Body() body: IBookingPayload): Promise<Booking> {
    return createBooking(body);
  }

  @Get("/:id")
  public async getBooking(@Path() id: string): Promise<Booking | null> {
    return getBooking(id);
  }
}
