"use client";
import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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
import { Phone, Mails, User } from "lucide-react";
import { PiLockKeyOpenDuotone } from "react-icons/pi";
import Link from "next/link";

export default function Main() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    // <section className="bg-red-300 overflow-y-hidden p-4">
    /* <main className="bg-red-500 overflow-y-hidden rounded-md"> */
    <div
      className=" flex justify-center items-center object-cover h-screen bg-cover bg-center "
      style={{ backgroundImage: "url('/img1.jpg')" }}
    >
      <Card className="w-[320px]">
        <CardContent className=" p-6">
          <div className=" flex items-center justify-center">
            <Image src="/login.svg" width={150} height={150} alt="logo" />
          </div>
          <form action="" className=" space-y-4">
            <div></div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-[1.4rem] w-[1.4rem] " />
              </span>
              <Input
                placeholder="Nom d'utilisateur"
                className="w-full pl-[2.80rem] h-[2.7rem]"
                required
              />
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mails className="h-[1.4rem] w-[1.4rem] " />
              </span>
              <Input
                placeholder="exemple@exemple.com"
                className="w-full pl-[2.80rem] h-[2.7rem]"
                required
              />
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-2 gap-1 flex items-center pointer-events-none">
                {/* <Phone className="h-[1.1rem] w-[1.3rem] " /> */}
                <Image src="/civ.png" width={20} height={20} alt="" />
                <h1>+225</h1>
              </span>
              <Input
                placeholder="Numéro de téléphone"
                type="number"
                className="w-full pl-[4.7rem] h-[2.7rem]"
                required
              />
            </div>
            <div className="relative ">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <PiLockKeyOpenDuotone className="h-[1.4rem] w-[1.4rem]" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                className="w-full  h-10 pl-[2.70rem]  rounded-md  border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed  pr-10 p-2 border border-gray-300 "
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute z-[999999] right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            <Button type="submit" className=" h-[2.5rem] w-full bg-[#08162a]">
              Appuyer
            </Button>
            <div className=" flex text-center justify-center">
              <div className=" flex gap-0 text-center text-[.8rem] text-[#777676]">
                Vous avez déjà un compte?
                <Link href="/">
                  <h3 className=" relative left-2 font-bold text-[#08162a]">
                    Connectez-vous
                  </h3>
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
    // </main>
    // </section>
  );
}

// "use client";
// import React, { useState } from "react";

// const page = () => {

//   return (
//     <div style={{ position: "relative", width: "250px" }}>
//       <input
//         type={showPassword ? "text" : "password"}
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Enter password"
//         style={{ width: "100%", paddingRight: "30px" }}
//       />

//     </div>
//   );
// };

// export default page;
