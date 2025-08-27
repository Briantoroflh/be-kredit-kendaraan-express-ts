import {getAllKendaraan} from "../../../common/model/kendaraan-model";

interface KendaraanResult {
    success: boolean
    message: string
    data?: object
}

export const KendaraanService = {
    getAllKendaraanService: async () => {
        const kendaraan = await getAllKendaraan()

        if(kendaraan.length < 1) {
            return {
                success: false,
                message: "Data kendaraan tidak ada!"
            } as KendaraanResult
        }

        return {
            success: true,
            message: "Berhasil mendapatkan semua data kendaraan!",
            data: kendaraan
        } as KendaraanResult
    }
}