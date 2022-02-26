/* eslint-disable */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Generated,
} from "typeorm";

@Entity("Role")
export class Role {
  @PrimaryGeneratedColumn("increment", { name: "RoleID" })
  id!: string;

  @Column({ nullable: false, name: "Name" })
  description!: string;

  @Column({ default: false, name: "Status" })
  isActive!: boolean;

  @CreateDateColumn()
  created!: Date;

  @Column({ name: "secuence" })
  @Generated("increment")
  secuence!: number;
}
