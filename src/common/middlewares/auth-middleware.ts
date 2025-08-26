import { errorsResponse } from '../../common/utils/api-response';
import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken';

export const AuthMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers['authorization']

    if (!authHeader) {
      return res.status(401).json(errorsResponse("Token tidak ditemukan!"));
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json(errorsResponse("Token tidak valid!"));
    }

    try {
      if (!process.env.JWT_KEY) {
        throw new Error("JWT_KEY tidak tersedia!");
      }

      const decoded = jwt.verify(token, process.env.JWT_KEY);

      (req as any).user = decoded;

      next();
    } catch (error) {
      return res
        .status(403)
        .json(errorsResponse("Token tidak sah atau expired!"));
    }
}