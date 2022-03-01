/* eslint-disable */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity("Room")
export class Room {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "name" })
  name!: string;

  @Column({ name: "floor" })
  floor!: number;

  @Column({ name: "capacity" })
  capacity!: number;

  @Column({ name: "assets" })
  assets!: string;

  @Column({ default: false, name: "status" })
  isActive!: boolean;

  @CreateDateColumn()
  created!: Date;
}
