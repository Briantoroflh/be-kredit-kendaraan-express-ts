import prisma from "../../config/prisma"

export const getTokenByUsersUuid = async (uuid:string) => {
    return await prisma.tokenPermission.findFirst({
        where:{
            users_uuid: uuid
        }
    })
}

export const getSingleToken = async  (token: string) => {
    return await prisma.tokenPermission.findFirst({where: {
        token: token
        }, select: {
        token: true
        }})
}

export const insertToken = async (uuid: string, token: string, expAt: number) => {
    return prisma.tokenPermission.create({ data: {
        users_uuid: uuid,
        token: token,
        expired_at: new Date(expAt)
    }})
}

export const updateToken = async (uuid: string, token: string, expAt: number) => {

    const date = new Date(expAt * 1000);
    const expDate = date.toISOString()

    return prisma.tokenPermission.update({
        where: {
            users_uuid: uuid
        },
        data:{
            token: token,
            expired_at: expDate
        }
    })
}