import { errorsResponse, successResponse } from "../../../common/utils/api-response";
import { Request, Response } from "express";
import { PLPRValidation } from "../validation/persyaratan-leasing-perorangan-validation";
import { ZodError } from "zod";
import { PersyaratanLeasingPerorangan } from "../services/persyaratan-perorangan";
export const PersyaratanPeroranganController = async (
  req: Request,
  res: Response
) => {

    if(!req.body){
        return res.status(400).json(errorsResponse("Tidak ada body request!"))
    }

  const files = req.files as {
    [fieldname: string]: Express.Multer.File[];
  };

  const baseUrl = `${req.protocol}://${req.get("host")}/uploads`;

  const data = {
    leasingKreditUuid: req.body.leasingKreditUuid,
    gajiPerbulan: Number(req.body.gajiPerbulan),
    pekerjaan: req.body.pekerjaan,
    angsuran: req.body.angsuran,

    kartuKeluarga: files?.kartuKeluarga?.[0]
      ? `${baseUrl}/${files.kartuKeluarga[0].filename}`
      : undefined,
    ktp: files?.ktp?.[0] ? `${baseUrl}/${files.ktp[0].filename}` : undefined,
    rekeningListrik: files?.rekeningListrik?.[0]
      ? `${baseUrl}/${files.rekeningListrik[0].filename}`
      : undefined,
    fotoSelfie: files?.fotoSelfie?.[0]
      ? `${baseUrl}/${files.fotoSelfie[0].filename}`
      : undefined,
  };

  if (!data) {
    return res
      .status(400)
      .json(
        errorsResponse("Mohon isi terlebih dahulu form persyaratan perorangan!")
      );
  }

  try {
    PLPRValidation.parse(data);
  } catch (error) {
    return res.status(400).json(
      errorsResponse(
        "Data yang di isi belom valid!",
        (error as ZodError).issues.map((e) => ({
          field: e.path[0],
          message: e.message,
        }))
      )
    );
  }

  const persyaratanResult = await PersyaratanLeasingPerorangan(
    data.leasingKreditUuid,
    data.kartuKeluarga,
    data.ktp,
    data.gajiPerbulan,
    data.rekeningListrik,
    data.pekerjaan,
    data.fotoSelfie,
    data.angsuran
  );

  if(!persyaratanResult.success){
    return res.status(400).json(errorsResponse(persyaratanResult.message))
  }

  return res.status(200).json(successResponse(persyaratanResult.message));
};
