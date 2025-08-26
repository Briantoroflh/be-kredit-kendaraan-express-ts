import {
  errorsResponse,
  successResponse,
} from "../../../common/utils/api-response";
import { Request, Response } from "express";
import { LoginValidtion } from "../validation/login-validation";
import z, { ZodError } from "zod";
import { LoginService } from "../services/login-service";
import { sign } from "jsonwebtoken";
import {
  getTokenByUsersUuid,
  insertToken,
  updateToken,
} from "../../../common/model/token-permission-model";
import { getUsersByEmail } from "../../../common/model/users-model";

export const LoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json(errorsResponse("Email dan password dibutuhkan!"));
  }

  try {
    LoginValidtion.parse({
      email: email,
      password: password,
    });
  } catch (error) {
    return res.status(401).json(
      errorsResponse(
        "Email atau password tidak valid!",
        (error as ZodError).issues.map((e) => ({
          field: e.path[0],
          message: e.message,
        }))
      )
    );
  }

  const loginResult = await LoginService(email, password);

  if (!process.env.JWT_KEY) {
    return res
      .status(400)
      .json(errorsResponse("Tidak bisa membuat token jwt!"));
  }

  if (!loginResult.success) {
    return res.status(401).json(errorsResponse(loginResult.message));
  }

  const { uuid } = await getUsersByEmail(email);
  const exp = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60 * 1000;

  const token = await sign({ email: email }, process.env.JWT_KEY, {
    expiresIn: exp,
  });

  const tokenExist = await getTokenByUsersUuid(uuid);

  if (tokenExist) {
    await updateToken(uuid, token, exp);
  } else {
    await insertToken(uuid, token, exp);
  }

  return res.status(200).json(successResponse(loginResult.message, { uuid, token }));
};
