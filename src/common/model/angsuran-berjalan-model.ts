import {StatusPembayaran} from "../../generated/prisma"
import prisma from "../../config/prisma"

export const getAngsuranByUsersUuid = async (uuid: string) => {
    return await prisma.angsuranBerjalan.findMany({
        where: {
            leasing: {
                users_uuid: uuid
            }
        },
        select: {
            uuid: true,
            jumlah_angsuran_perbulan: true,
            jumlah_sudah_dibayar: true,
            sisa_angsuran_pokok: true,
            tanggal_mulai_angsuran: true
        }
    });
};

export const AddAngsuranBerjalan = async (
    leasingKreditUuid: string,
    jumlahAngsuran: number,
    jumlahDibayar: number,
    sisaAngsuran: number,
    status: StatusPembayaran
) => {
    return await prisma.angsuranBerjalan.create({
        data: {
            leasing_kredit_uuid: leasingKreditUuid,
            jumlah_angsuran_perbulan: jumlahAngsuran,
            tanggal_mulai_angsuran: new Date(),
            jumlah_sudah_dibayar: jumlahDibayar,
            sisa_angsuran_pokok: sisaAngsuran,
            status_pembayaran: status
        }
    })
}