import prisma from "../../config/prisma";

export const getAllPersyaratanPerusahaan = async () => {
    return await prisma.persyaratanLeasingPerusahaan.findMany()
}

export const getPersyaratanByKreditUsers = async (uuid: string) => {
    return await prisma.persyaratanLeasingPerusahaan.findFirst({where: {
        leasing_kredit_uuid: uuid
    }})
}

export const AddPersyaratanPerusahaan = async (
  leasingKreditUuid: string,
  namaPerusahaan: string,
  aktaPendirianPerusahaan: string,
  SIUP: string,
  TDP: string,
  tujuankendaraan: string,
  omzetPerusahaan: number
) => {
    return await prisma.persyaratanLeasingPerusahaan.create({data:{
        leasing_kredit_uuid: leasingKreditUuid,
        nama_perusahaan: namaPerusahaan,
        akta_pendirian_perusahaan: aktaPendirianPerusahaan,
        SIUP: SIUP,
        TDP: TDP,
        tujuan_kendaraan: tujuankendaraan,
        omzet_perusahaan: omzetPerusahaan
    }})
};
