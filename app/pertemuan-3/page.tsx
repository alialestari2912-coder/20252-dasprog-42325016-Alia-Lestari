import { Button } from "@/components/ui/button";
const Page = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="p-4 text-2xl font-bold text-orange-500 border-2 border-b-amber-500 bg-amber-900">
        Pemrograman Website - Pertemuan 3
      </div>
      <div className="border-2 border-red-600 rounded-b-lg p-4">
        <h1 className="text-xl font-bold">Kalkulasi Lingkaran</h1>
        <div className="flex flex-row gap-3 items-center pl-3">
          <p className="mt-2 mb-2">Berapa radius Lingkaran?</p>
          <input
            className="mb-2"
            type="number"
            placeholder="Masukan Radius Lingkaran"
          />
        </div>
        <Button>Hitung LUAS dan KELILING Lingkaran</Button>
      </div>
    </div>
  );
};

export default Page;
