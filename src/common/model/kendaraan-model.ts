import prisma from "../../config/prisma"

export const getAllKendaraan = async () => {
    return prisma.kendaraan.findMany()
}

export const getKendaraanByUuid = async (uuid: string) => {
    return prisma.kendaraan.findFirst({where:{
        uuid: uuid
    }})
}