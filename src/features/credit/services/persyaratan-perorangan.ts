import { AddPersyaratanPerorangan } from "../../../common/model/persyaratan-perorangan-model";

interface PersyaratanPeroranganResult {
  success: boolean;
  message: string;
}

export const PersyaratanLeasingPerorangan = async (
  leasingKreditUuid: string,
  kartuKeluarga: string,
  ktp: string,
  gajiPerbulan: number,
  rekeningListrik: string,
  pekerjaan: string,
  fotoSelfie: string,
  angsuran: number
): Promise<PersyaratanPeroranganResult> => {
  const maxAngsuran = gajiPerbulan * 0.4;

  if (angsuran > maxAngsuran) {
    // Hitung gaji yang seharusnya agar angsuran <= 40%
    const gajiDibutuhkan = angsuran / 0.4;

    // Hitung selisih gaji yang masih kurang
    const tambahanGaji = gajiDibutuhkan - gajiPerbulan;
    return {
      success: false,
      message:
        "Gaji anda tidak mencukupi untuk kredit kendaraan! minimal tambah " +
        tambahanGaji +
        " ribu lagi, 40% dari gaji anda",
    } as PersyaratanPeroranganResult;
  }

  await AddPersyaratanPerorangan(
    leasingKreditUuid,
    kartuKeluarga,
    ktp,
    gajiPerbulan,
    rekeningListrik,
    pekerjaan,
    fotoSelfie
  );

  return {
    success: true,
    message: "Pengajuan kredit berhasil!",
  } as PersyaratanPeroranganResult;
};
