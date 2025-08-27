import z from "zod";

export const KreditLeasingValidation = z.object({
  kendaraanUuid: z.string().min(1, "Masukan uuid kendaraan yang valid!"),
  usersUuid: z.string().min(1, "Masukan uuid users yang valid!"),
  tipePengajuan: z.string().min(1, "Masukan tipe pengajuan yang valid!"),
  nominalDP: z.int().min(6, "Minmal 6 angka yang harus di isi!"),
  tenor: z.string().date("Masukan tenor yang valid!"),
  angsuran: z.int().min(6, "Minimal 6 angka yang harus di isi!"),
  status: z.string().min(1, "Masukan status yang valid!"),
  keterangan: z.string().nullable(),
});
