import prisma from "../../config/prisma"

export const getAllPersyaratanPerorangan = async () => {
    return await prisma.persyaratanLeasingPerorangan.findMany();
}

export const getPersyaratanByKreditUsers = async (uuid: string) => {
    return await prisma.persyaratanLeasingPerorangan.findFirst({where: {
        leasing_kredit_uuid: uuid
    }})
}

export const getKendaraanByKreditUsers = async (uuid: string) => {
    return await prisma.persyaratanLeasingPerorangan.findMany({
        where: {
            leasing_kredit_uuid: uuid
        },
        include: {
            leasingKredit: {
               select: {
                   kendaraan_uuid: true
               }
            }
        }
    });
}

export const AddPersyaratanPerorangan = async (
    leasingKreditUuid: string,
    kartuKeluarga: string,
    ktp: string,
    gajiPerbulan: number,
    rekeningListrik: string,
    pekerjaan: string,
    fotoSelfie: string
) => {
    return await prisma.persyaratanLeasingPerorangan.create({data:{
        leasing_kredit_uuid: leasingKreditUuid,
        kartu_keluarga: kartuKeluarga,
        ktp: ktp,
        gaji_perbulan: gajiPerbulan,
        rekening_listrik: rekeningListrik,
        pekerjaan: pekerjaan,
        foto_selfie: fotoSelfie
    }})
}