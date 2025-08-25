import prisma from "../../config/prisma";
import { Users } from "generated/prisma";
import bcrypt from "bcrypt";

const getAllUsers = async (): Promise<Users[]> => {
  return await prisma.users.findMany();
};

const getUsersByUuid = async (uuid: string): Promise<Users> => {
  return await prisma.users.findFirst({
    where: {
      uuid: uuid,
    },
  });
};

const getUsersByEmail = async (email: string): Promise<Users> => {
  return await prisma.users.findFirst({
    where: {
      email: email,
    },
  });
};

const createUsers = async (
  username: string,
  password: string,
  email: string,
  noTelepon: string,
  alamat: string,
  tanggalLahir: string,
): Promise<Users> => {
  const passwordHashed = await bcrypt.hash(password, 10);

  return await prisma.users.create({
    data: {
      username: username,
      password: passwordHashed,
      email: email,
      no_telepon: noTelepon,
      alamat: alamat,
      tanggal_lahir: new Date(tanggalLahir),
    },
  });
};

const udpateUsers = async (
  uuid: string,
  username: string,
  password: string,
  email: string,
  noTelepon: string,
  alamat: string,
  tanggalLahir: string
): Promise<Users> => {
  const passwordHashed = await bcrypt.hash(password, 10);

  return await prisma.users.update({
    where: {
      uuid: uuid,
    },
    data: {
      username: username,
      password: passwordHashed,
      email: email,
      no_telepon: noTelepon,
      alamat: alamat,
      tanggal_lahir: new Date(tanggalLahir),
    },
  });
};

const deleteUsers = async (uuid: string): Promise<Users> => {
  return await prisma.users.delete({
    where: {
      uuid: uuid,
    },
  });
};

export {
  getAllUsers,
  getUsersByUuid,
  getUsersByEmail,
  createUsers,
  udpateUsers,
  deleteUsers,
};
