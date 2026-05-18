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
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldGroup } from "@/components/ui/field-group";
import z from "zod";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";

//Validasi formulir menggunakan Zod untuk memastikan input adalah angka positif
const formSchema = z.object({
  radius: z
    .string()
    .min(1, "Radius lingkaran harus diisi")
    .regex(/^-?\d+(\.\d+)?$/, "Radius lingkaran harus berupa angka")
    .regex(/^[^-]/, "Radius lingkaran harus berupa angka positif")
    .regex(/^(?!0+(\.0+)?$).+$/, "Radius lingkaran harus lebih besar dari nol")
    .transform(Number),
});
const HitungLingkaran = () => {
  // State untuk menyimpan hasil perhitungan luas dan keliling serta status apakah sudah dihitung
  const [radius, setRadius] = useState(0);
  const [luas, setLuas] = useState(0);
  const [keliling, setKeliling] = useState(0);
  const [sdhDihitung, setSdhDihitung] = useState(false);
  // Inisialisasi form
  const form = useForm({
    // menentukan default values untuk masing-masing field dalam formulir
    defaultValues: { radius: "" },
    //menentukan validasi untuk setiap field dalam formulir menggunakan zod.
    validators: { onSubmit: formSchema },
    //menentukan fungsi yang akan dipanggil ketika formulir di submit.
    onSubmit: () => {},
  });

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-2/3">
        <CardHeader>
          <CardTitle>Kalkulasi Lingkaran</CardTitle>
          <CardDescription>Hitung luas dan keliling lingkaran </CardDescription>
        </CardHeader>
        <Separator className="my-4 bg-gray-500 rounded-3xl" />
        <CardContent>
          <form
            id="hitung-lingkaran-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field name="radius">
                {(field) => {
                  // menentukan apakah field radius sudah disentuh dan valid atau tidak
                  // untuk menamppilkan pesan error jika input tidak valid.
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <Label htmlFor={field.name}>Radius Lingkaran</Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Masukan radius lingkaran dalam cm"
                        autoComplete="off"
                      />
                      <FieldDescription>
                        Masukan radius lingkaran dalam satuan cm
                      </FieldDescription>
                      {isInvalid && (
                        <FieldError
                          errors={
                            field.state.meta.errors as
                              | { message: string }[]
                              | undefined
                          }
                        ></FieldError>
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </FieldGroup>
          </form>
        </CardContent>
        <Separator />
        <CardFooter className="flex gap=2">
          <Button> Reset</Button>
          <Button type="submit" form="hitung-lingkaran-form" variant="outline">
            Hitung Luas dan Keliling
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default HitungLingkaran;
