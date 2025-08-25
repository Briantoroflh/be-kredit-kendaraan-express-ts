import { compareSync } from "bcrypt"
import { getUsersByEmail } from "../../../common/model/users-model"
import { success } from "zod"

interface LoginResult {
    success: boolean
    message: string
}

export const LoginService = async (email: string, password: string): Promise<LoginResult> => {
    const user = await getUsersByEmail(email)

    if(!user) {
        return {
            success: false,
            message: "Email yang anda masukan tidak bisa ditemukan! " + email.toString()
        } as LoginResult
    }

    if(!compareSync(password, user.password)) {
        return {
            success: false,
            message: "Password tidak sesuai dengan data yang ada!"
        } as LoginResult
    }

    return {
        success: true,
        message: "Berhasil login, Halo " + user.username
    } as LoginResult
}