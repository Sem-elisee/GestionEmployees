"use client";
import * as React from "react";
import { toast, Toaster } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Mails, Phone, PhoneCall, User } from "lucide-react";
import { PiLockKeyOpenDuotone } from "react-icons/pi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Main() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let AdminData = {
      Email: email,
      Mot_de_Passe: password,
    };

    try {
      axios
        .post(`http://localhost:2003/api/v.01/logAdmin`, AdminData)
        .then((response) => {
          if (response) {
            toast.success(" Bienvenue, administrateur !");
            const token = response.data.token;
            const telephone = response.data.Numero; // Supposons que l'API retourne aussi le téléphone
            if (token) {
              localStorage.setItem("authToken", token);
              // localStorage.setItem("adminEmail", email);
              router.push("/tableaudebord");
            }
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error(
            "Erreur de connexion. Vérifiez votre email et votre mot de passe."
          );
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      className=" flex justify-center items-center h-screen bg-cover bg-center "
      style={{ backgroundImage: "url('/blob-scene-haikei 11.svg')" }}
    >
      <Card className="w-[320px] rounded-lg">
        <CardContent className=" p-6">
          <div className=" flex items-center p-2 justify-center">
            <Image src="/register.svg" width={150} height={150} alt="logo" />
          </div>
          <div></div>
          <form className=" space-y-4" onSubmit={handleSubmit}>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mails className="h-[1.4rem] w-[1.4rem] " />
              </span>
              <Input
                placeholder="exemple@exemple.com"
                className="w-full pl-[2.80rem] h-[2.7rem]"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative ">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <PiLockKeyOpenDuotone className="h-[1.4rem] w-[1.4rem]" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                className="w-full  h-10 pl-[2.70rem]  rounded-md  border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed  pr-10 p-2 border border-gray-300 "
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            <Button type="submit" className=" h-[2.5rem] w-full bg-[#08162a]">
              Appuyer
            </Button>
            <div className=" flex text-center justify-center">
              <div className=" flex gap-0 text-center text-[.8rem] text-[#777676]">
                Vous n’avez pas de compte?
                <Link href="/inscription">
                  <h3 className=" relative left-2 font-bold text-[#08162a]">
                    Inscrivez-vous
                  </h3>
                </Link>
              </div>
            </div>
          </form>
          <div></div>
        </CardContent>
      </Card>
    </div>
  );
}
