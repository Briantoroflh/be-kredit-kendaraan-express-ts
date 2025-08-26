import prisma from "../../config/prisma";

export const getHargaByKendaraanUuid = async (uuid: string) => {
    return prisma.harga.findFirst({
        where: {
            kendaraan_uuid: uuid
        }
    })

}