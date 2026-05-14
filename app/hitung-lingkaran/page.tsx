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

const Page = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-2/3">
        <CardHeader>
          <CardTitle>Kalkulasi Lingkaran</CardTitle>
          <CardDescription>Hitung luas dan keliling lingkaran </CardDescription>
        </CardHeader>
        <Separator className="my-4 bg-gray-500 rounded-3xl" />
        <CardContent>
          <FieldGroup>
            <Field>
              <Label htmlFor="radius">Radius Lingkaran</Label>
              <Input id="radius" placeholder="Masukkan radius lingkaran" />
              <FieldDescription>
                Masukan radius lingkaran dalam satuan cm
              </FieldDescription>
              <FieldError>
                Radius lingkaran harus berupa angka positif.
              </FieldError>
            </Field>
          </FieldGroup>
        </CardContent>
        <Separator />
        <CardFooter className="flex gap=2">
          <Button> Reset</Button>
          <Button variant="outline"> Hitung Luas dan Keliling</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
