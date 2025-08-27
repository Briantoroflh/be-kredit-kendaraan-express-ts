import { errorsResponse } from '../../common/utils/api-response';
import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken';
import {getSingleToken} from "../model/token-permission-model";

export const AuthMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeaderRaw = req.headers["authorization"];
    if (!authHeaderRaw) {
        return res.status(401).json(errorsResponse("Token tidak ditemukan!"));
    }

    // header bisa berupa string atau array; pastikan ambil string
    const authHeader = Array.isArray(authHeaderRaw) ? authHeaderRaw[0] : authHeaderRaw;

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || !/^Bearer$/i.test(parts[0])) {
        return res.status(401).json(errorsResponse("Format Authorization header tidak valid!"));
    }

    const token = parts[1].trim();
    if (!token) {
        return res.status(401).json(errorsResponse("Token tidak valid!"));
    }

    // Ambil record token di DB. Pastikan getSingleToken mengembalikan null/undefined bila tidak ditemukan.
    const tokenInDB = await getSingleToken(token);

    // Cek apakah record ada
    if (!tokenInDB) {
        return res.status(403).json(errorsResponse("Token tidak ditemukan! Anda tidak diizinkan."));
    }

    try {
      if (!process.env.JWT_KEY) {
        throw new Error("JWT_KEY tidak tersedia!");
      }

      const decoded = jwt.verify(tokenInDB.token, process.env.JWT_KEY);

      (req as any).user = decoded;

      next();
    } catch (error) {
      return res
        .status(403)
        .json(errorsResponse("Token tidak sah atau expired!"));
    }
}