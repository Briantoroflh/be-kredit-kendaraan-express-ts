import {getAllHarga} from "../../../common/model/harga-model";

interface HargaResult {
    success: boolean
    message: string
    data?: object
}

export const HargaService = {
    getAllHargaService: async () => {
        const listHarga = await getAllHarga()

        if(listHarga.length < 1) {
            return {
                success: false,
                message: "List harga belom tersedia!",
            } as HargaResult
        }

        return {
            success: true,
            message: "Berhasil mendapatkan semua data list harga!",
            data: listHarga
        } as HargaResult
    }
}