enum StatusKredit {
    MenungguPersetujuan = "menunggu_persetujuan",
    Disetujui = "disetujui",
    Ditolak = "ditolak"
}

enum TipePengajuan {
    Perusahaan = "perusahaan",
    Perorangan = "perorangan"
}

export interface LeasingKredit {
    uuid: string
    kendaraanUuid: string
    usersUuid: string
    tipePengajuan: TipePengajuan
    persyaratanPerusahaanUuid: string
    persyaratanPeroranganUuid: string
    nominalDP: number
    tenor: string
    angsuran: number
    status: StatusKredit
    keterangan?: string
    created_at: Date
    updated_at: Date
}