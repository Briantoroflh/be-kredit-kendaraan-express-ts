import z from "zod";

export const AngsuranBerjalanValidation = z.object({
    leasingKreditUuid: z.string().uuid({message: "UUID tidak valid"}),
    jumlahAngsuran: z.coerce
        .number()
        .min(100000, "Minimal jumlah angsuran 100 ribu"),
    jumlahDibayar: z.coerce
        .number()
        .min(100000, "Minimal jumlah dibayar 100 ribu"),
    sisaAngsuran: z.coerce.number().min(1, "Minimal jumlah sisa bayaran 1 angka"),
});
