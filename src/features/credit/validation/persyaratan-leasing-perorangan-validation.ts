import { z } from "zod";

export const PLPRValidation = z.object({
  leasingKreditUuid: z.string().uuid({ message: "UUID tidak valid" }),
  gajiPerbulan: z.coerce
    .number()
    .min(1000000, { message: "Minimal gaji 1 juta" }),
  pekerjaan: z.string().min(3, { message: "Pekerjaan minimal 3 karakter" }),

  kartuKeluarga: z.string().url({ message: "URL kartu keluarga tidak valid" }),
  ktp: z.string().url({ message: "URL KTP tidak valid" }),
  rekeningListrik: z
    .string()
    .url({ message: "URL rekening listrik tidak valid" }),
  fotoSelfie: z.string().url({ message: "URL foto selfie tidak valid" }),
  angsuran: z.coerce.number().min(100000, "Minimal angsuran 100 ribu")
});
