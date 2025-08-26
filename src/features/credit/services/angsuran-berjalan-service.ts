import {AddAngsuranBerjalan} from "../../../common/model/angsuran-berjalan-model";
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
    status: StatusPembayaran
): Promise<KreditLeasingResult> => {
    await AddAngsuranBerjalan(leasingKreditUuid, jumlahAngsuran, jumlahDibayar, sisaAngsuran, status)

    return {
        success: true,
        message: `Angsuran sudah berjalan!`,
    } as KreditLeasingResult
}