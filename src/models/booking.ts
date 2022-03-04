/* eslint-disable */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./index";
import { Room } from "./room";

@Entity("Booking")
export class Booking {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: "userId" })
  userId!: User;

  @Column({ name: "bookingStart" })
  bookingStart!: Date;

  @Column({ name: "bookingEnd" })
  bookingEnd!: Date;

  @Column({ name: "startHour" })
  startHour!: number;

  @Column({ name: "duration" })
  duration!: number;

  @Column({ name: "purpose" })
  purpose!: string;

  @ManyToOne(() => Room, room => room.id)
  @JoinColumn({ name: "roomId" })
  roomId!: Room;

  @Column({ default: false, name: "status" })
  isActive!: boolean;

  @CreateDateColumn()
  created!: Date;
}
