import {z} from "zod";

export  const PembayaranValidation = z.object({
    nominalPembayaran: z.coerce.number().min(100000, "Minimal nominal pembayaran 100 ribu"),
})