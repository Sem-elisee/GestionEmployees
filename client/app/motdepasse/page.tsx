"use client";
import * as React from "react";
import { useState } from "react";
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
import { LockKeyhole, Mail } from "lucide-react";

export default function Page() {
  const [emailChange, setEmailChange] = useState<string>("");
  return (
    <div
      className=" flex h-screen justify-center bg-center bg-cover items-center"
      style={{ backgroundImage: "url('/test.svg')" }}
    >
      <Card className="w-[330px] rounded-xl">
        <CardHeader>
          <div className="flex justify-center">
            <div className="border-[1.5px] p-3 rounded-full flex items-center justify-center shadow">
              <LockKeyhole className="text-[#373434ea]" size={22} />
            </div>
          </div>
          <CardTitle className=" text-center py-2">
            Mot de passe oublié
          </CardTitle>

          <CardDescription className=" text-center">
            Entrez email pour modifier votre mot de passe
          </CardDescription>
          {/* <div className=" border-dashed border-[1.34px]" /> */}
        </CardHeader>
        <CardContent>
          <form>
            <Label htmlFor="name">Email</Label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-[1.4rem] w-[1.4rem] " />
              </span>

              <Input
                placeholder="exemple@exemple.com"
                type="email"
                className="w-full pl-[2.80rem] h-[2.7rem]"
                required
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input id="name" placeholder="Votre Email" />
              </div>
            </div> */}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button className=" w-full h-[2.6rem]">Confirmer</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
