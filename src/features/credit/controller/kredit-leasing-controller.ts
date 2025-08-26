import { errorsResponse, successResponse } from "../../../common/utils/api-response";
import { Request, Response } from "express";
import { KreditLeasingValidation } from "../validation/kredit-leasing-validation";
import { ZodError } from "zod";
import { getUsersByUuid } from "../../../common/model/users-model";
import { getKendaraanByUuid } from "../../../common/model/kendaraan-model";
import { KreditLeasingService } from "../services/kredit-leasing-service";
import { StatusLeasing, TipePengajuan } from "../../../generated/prisma";
import {AddAngsuranBerjalan, getAngsuranByUsersUuid} from "../../../common/model/angsuran-berjalan-model";
import {getKreditByUsersUuid} from "../../../common/model/kredit-leasing-model";
import {getHargaByKendaraanUuid} from "../../../common/model/harga-model";

export const KreditLeasingController = async (req: Request, res: Response) => {
  const data: {
    kendaraanUuid: string;
    usersUuid: string;
    tipePengajuan: TipePengajuan;
    nominalDP: number;
    tenor: string;
    angsuran: number;
    status: StatusLeasing;
    keterangan: string;
  } = req.body;

  if (!data) {
    return res
      .status(400)
      .json(errorsResponse("Mohon isi terlebih dahulu form kredit!"));
  }

  try {
    KreditLeasingValidation.parse({
      kendaraanUuid: data.kendaraanUuid,
      usersUuid: data.usersUuid,
      tipePengajuan: data.tipePengajuan,
      nominalDP: data.nominalDP,
      tenor: data.tenor,
      angsuran: data.angsuran,
      status: data.status,
      keterangan: data.keterangan,
    });
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

  const user = await getUsersByUuid(data.usersUuid);
  if (!user) {
    return res.status(404).json(errorsResponse("User tidak di temukan!"));
  }

  const kendaraan = await getKendaraanByUuid(data.kendaraanUuid);
  if (!kendaraan) {
    return res.status(404).json(errorsResponse("Kendaraan tidak di temukan!"));
  }

  const harga = await getHargaByKendaraanUuid(data.kendaraanUuid);
  if(!harga) {
    return  res.status(404).json(errorsResponse("Harga tidak di temukan!"))
  }

  const kreditResult = await KreditLeasingService(
    data.kendaraanUuid,
    data.usersUuid,
    data.tipePengajuan,
    data.nominalDP,
    data.tenor,
    data.angsuran,
    data.status,
    data.keterangan
  );

  const { uuid } = await getKreditByUsersUuid(data.usersUuid.toString())
  const totalPinjaman = harga.harga - data.nominalDP; // kendaraan.harga is the vehicle price
  const sisaAngsuran = totalPinjaman;

  await  AddAngsuranBerjalan(uuid, data.angsuran, data.nominalDP, sisaAngsuran, "berjalan");

  if(!kreditResult.success){
    return res.status(400).json(errorsResponse(kreditResult.message))
  }

  return res.status(200).json(successResponse(kreditResult.message))
};

export const getAllKreditUsers = async (req: Request, res: Response) => {
  if(!req.params){
    return res.status(400).json(errorsResponse("uuid belum ada!"))
  }

  const {uuid} = req.params

  const KreditUsers = await getAngsuranByUsersUuid(uuid)

  if(!KreditUsers) {
    return res.status(404).json(errorsResponse("Angsuran tidak di temukan!"));
  }

  return res.status(200).json(successResponse("Angsuran di temukan!", KreditUsers));
}
