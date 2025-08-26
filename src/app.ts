import express, { Request, Response } from 'express';
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import authRoute from './features/authentication/routes/auth-route';
import creditRouter from './features/credit/routes/kredit-routes';

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/credit", creditRouter);

// test route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello Express + TypeScript + neonDB!");
});


export default app