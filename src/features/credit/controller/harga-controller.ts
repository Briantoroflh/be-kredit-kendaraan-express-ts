import {Request, Response} from 'express'
import {HargaService} from "../services/harga-service";
import {errorsResponse, successResponse} from "../../../common/utils/api-response";

export const getAllHargaController = async (req: Request, res: Response) => {
    const listHarga = await HargaService.getAllHargaService()

    if(!listHarga.success) {
        return res.status(400).json(errorsResponse(listHarga.message))
    }

    return  res.status(200).json(successResponse(listHarga.message, listHarga.data))
}