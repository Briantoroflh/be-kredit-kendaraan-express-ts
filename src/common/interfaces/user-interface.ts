export interface User {
    uuid: string
    username: string
    email: string
    password: string
    codeOtp?: number
    noTelepon: string
    alamat: string
    tanggalLahir: Date
}