// app/data-persistent/page.tsx
import { readFile, writeFile } from "fs/promises";
import path from "path";

export default async function DataPersistentPage() {
  const filePath = path.join(process.cwd(), "data", "pengecatan.json");
  const data = await readFile(filePath, "utf-8");

  console.log("Data dari file JSON:", data);

  // deserialisasi data JSON menjadi objek JavaScript
  const parsedData = JSON.parse(data);

  console.log("Data yang sudah di-parse:", parsedData);

  // menambahkan data baru ke dalam objek JavaScript
  parsedData.push({
    id: parsedData.length + 1,
    tanggal: new Date().toISOString(),
    panjang: 10,
    lebar: 5,
    tinggi: 3,
    caraPembayaran: "Transfer",
    hargaCat: 50000,
    biayaTenagaKerja: 20000,
    totalBiaya: 70000,
  });
  console.log("Data yang sudah di-parse:", parsedData);
  //serealisasi objek JavaScript menjadi string JSON
  const updatedData = JSON.stringify(parsedData, null, 2);
  //menyimpan data yang sudah diperbarui ke dalam file JSON
  await writeFile(
    path.join(process.cwd(), "data", "pengecatan.json"),
    updatedData,
    "utf-8",
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Data Pengecatan</h1>
      <pre>{JSON.stringify(parsedData, null, 2)}</pre>
    </div>
  );
}
