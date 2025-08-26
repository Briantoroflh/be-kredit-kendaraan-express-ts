import { Router } from "express";
import {getAllKreditUsers, KreditLeasingController} from "../controller/kredit-leasing-controller";
import { PersyaratanPeroranganController } from "../controller/persyaratan-perorangan-controller";
import { upload } from "../../../common/middlewares/upload-middleware";
import { AuthMiddleware } from "../../../common/middlewares/auth-middleware";

const creditRouter = Router();

creditRouter.get("/kredit-berjalan/:uuid", AuthMiddleware, getAllKreditUsers);
creditRouter.post("/kredit-leasing", AuthMiddleware, KreditLeasingController);
creditRouter.post(
  "/kredit-persyaratan-perorangan",
  upload.fields([
    { name: "kartuKeluarga", maxCount: 1 },
    { name: "ktp", maxCount: 1 },
    { name: "rekeningListrik", maxCount: 1 },
    { name: "fotoSelfie", maxCount: 1 },
  ]),
  PersyaratanPeroranganController
);

export default creditRouter;