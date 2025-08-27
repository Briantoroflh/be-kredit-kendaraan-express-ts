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
            leasing: true,
            jumlah_angsuran_perbulan: true,
            jumlah_sudah_dibayar: true,
            sisa_angsuran_pokok: true,
            tanggal_mulai_angsuran: true,
            lunas_sebelum: true
        }
    });
};

export const getAngsuranByKreditUuid = async (uuid: string) => {
    return await prisma.angsuranBerjalan.findFirst({
        where: {
            leasing_kredit_uuid: uuid
        }
    })

}

export const AddAngsuranBerjalan = async (
    leasingKreditUuid: string,
    jumlahAngsuran: number,
    jumlahDibayar: number,
    sisaAngsuran: number,
    lunasSebelum: Date,
    status: StatusPembayaran
) => {
    return await prisma.angsuranBerjalan.create({
        data: {
            leasing_kredit_uuid: leasingKreditUuid,
            jumlah_angsuran_perbulan: jumlahAngsuran,
            tanggal_mulai_angsuran: new Date(),
            lunas_sebelum: new Date(lunasSebelum),
            jumlah_sudah_dibayar: jumlahDibayar,
            sisa_angsuran_pokok: sisaAngsuran,
            status_pembayaran: status
        }
    })
}

export const PembayaranAngsuran = async (
    leasingKreditUuid: string,
    jumlahDibayar: number,
    sisaAngsuran: number,
) => {
    return await prisma.angsuranBerjalan.updateMany({
        where: {
            leasing_kredit_uuid: leasingKreditUuid
        },
        data: {
            jumlah_sudah_dibayar: jumlahDibayar,
            sisa_angsuran_pokok: sisaAngsuran
        }
    })
}