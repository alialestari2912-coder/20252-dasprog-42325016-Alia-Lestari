// app/data-persistent/page.tsx
import { readFile, writeFile } from "fs/promises";
import path from "path";

export default async function DataPersistentPage() {
  const filePath = path.join(
    process.cwd(),
    "data",
    "data-penjualan-software.json",
  );
  const data = await readFile(filePath, "utf-8");

  // deserialisasi data JSON menjadi objek JavaScript
  const parsedData = JSON.parse(data);

  console.log("Data yang sudah di-parse:", parsedData);

  // menambahkan data baru ke dalam array "data"
  parsedData.data.push({
    id: parsedData.idTerakhir + 1,
    tglPembelian: new Date().toISOString(),
    jumlah: 5,
    sistemOperasi: "Windows",
    hrgPerangkatLunak: 350000,
    pajak: 0.07,
    biayaPengiriman: 12500,
    totalHarga: 5 * 350000 + 5 * 12500 + 5 * 350000 * 0.07,
  });

  // update idTerakhir
  parsedData.idTerakhir = parsedData.idTerakhir + 1;

  // serealisasi objek JavaScript menjadi string JSON
  const updatedData = JSON.stringify(parsedData, null, 2);

  // menyimpan data yang sudah diperbarui ke dalam file JSON
  await writeFile(filePath, updatedData, "utf-8");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Data Penjualan Software</h1>
      <pre>{JSON.stringify(parsedData, null, 2)}</pre>
    </div>
  );
}
