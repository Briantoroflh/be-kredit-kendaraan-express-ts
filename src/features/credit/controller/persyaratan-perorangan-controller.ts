import {errorsResponse, successResponse} from "../../../common/utils/api-response";
import {Request, Response} from "express";
import {PLPRValidation} from "../validation/persyaratan-leasing-perorangan-validation";
import {ZodError} from "zod";
import {PersyaratanLeasingPerorangan} from "../services/persyaratan-perorangan";
import {getHargaByKendaraanUuid} from "../../../common/model/harga-model";
import {getKendaraanByKreditUsers} from "../../../common/model/persyaratan-perorangan-model";
import {
    getKreditByUsersUuid,
    getStatusKreditByUuid,
    getUsersByKreditUuid
} from "../../../common/model/kredit-leasing-model";
import {AddAngsuranBerjalan} from "../../../common/model/angsuran-berjalan-model";

export const PersyaratanPeroranganController = async (
    req: Request,
    res: Response
) => {

    if (!req.body) {
        return res.status(400).json(errorsResponse("Tidak ada body request!"))
    }

    const files = req.files as {
        [fieldname: string]: Express.Multer.File[];
    };

    const baseUrl = `${req.protocol}://${req.get("host")}/uploads`;

    const data = {
        leasingKreditUuid: req.body.leasingKreditUuid,
        gajiPerbulan: Number(req.body.gajiPerbulan),
        pekerjaan: req.body.pekerjaan,
        angsuran: Number(req.body.angsuran),

        kartuKeluarga: files?.kartuKeluarga?.[0]
            ? `${baseUrl}/${files.kartuKeluarga[0].filename}`
            : undefined,
        ktp: files?.ktp?.[0] ? `${baseUrl}/${files.ktp[0].filename}` : undefined,
        rekeningListrik: files?.rekeningListrik?.[0]
            ? `${baseUrl}/${files.rekeningListrik[0].filename}`
            : undefined,
        fotoSelfie: files?.fotoSelfie?.[0]
            ? `${baseUrl}/${files.fotoSelfie[0].filename}`
            : undefined,
    };

    const statusKredit = await getStatusKreditByUuid(data.leasingKreditUuid)

    if (!statusKredit) {
        return res.status(404).json(errorsResponse("Kredit tidak di temukan!"))
    }

    if(statusKredit.status == "menunggu_persetujuan"){
        return res.status(400).json(errorsResponse("Kredit sedang menunggu persetujuan!"))
    }

    if (!data) {
        return res
            .status(400)
            .json(
                errorsResponse("Mohon isi terlebih dahulu form persyaratan perorangan!")
            );
    }

    try {
        PLPRValidation.parse(data);
    } catch (error) {
        return res.status(400).json(
            errorsResponse(
                "Data yang di isi belom valid!",
                (error as ZodError).issues.map((e) => ({
                    field: e.path[0],
                    message: e.message,
                }))
            )
        );
    }

    const persyaratanResult = await PersyaratanLeasingPerorangan(
        data.leasingKreditUuid,
        data.kartuKeluarga,
        data.ktp,
        data.gajiPerbulan,
        data.rekeningListrik,
        data.pekerjaan,
        data.fotoSelfie,
        data.angsuran
    );

    const kendaraanResult = await getKendaraanByKreditUsers(data.leasingKreditUuid);
    const kendaraanId = kendaraanResult?.[0]?.leasingKredit?.kendaraan_uuid

    const harga = await getHargaByKendaraanUuid(kendaraanId);
    if (!harga) {
        return res.status(404).json(errorsResponse("Harga tidak di temukan!"))
    }

    const user = await getUsersByKreditUuid(data.leasingKreditUuid)

    const kredit = await getKreditByUsersUuid(user.users_uuid)
    const totalPinjaman = harga.harga - kredit.nominal_DP; // kendaraan.harga is the vehicle price
    const sisaAngsuran = totalPinjaman;

    await AddAngsuranBerjalan(kredit.uuid, data.angsuran, kredit.nominal_DP, sisaAngsuran, kredit.tenor,"berjalan");

    if (!persyaratanResult.success) {
        return res.status(400).json(errorsResponse(persyaratanResult.message))
    }

    return res.status(200).json(successResponse(persyaratanResult.message));
};
