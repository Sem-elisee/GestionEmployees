"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Page() {
  const [code, setCode] = useState<string>("");
  return (
    <div>
      <div
        className=" flex h-screen justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: "url('/test.svg')" }}
      >
        <Card className="w-[327px] rounded-xl">
          <CardHeader>
            <CardTitle>Code de confirmation</CardTitle>
            <CardDescription className=" py-3">
              Nous venons de vous envoyer un SMS a votre numero associe a ce
              compte contenant un code. Saisissez-le pour confirmer cette étape.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Saisissez le code</Label>
                  <Input
                    id="name"
                    placeholder="Saisissez le code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
                <Button className=" w-full h-[2.6rem]">Confirmer</Button>
              </div>
            </form>
          </CardContent>
          {/* <CardFooter className="flex justify-between"></CardFooter> */}
        </Card>
      </div>
    </div>
  );
}
