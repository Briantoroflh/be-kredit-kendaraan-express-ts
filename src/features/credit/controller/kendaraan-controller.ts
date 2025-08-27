import {Request, Response}  from 'express';
import {KendaraanService} from "../services/kendaraan-service";
import {errorsResponse, successResponse} from "../../../common/utils/api-response";

export const getAllKendaraanController = async (req: Request, res: Response) => {
    const kendaraan = await  KendaraanService.getAllKendaraanService()

    if(!kendaraan.success) {
        return res.status(400).json(errorsResponse(kendaraan.message))
    }

    return res.status(200).json(successResponse(kendaraan.message, kendaraan.data))
}