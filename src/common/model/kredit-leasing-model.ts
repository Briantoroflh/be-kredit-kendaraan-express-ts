import prisma from "../../config/prisma";
import {TipePengajuan, StatusLeasing} from "../../generated/prisma";
import {uuid} from "zod";

export const getAllKredit = async () => {
    return prisma.leasingKredit.findMany();
};

export const getKreditByUuid = async (uuid: string) => {
    return prisma.leasingKredit.findFirst({
        where: {
            uuid: uuid
        }
    })
}

export  const getStatusKreditByUuid = async (uuid: string) => {
    return prisma.leasingKredit.findFirst({where: {
        uuid:uuid
        }, select: {
        status:true
        }})
}

export const getKreditByUsersUuid = async (uuid: string) => {
    return prisma.leasingKredit.findFirst({
        where: {
            users_uuid: uuid,
        },
    });
};

export const getUsersByKreditUuid = async (uuid: string) => {
    return await prisma.leasingKredit.findFirst({
        where: {
            uuid: uuid
        },
        select: {
            users_uuid: true
        }
    })
}

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
            tenor: new Date(tenor),
            angsuran: angsuran,
            status: status,
            keterangan: keterangan
        },
    });
};

export const UpdateStatusKreditLeasing = async (uuid: string, status: StatusLeasing) => {
    return prisma.leasingKredit.update({
        where: {
            uuid: uuid
        }, data: {
            status: status
        }
    })
}