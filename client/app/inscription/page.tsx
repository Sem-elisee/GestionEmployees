"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
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
import PasswordStrenth from "@/components/PasswordStrenth";
import { motion } from "framer-motion";
import axios from "axios";
import { useUserStore } from "@/store/Store";

export default function Main() {
  // const [isClient, setIsClient] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [numero, setNumero] = useState<string>("");
  const [password, setPassword] = useState<any>("");
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const router = useRouter();

  const setUserInfo = useUserStore((state) => state.setUserInfo);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordValidation = (Valid: boolean) => {
    setIsValid(Valid);
  };

  console.log(email);
  console.log(numero);
  console.log(password);

  const handlePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) {
      alert("Veuillez remplir correctement tous les critères du mot de passe");
    }

    let adminInscription = {
      Email: email,
      Numero: numero,
      Mot_de_Passe: password,
    };

    try {
      axios
        .post(`http://localhost:2003/api/v.01/admin`, adminInscription)
        .then((response) => {
          if (response) {
            const { Email, Numero, AdminID } = response.data;
            useUserStore.getState().setUserInfo(Email, Numero, AdminID);
            router.push("/verification");
          }
        })
        .catch((err) => console.error(err));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      className=" flex justify-center items-center object-cover h-screen bg-cover bg-center "
      style={{ backgroundImage: "url('/test.svg')" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="w-[320px] rounded-xl">
          <CardContent className="  p-6">
            <div className=" flex items-center justify-center">
              <Image src="/login.svg" width={120} height={120} alt="logo" />
            </div>
            <form className=" space-y-4" onSubmit={handlePassword}>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mails className="h-[1.4rem] w-[1.4rem] " />
                </span>
                <Input
                  placeholder="exemple@exemple.com"
                  type="email"
                  className="w-full pl-[2.80rem] h-[2.7rem]"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 gap-1 flex items-center pointer-events-none">
                  <Image src="/civ.png" width={20} height={20} alt="" />
                  <h1>+225</h1>
                </span>
                <Input
                  placeholder="Numéro de téléphone"
                  type="text"
                  className="w-full pl-[4.9rem] h-[2.7rem]"
                  required
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
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
                  className="absolute z-[999999] right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              <PasswordStrenth
                password={password}
                onValidationChange={handlePasswordValidation}
              />
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  disabled={!isValid}
                  className=" h-[2.5rem] w-full bg-[#08162a]"
                >
                  Appuyer
                </Button>
              </motion.div>
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
      </motion.div>
    </div>
  );
}
