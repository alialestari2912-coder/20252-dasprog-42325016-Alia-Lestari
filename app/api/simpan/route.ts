import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data.json");

export async function POST(req: Request) {
  const body = await req.json();

  // Baca isi file JSON
  const fileData = fs.readFileSync(filePath, "utf-8");
  const json = JSON.parse(fileData);

  // Buat transaksi baru
  const newId = json.idTerakhir + 1;
  const transaksiBaru = {
    id: newId,
    tglPembelian: new Date().toISOString(),
    jumlah: body.jumlah,
    sistemOperasi: body.sistemOperasi,
    hrgPerangkatLunak: body.subtotal,
    pajak: body.pajak,
    biayaPengiriman: body.ongkir,
    totalHarga: body.total,
  };

  // Update JSON
  json.idTerakhir = newId;
  json.data.push(transaksiBaru);

  // Simpan kembali ke file
  fs.writeFileSync(filePath, JSON.stringify(json, null, 2));

  // Balikan response ke client
  return NextResponse.json({ success: true, transaksiBaru });
}
