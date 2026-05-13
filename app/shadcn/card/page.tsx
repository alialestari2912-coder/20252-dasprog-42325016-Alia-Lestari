import { Button } from "@/components/ui/button";
import { BadgeCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
const CardDemo = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-2/3">
        <CardHeader>
          <CardTitle>Judul Card</CardTitle>
          <CardDescription>
            Deskripsi card - ini adalah deskripsi dari card
          </CardDescription>
          <CardAction>
            <Badge variant="destructive">
              <BadgeCheck data-icon="inline-start" />
              Badge
            </Badge>
          </CardAction>
        </CardHeader>
        <Separator className="my-4 bg-gray-500 rounded-3xl" />
        <CardContent>
          <h1 className="font-bold"> Isi Card</h1>
          <p>
            Ini adalah isi dari card, bisa berisi text, gambar, atau komponen
            lainnya
          </p>
        </CardContent>
        <Separator />
        <CardFooter className="flex gap=2">
          <Button> Button 1</Button>
          <Button> Button 2</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardDemo;
