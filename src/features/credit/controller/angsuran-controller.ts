import {Request, Response} from 'express'
import {PembayaranAngsuranService} from "../services/angsuran-berjalan-service";
import {errorsResponse, successResponse} from "../../../common/utils/api-response";
import {PembayaranValidation} from "../validation/pembayaran-validation";
import {ZodError} from "zod";

export const PembayaranAngsuranController = async (req: Request, res: Response) => {
    if(!req.body){
        return res.status(400).json(errorsResponse("Tidak ada body request!"))
    }

    const { nominalPembayaran } = req.body
    const {uuid}= req.params

    if(!nominalPembayaran) {
        return res.status(400).json(errorsResponse("Nominal Pembayaran dibutuhkan!"))
    }

    const pembayaran = await PembayaranAngsuranService(uuid, nominalPembayaran)

    if(!pembayaran.success) {
        return res.status(400).json(errorsResponse(pembayaran.message))
    }

    try {
        PembayaranValidation.parse({
            nominalPembayaran: nominalPembayaran
        })
    }catch (error) {
        return res.status(400).json(errorsResponse("Nominal Pembayaran tidak valid!", (error as ZodError).issues.map((e) => ({
            field: e.path[0],
            message: e.message,
        }))))
    }

    return res.status(200).json(successResponse(pembayaran.message))
}