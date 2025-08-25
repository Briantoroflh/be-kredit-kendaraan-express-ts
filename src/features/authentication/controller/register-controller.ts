import { errorsResponse, successResponse } from '../../../common/utils/api-response'
import {Request, Response} from 'express'
import { RegisterService } from '../services/register-service';
import { RegisterValidation } from '../validation/register-validation';
import { ZodError } from 'zod';

export const RegisterController = async (req: Request, res: Response) => {
    
    if (!req.body) {
        return res.status(400).json(errorsResponse("Tidak ada body request!"))
    }

    const {username, email, password, noTelepon, alamat, tanggalLahir} = req.body

    if(!username || !email || !password || !noTelepon || !alamat || !tanggalLahir){
        return res.status(400).json(errorsResponse('Isi dengan lengkap data diri anda!'));
    }

    try{
        RegisterValidation.parse({
            username: username,
            password: password,
            email: email,
            noTelepon: noTelepon,
            alamat: alamat,
            tanggalLahir: tanggalLahir
        })
    }catch(error) {
        return res.status(400).json(errorsResponse("Data diri anda tidak valid!", (error as ZodError).issues.map((e) => ({
            field: e.path[0],
            message: e.message
        }))))
    }

    const RegisterResult = await RegisterService(username, password, email, noTelepon, alamat, tanggalLahir);


    if(!RegisterResult.success){
        return res.status(400).json(errorsResponse(RegisterResult.message))
    }

    return res.status(200).json(successResponse("Registrasi berhasil!"))
}