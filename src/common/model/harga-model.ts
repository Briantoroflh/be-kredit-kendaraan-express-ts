import prisma from "../../config/prisma";

export const getAllHarga = async () => {
    return await prisma.harga.findMany({
       select: {
           uuid: true,
           harga: true,
           kendaraan: true,
           start_at: true,
           end_at: true
       }
    })
}

export const getHargaByKendaraanUuid = async (uuid: string) => {
    return prisma.harga.findFirst({
        where: {
            kendaraan_uuid: uuid
        }
    })
}