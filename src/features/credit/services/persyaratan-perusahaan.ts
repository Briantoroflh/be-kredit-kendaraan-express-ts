import { AddPersyaratanPerusahaan } from "common/model/persyaratan-perusahaan-model";

interface PersyaratanPerusahaanResult {
  success: boolean;
  message: string;
}

export const PersyaratanLeasingPerusahaan = async (
  leasingKreditUuid: string,
  namaPerusahaan: string,
  aktaPendirianPerusahaan: string,
  SIUP: string,
  TDP: string,
  tujuankendaraan: string,
  omzetPerusahaan: number
): Promise<PersyaratanPerusahaanResult> => {
  const minOmzet: number = 100000000;
  if (omzetPerusahaan < minOmzet) {
    return {
      success: false,
      message:
        "Minimal omzet perusahaan anda tidak mencukupi untuk pengajuan kredit!",
    } as PersyaratanPerusahaanResult;
  }

  AddPersyaratanPerusahaan(
    leasingKreditUuid,
    namaPerusahaan,
    aktaPendirianPerusahaan,
    SIUP,
    TDP,
    tujuankendaraan,
    omzetPerusahaan
  );

  

  return {
    success: true,
    message: "Pengajuan kredit berjhasil!",
  } as PersyaratanPerusahaanResult;
};
