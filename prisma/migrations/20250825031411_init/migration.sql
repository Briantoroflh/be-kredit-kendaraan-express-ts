-- CreateEnum
CREATE TYPE "public"."TipePengajuan" AS ENUM ('perorangan', 'perusahaan');

-- CreateEnum
CREATE TYPE "public"."StatusLeasing" AS ENUM ('menunggu_persetujuan', 'disetujui', 'ditolak');

-- CreateEnum
CREATE TYPE "public"."StatusSkorKredit" AS ENUM ('lancar', 'dalam_perhatian_khusus', 'tidak_lancar');

-- CreateTable
CREATE TABLE "public"."Role" (
    "uuid" TEXT NOT NULL,
    "nama_role" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "public"."Users" (
    "uuid" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "code_otp" INTEGER,
    "no_telepon" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "tanggal_lahir" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "public"."UserRole" (
    "uuid" TEXT NOT NULL,
    "role_uuid" TEXT NOT NULL,
    "users_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "public"."TokenPermission" (
    "uuid" TEXT NOT NULL,
    "users_uuid" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expired_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TokenPermission_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "public"."TipeKendaraan" (
    "uuid" TEXT NOT NULL,
    "nama_tipe" TEXT NOT NULL,
    "jumlah" INTEGER NOT NULL,

    CONSTRAINT "TipeKendaraan_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "public"."Kendaraan" (
    "uuid" TEXT NOT NULL,
    "tipe_uuid" TEXT NOT NULL,
    "nama_kendaraan" TEXT NOT NULL,
    "merek_kendaraan" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "transmisi" TEXT NOT NULL,
    "warna" TEXT NOT NULL,
    "cc_kendaraan" INTEGER NOT NULL,
    "tahun_pembuatan" INTEGER NOT NULL,
    "detail" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Kendaraan_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "public"."Harga" (
    "uuid" TEXT NOT NULL,
    "kendaraan_uuid" TEXT NOT NULL,
    "harga" INTEGER NOT NULL,
    "start_at" TIMESTAMP(3) NOT NULL,
    "end_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Harga_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "public"."LeasingKredit" (
    "uuid" TEXT NOT NULL,
    "kendaraan_uuid" TEXT NOT NULL,
    "users_uuid" TEXT NOT NULL,
    "tipe_pengajuan" "public"."TipePengajuan" NOT NULL,
    "persyaratan_perusahaan_uuid" TEXT,
    "persyaratan_perorangan_uuid" TEXT,
    "nominal_DP" INTEGER NOT NULL,
    "tenor" TEXT NOT NULL,
    "angsuran" INTEGER NOT NULL,
    "status" "public"."StatusLeasing" NOT NULL,
    "keterangan" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LeasingKredit_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "public"."PersyaratanLeasingPerusahaan" (
    "uuid" TEXT NOT NULL,
    "nama_perusahaan" TEXT NOT NULL,
    "akta_pendirian_perusahaan" TEXT NOT NULL,
    "SIUP" TEXT NOT NULL,
    "TDP" TEXT NOT NULL,
    "tujuan_kendaraan" TEXT NOT NULL,
    "omzet_perusahaan" INTEGER NOT NULL,

    CONSTRAINT "PersyaratanLeasingPerusahaan_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "public"."PersyaratanLeasingPerorangan" (
    "uuid" TEXT NOT NULL,
    "kartu_keluarga" TEXT NOT NULL,
    "ktp" TEXT NOT NULL,
    "gaji_perbulan" INTEGER NOT NULL,
    "rekening_listrik" TEXT NOT NULL,
    "pekerjaan" TEXT NOT NULL,
    "foto_selfie" TEXT NOT NULL,

    CONSTRAINT "PersyaratanLeasingPerorangan_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "public"."RiwayatKredit" (
    "uuid" TEXT NOT NULL,
    "users_uuid" TEXT NOT NULL,
    "tanggal_cek" TIMESTAMP(3) NOT NULL,
    "skor_kredit" INTEGER NOT NULL,
    "status_skor_kredit" "public"."StatusSkorKredit" NOT NULL,
    "keterangan_biro_kredit" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RiwayatKredit_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "public"."Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TokenPermission_users_uuid_key" ON "public"."TokenPermission"("users_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "TokenPermission_token_key" ON "public"."TokenPermission"("token");

-- AddForeignKey
ALTER TABLE "public"."UserRole" ADD CONSTRAINT "UserRole_role_uuid_fkey" FOREIGN KEY ("role_uuid") REFERENCES "public"."Role"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserRole" ADD CONSTRAINT "UserRole_users_uuid_fkey" FOREIGN KEY ("users_uuid") REFERENCES "public"."Users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TokenPermission" ADD CONSTRAINT "TokenPermission_users_uuid_fkey" FOREIGN KEY ("users_uuid") REFERENCES "public"."Users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Kendaraan" ADD CONSTRAINT "Kendaraan_tipe_uuid_fkey" FOREIGN KEY ("tipe_uuid") REFERENCES "public"."TipeKendaraan"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Harga" ADD CONSTRAINT "Harga_kendaraan_uuid_fkey" FOREIGN KEY ("kendaraan_uuid") REFERENCES "public"."Kendaraan"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LeasingKredit" ADD CONSTRAINT "LeasingKredit_kendaraan_uuid_fkey" FOREIGN KEY ("kendaraan_uuid") REFERENCES "public"."Kendaraan"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LeasingKredit" ADD CONSTRAINT "LeasingKredit_users_uuid_fkey" FOREIGN KEY ("users_uuid") REFERENCES "public"."Users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LeasingKredit" ADD CONSTRAINT "LeasingKredit_persyaratan_perusahaan_uuid_fkey" FOREIGN KEY ("persyaratan_perusahaan_uuid") REFERENCES "public"."PersyaratanLeasingPerusahaan"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LeasingKredit" ADD CONSTRAINT "LeasingKredit_persyaratan_perorangan_uuid_fkey" FOREIGN KEY ("persyaratan_perorangan_uuid") REFERENCES "public"."PersyaratanLeasingPerorangan"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RiwayatKredit" ADD CONSTRAINT "RiwayatKredit_users_uuid_fkey" FOREIGN KEY ("users_uuid") REFERENCES "public"."Users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
