import { createUsers } from "../../../common/model/users-model";
import { Users } from "generated/prisma";

interface RegisterResult {
  success: boolean;
  message: string;
}

export const RegisterService = async (
  username: string,
  password: string,
  email: string,
  noTelepon: string,
  alamat: string,
  tanggalLahir: string,
): Promise<RegisterResult> => {
  await createUsers(username,password,email,noTelepon,alamat,tanggalLahir)

  return {
    success: true,
    message: "Berhasil registrasi!",
  } as RegisterResult;
};
