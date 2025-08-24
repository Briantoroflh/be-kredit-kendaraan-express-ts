export interface Kendaraan {
    uuid: string
    tipeUuid: string
    namaKendaraan: string
    merekKendaraan: string
    model: string
    transmisi: string
    warna: string
    ccKendaraan: number
    tahunPembuatan: number
    detail: number
    created_at?: Date
    updated_at?: Date
}