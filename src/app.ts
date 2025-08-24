import express, { Request, Response } from 'express';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// test route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello Express + TypeScript + neonDB!");
});

export default app