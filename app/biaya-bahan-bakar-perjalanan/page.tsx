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

// Validasi input dengan Zod
const formSchema = z.object({
  konsumsi: z
    .string()
    .min(1, "Pemakaian harus diisi")
    .regex(/^\d+(\.\d+)?$/, "Harus angka positif")
    .regex(/^(?!0+(\.0+)?$)\d+(\.\d+)?$/, "Tidak boleh nol")
    .transform(Number),
  jarak: z
    .string()
    .min(1, "Jarak harus diisi")
    .regex(/^\d+(\.\d+)?$/, "Harus angka positif")
    .regex(/^(?!0+(\.0+)?$)\d+(\.\d+)?$/, "Tidak boleh nol")
    .transform(Number),
  harga: z
    .string()
    .min(1, "Harga harus diisi")
    .regex(/^\d+$/, "Harus angka bulat positif")
    .regex(/^(?!0+(\.0+)?$)\d+(\.\d+)?$/, "Tidak boleh nol")
    .transform(Number),
});

const BiayaBahanBakar = () => {
  const [biaya, setBiaya] = useState<number | null>(null);
  const [clickedButton, setClickedButton] = useState<string | null>(null);

  const form = useForm({
    defaultValues: { konsumsi: "", jarak: "", harga: "" },
    validators: { onSubmit: formSchema },
    onSubmit: ({ value }) => {
      const konsumsi = Number(value.konsumsi);
      const jarak = Number(value.jarak);
      const harga = Number(value.harga);

      const totalBiaya = konsumsi * jarak * harga;
      setBiaya(totalBiaya);
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-2/3">
        <CardHeader>
          <CardTitle>Biaya Bahan Bakar</CardTitle>
          <CardDescription>Hitung biaya bahan bakar perjalanan</CardDescription>
        </CardHeader>
        <Separator className="my-4 bg-gray-500 rounded-3xl" />
        <CardContent>
          <form
            id="biaya-bahan-bakar-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field name="konsumsi">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <Label htmlFor={field.name}>
                        Pemakaian rata-rata (liter/km)
                      </Label>
                      <Input
                        id={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        autoComplete="off"
                        aria-invalid={isInvalid}
                        className="border-b border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-400"
                      />
                      <FieldDescription>
                        Masukan konsumsi bahan bakar per km. Contoh: jika
                        kendaraan 10 km/liter, maka isi **0.1**.
                      </FieldDescription>
                      {isInvalid && (
                        <FieldError
                          errors={
                            field.state.meta.errors as
                              | { message: string }[]
                              | undefined
                          }
                        />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <form.Field name="jarak">
                {(field) => (
                  <Field>
                    <Label htmlFor={field.name}>Jarak perjalanan (km)</Label>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="border-b border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-400"
                    />
                    <FieldDescription>
                      Masukan jarak perjalanan dalam km
                    </FieldDescription>
                    {field.state.meta.errors && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )}
              </form.Field>

              <form.Field name="harga">
                {(field) => (
                  <Field>
                    <Label htmlFor={field.name}>Harga per liter (Rp)</Label>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="border-b border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-400"
                    />
                    <FieldDescription>
                      Masukan harga bahan bakar per liter
                    </FieldDescription>
                    {field.state.meta.errors && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )}
              </form.Field>
            </FieldGroup>
          </form>
        </CardContent>
        <Separator />
        {biaya !== null && (
          <div className="px-6 text-orange-700">
            <h1 className="font-semibold mb-3">Hasil Kalkulasi</h1>
            <p>
              Total Biaya Perjalanan: Rp{" "}
              {biaya.toLocaleString("id-ID", {
                minimumFractionDigits: 0,
              })}
            </p>
          </div>
        )}
        <Separator />
        <CardFooter className="flex gap-2">
          <Button
            variant="outline"
            className={clickedButton === "reset" ? "bg-black text-white" : ""}
            onClick={() => {
              setBiaya(null);
              form.reset();
              setClickedButton("reset");
            }}
          >
            Reset
          </Button>
          <Button
            type="submit"
            form="biaya-bahan-bakar-form"
            className={clickedButton === "hitung" ? "bg-black text-white" : ""}
            onClick={() => setClickedButton("hitung")}
          >
            Hitung Biaya
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BiayaBahanBakar;
