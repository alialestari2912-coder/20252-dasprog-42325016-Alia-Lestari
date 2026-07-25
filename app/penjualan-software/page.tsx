"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldError } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldGroup } from "@/components/ui/field-group";
import z from "zod";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";

// Validasi input penjualan software
const formSchema = z.object({
  jumlah: z
    .string()
    .min(1, "Jumlah software harus diisi")
    .regex(/^\d+$/, "Jumlah harus berupa angka")
    .refine((val) => Number(val) > 0, {
      message: "Jumlah minimal 1",
    }),
  sistemOperasi: z.string().min(1, "Silakan pilih sistem operasi"),
});

// Tipe hasil kalkulasi
type Hasil = {
  jumlah: number;
  sistemOperasi: string;
  subtotal: number;
  pajak: number;
  ongkir: number;
  total: number;
};

const PenjualanSoftware = () => {
  const [hasil, setHasil] = useState<Hasil | null>(null);

  const form = useForm({
    defaultValues: { jumlah: "", sistemOperasi: "" },
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      const jumlah = Number(value.jumlah);
      const subtotal = jumlah * 350000;
      const pajak = subtotal * 0.07;
      const ongkir = jumlah * 12500;
      const total = subtotal + pajak + ongkir;

      const hasilBaru = {
        jumlah,
        sistemOperasi: value.sistemOperasi,
        subtotal,
        pajak,
        ongkir,
        total,
      };

      setHasil(hasilBaru);

      // Kirim ke API untuk simpan JSON
      await fetch("/api/simpan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hasilBaru),
      });
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      <Card className="w-2/3 shadow-xl border border-gray-600 bg-gray-900 text-gray-100">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-orange-400">
            Penjualan Software
          </CardTitle>
          <CardDescription className="text-gray-300">
            Hitung biaya penjualan software dengan cepat
          </CardDescription>
        </CardHeader>
        <Separator className="my-4 bg-orange-500 rounded-full" />
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              {/* Input jumlah software */}
              <form.Field name="jumlah">
                {(field) => (
                  <Field>
                    <Label
                      htmlFor={field.name}
                      className="text-sm font-semibold text-orange-300"
                    >
                      Jumlah Software
                    </Label>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Masukkan jumlah software"
                      autoComplete="off"
                      className="mt-1 bg-gray-800 border border-gray-600 text-gray-100 focus:ring-2 focus:ring-orange-400"
                    />
                    <FieldDescription className="text-gray-400 text-xs">
                      Masukkan jumlah software yang dibeli
                    </FieldDescription>
                    {field.state.meta.isTouched && field.state.meta.errors && (
                      <FieldError
                        errors={field.state.meta.errors}
                        className="text-red-400 text-xs"
                      />
                    )}
                  </Field>
                )}
              </form.Field>

              {/* Dropdown sistem operasi */}
              <form.Field name="sistemOperasi">
                {(field) => (
                  <Field>
                    <Label
                      htmlFor={field.name}
                      className="text-sm font-semibold text-orange-300"
                    >
                      Sistem Operasi
                    </Label>
                    <select
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="mt-1 bg-gray-800 border border-gray-600 text-gray-100 rounded px-3 py-2 focus:ring-2 focus:ring-orange-400"
                    >
                      <option value="">-- Pilih OS --</option>
                      <option value="Linux">🐧 Linux</option>
                      <option value="Windows 64 bit">🪟 Windows 64 bit</option>
                      <option value="MacOS">🍎 MacOS</option>
                    </select>
                    <FieldDescription className="text-gray-400 text-xs">
                      Pilih sistem operasi yang digunakan
                    </FieldDescription>
                    {field.state.meta.isTouched && field.state.meta.errors && (
                      <FieldError
                        errors={field.state.meta.errors}
                        className="text-red-400 text-xs"
                      />
                    )}
                  </Field>
                )}
              </form.Field>
            </FieldGroup>

            <CardFooter className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setHasil(null);
                  form.reset();
                }}
                className="border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-gray-900"
              >
                Reset
              </Button>
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-gray-900 font-semibold"
              >
                Hitung
              </Button>
            </CardFooter>
          </form>
        </CardContent>

        {hasil && (
          <CardContent className="mt-4 bg-gray-800 rounded-lg p-4">
            <h1 className="font-semibold mb-3 text-orange-400">
              Hasil Kalkulasi
            </h1>
            <p>Jumlah: {hasil.jumlah}</p>
            <p>Sistem Operasi: {hasil.sistemOperasi}</p>
            <p>
              Subtotal:{" "}
              {hasil.subtotal.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
            <p>
              Pajak (7%):{" "}
              {hasil.pajak.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
            <p>
              Biaya Pengiriman:{" "}
              {hasil.ongkir.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
            <p className="font-bold text-orange-300">
              Total:{" "}
              {hasil.total.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default PenjualanSoftware;
