import { Router } from "express";
import { LoginController } from "../controller/login-controller";
import { RegisterController } from "../controller/register-controller";

const authRoute = Router()

authRoute.post('/login', LoginController)
authRoute.post('/register', RegisterController)

export default authRoute;