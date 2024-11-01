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
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { LockKeyhole } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState<any>("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className=" flex h-screen justify-center items-center bg-center bg-cover"
      style={{ backgroundImage: "url('/test.svg')" }}
    >
      <Card className="w-[330px] rounded-xl">
        <CardHeader>
          <CardTitle className=" flex items-center gap-3">
            <div className=" shadow-md border-[1.5px] p-2 rounded-full">
              <LockKeyhole className=" text-[#373434ea]" size={22} />
            </div>
            Changer le mot de passe
          </CardTitle>
          <CardDescription className=" py-3">
            mettre à jour le mot de passe pour une sécurité renforcée du compte.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className=" space-y-4">
            <div className="grid w-full items-center gap-3">
              <Label htmlFor="name">Nouveau mot de passe</Label>
              <div className="relative ">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="exemple@exemple.com"
                  className="w-full rounded-md  border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed  pr-10 p-2 border border-gray-300 "
                />
                <span
                  onClick={togglePasswordVisibility}
                  className="absolute z-[999999] right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>
            <div className="grid w-full items-center gap-3">
              <Label htmlFor="name">Nouveau mot de passe</Label>
              <div className="relative ">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="exemple@exemple.com"
                  className="w-full rounded-md  border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed  pr-10 p-2 border border-gray-300 "
                />
                <span
                  onClick={togglePasswordVisibility}
                  className="absolute z-[999999] right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              {/* <div className="relative ">
                <Label className="">Confirmer le nouveau mot de passe</Label>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="exemple@exemple.com"
                  className="w-full rounded-md  border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed  pr-10 p-2 border border-gray-300 "
                />
                <span
                  onClick={togglePasswordVisibility}
                  className="absolute z-[999999] right-3 top-1/1 transform -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div> */}
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
