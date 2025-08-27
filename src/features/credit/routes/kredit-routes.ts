import { Router } from "express";
import {
    getAllKreditUsers,
    KreditLeasingController,
    UpdateStatusApproved
} from "../controller/kredit-leasing-controller";
import { PersyaratanPeroranganController } from "../controller/persyaratan-perorangan-controller";
import { upload } from "../../../common/middlewares/upload-middleware";
import { AuthMiddleware } from "../../../common/middlewares/auth-middleware";
import {getAllKendaraanController} from "../controller/kendaraan-controller";
import {getAllHargaController} from "../controller/harga-controller";
import {PembayaranAngsuranController} from "../controller/angsuran-controller";

const creditRouter = Router();

creditRouter.get("/kredit-berjalan/:uuid", AuthMiddleware, getAllKreditUsers);
creditRouter.get("/kendaraan", AuthMiddleware, getAllKendaraanController);
creditRouter.get("/list-harga", AuthMiddleware, getAllHargaController);
creditRouter.put("/pembayaran-angsuran/:uuid", AuthMiddleware, PembayaranAngsuranController);
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
creditRouter.put("/kredit-leasing/:uuid/approved", AuthMiddleware, UpdateStatusApproved);

export default creditRouter;