/* eslint-disable */
import { getRepository } from "typeorm";
import { User, Role } from "../models";

export interface IUserPayload {
  name: string;
  username: string;
  password: string;
  email: string;
  role: Role;
  isActive: boolean;
}

export const getUsers = async (
  skip?: number,
  take?: number
): Promise<Array<User>> => {
  const userRepository = getRepository(User);
  return userRepository.find({
    relations: ["role"],
    skip: skip,
    take: take,
  });
};

export const createUser = async (payload: IUserPayload): Promise<User> => {
  const userRepository = getRepository(User);
  const user = new User();
  return userRepository.save({
    ...user,
    ...payload,
  });
};

export const getUser = async (id: string): Promise<User | null> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(
    { id: id },
    { relations: ["role"] }
  );
  if (!user) return null;
  return user;
};

export const updateUserStatus = async (
  id: string,
  status: string
): Promise<User | null> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(
    { id: id },
    { relations: ["role"] }
  );
  if (!user) return null;
  await userRepository.save(user);
  return user;
};
