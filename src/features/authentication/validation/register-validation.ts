import {z} from 'zod';

export const RegisterValidation = z.object({
    username: z.string().min(1, "Masukan username yang valid!"),
    email: z.string().email("Masukan email yang valid!"),
    password: z.string().min(6, "Panjang password minimal 6 huruf!"),
    noTelepon: z.string().min(1,"Masukan nomor telepon yang valid!"),
    alamat: z.string().min(1, "Masukan alamat yang valid!"),
    tanggalLahir: z.string().date("Masukan tanggal yang valid!")
})