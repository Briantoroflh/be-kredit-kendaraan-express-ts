import {
    AddAngsuranBerjalan, getAngsuranByKreditUuid,
    getAngsuranByUsersUuid,
    PembayaranAngsuran
} from "../../../common/model/angsuran-berjalan-model";
import {StatusPembayaran} from "../../../generated/prisma";

interface KreditLeasingResult {
    success: boolean
    message: string
}

export const AngsuranBerjalanService = async (
    leasingKreditUuid: string,
    jumlahAngsuran: number,
    jumlahDibayar: number,
    sisaAngsuran: number,
    lunasSebelum: Date,
    status: StatusPembayaran
): Promise<KreditLeasingResult> => {
    await AddAngsuranBerjalan(leasingKreditUuid, jumlahAngsuran, jumlahDibayar, sisaAngsuran, lunasSebelum,status)

    return {
        success: true,
        message: `Angsuran sudah berjalan!`,
    } as KreditLeasingResult
}

export const PembayaranAngsuranService = async (
    uuid: string,
    jumlahDiBayar: number,
) => {
    const angsuran = await  getAngsuranByKreditUuid(uuid)

    if(uuid != angsuran.leasing_kredit_uuid) {
        return {
            success: false,
            message: `Angsuran tidak ditemukan!`,
        } as KreditLeasingResult
    }

    if(jumlahDiBayar < angsuran.jumlah_angsuran_perbulan){
        return {
            success: false,
            message: `Jumlah yang dibayarkan kurang dari jumlah angsuran perbulan! Minimal bayar ${angsuran.jumlah_angsuran_perbulan}`,
        } as KreditLeasingResult
    }

    const totalDibayar = jumlahDiBayar + angsuran.jumlah_sudah_dibayar
    const sisa = angsuran.sisa_angsuran_pokok - jumlahDiBayar

    console.log(totalDibayar)
    console.log(sisa)
    console.log(uuid)

    await PembayaranAngsuran(uuid, totalDibayar, sisa)

    return {
        success: true,
        message: `Pembayaran angsuran berhasil!`,
    } as KreditLeasingResult
}