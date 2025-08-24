enum StatusSkorKredit {
    Lancar = "lancar",
    DalamPerhatianKhusus = "dalam_perhatian_khusus",
    TidakLancar = "tidak_lancar"
}

export interface RiwayatKredit {
    uuid: string
    usersUuid: string
    tanggalCek: Date
    skorKredit: number
    statusSkorKredit: StatusSkorKredit
    keteranganBiroKredit: string
    created_at: Date
}