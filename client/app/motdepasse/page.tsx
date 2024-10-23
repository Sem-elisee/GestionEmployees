import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function page() {
  return (
    <div className=" flex h-screen justify-center items-center">
      <Card className="w-[340px]">
        <CardHeader>
          <CardTitle>Mot de passe oublié</CardTitle>
          <CardDescription className=" py-3">
            Entrez l`email que vous avez utilisée pour créer le compte et nous
            vous permettons de modifier votre mot de passe
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email</Label>
                <Input id="name" placeholder="Votre Email" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button className=" w-full h-[2.6rem]">Confirmer</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
