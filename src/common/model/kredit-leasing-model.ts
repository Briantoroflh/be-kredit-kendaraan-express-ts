import prisma from "../../config/prisma";
import { TipePengajuan, StatusLeasing } from "../../generated/prisma";
import { uuid } from "zod";

export const getAllKredit = async () => {
  return prisma.leasingKredit.findMany();
};

export const getKreditByUsersUuid = async (uuid: string) => {
  return prisma.leasingKredit.findFirst({
    where: {
      users_uuid: uuid,
    },
  });
};

export const createKreditLeasing = async (
  kendaraanUuid: string,
  usersUuid: string,
  tipePengajuan: TipePengajuan,
  nominalDP: number,
  tenor: string,
  angsuran: number,
  status: StatusLeasing,
  keterangan: string
) => {
  return await prisma.leasingKredit.create({
    data: {
      kendaraan_uuid: kendaraanUuid,
      users_uuid: usersUuid,
      tipe_pengajuan: tipePengajuan,
      nominal_DP: nominalDP,
      tenor: tenor,
      angsuran: angsuran,
      status: status,
      keterangan: keterangan
    },
  });
};