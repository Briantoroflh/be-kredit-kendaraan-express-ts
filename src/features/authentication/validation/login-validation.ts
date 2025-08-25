import {z} from 'zod';

export const LoginValidtion = z.object({
    email: z.string().email("Masukan email yang valid!"),
    password: z.string().min(6, "Panjang password minimal 6 huruf!")
})