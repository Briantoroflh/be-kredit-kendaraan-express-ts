import { createKreditLeasing } from "../../../common/model/kredit-leasing-model";
import { StatusLeasing, TipePengajuan } from "../../../generated/prisma";
import { differenceInMonths } from "date-fns";

interface KreditLeasingResult {
  success: boolean;
  message: string;
}

export const KreditLeasingService = async (
  kendaraanUuid: string,
  usersUuid: string,
  tipePengajuan: TipePengajuan,
  nominalDP: number,
  tenor: string,
  angsuran: number,
  status: StatusLeasing,
  keterangan: string
): Promise<KreditLeasingResult> => {

  const minTenor = differenceInMonths(new Date(), new Date(tenor));
  if(!minTenor) {
    return {
        success: false,
        message: "Tenor minimal 1 bulan!",
    } as KreditLeasingResult
  }

  await createKreditLeasing(
    kendaraanUuid,
    usersUuid,
    tipePengajuan,
    nominalDP,
    tenor,
    angsuran,
    status,
    keterangan
  );

  return {
    success: true,
    message: "Kredit leasing berhasil dibuat!",
  } as KreditLeasingResult;
};
