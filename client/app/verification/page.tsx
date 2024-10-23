"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { toast, Toaster } from "sonner";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
// import { Input } from "@/components/ui/input";

const Page = () => {
  const [otpValue, setOtpValue] = useState(Array(6).fill(""));
  const [isLoading, setisLoading] = useState(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]); // Références pour chaque input
  const router = useRouter();

  // Fonction pour réinitialiser l'OTP
  const resetOtp = () => {
    setOtpValue(Array(6).fill("")); // Réinitialise les inputs
    inputRefs.current[0]?.focus(); // Remet le focus sur le premier champ
  };

  const handleOtpChange = (index: number, value: string) => {
    if (/^[0-9]$/.test(value)) {
      // S'assure que seule une entrée numérique est acceptée
      const newOtpValue = [...otpValue];
      newOtpValue[index] = value;
      setOtpValue(newOtpValue);

      // Bascule vers l'input suivant si le chiffre est entré
      if (value !== "" && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && otpValue[index] === "" && index > 0) {
      // Basculer vers l'input précédent en cas de suppression
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisLoading(true);
    const codeConfirm = {
      code: otpValue.join(""),
    };
    try {
      const response = await axios.post(
        `http://localhost:2003/api/v.01/admin/verification`,
        codeConfirm
      );
      if (response) {
        toast.success("Bienvenue, administrateur !");
        const token = response.data.token;
        if (token) {
          localStorage.setItem("authToken", token);
          router.push("/tableaudebord");
        }
      }
      resetOtp(); // Réinitialise les inputs après succès
    } catch (err) {
      console.error("Erreur", err);
      toast.error("La vérification a échoué.");
      resetOtp(); // Réinitialise les inputs après erreur
    } finally {
      setisLoading(false);
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/verif.jpg')" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="w-[330px] rounded bg-[#f3f3f3]">
          <CardContent className="p-2">
            <div className="flex items-center justify-center">
              <Image
                src="/Confirmed-pana.svg"
                width={180}
                height={150}
                alt=""
              />
            </div>
            <h1 className="text-center text-2xl font-bold">
              Vérification du Mail
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="flex items-center space-y-4 justify-center">
                <div className="flex gap-2 py-1">
                  {otpValue.map((value, index) => (
                    <input
                      key={index}
                      id={`otp-slot-${index}`}
                      ref={(el) => {
                        inputRefs.current[index] = el; // Assigner la référence sans retour
                      }}
                      value={value}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-10 h-10 text-center text-xl border shadow border-gray-300 rounded-xl"
                      inputMode="numeric"
                      maxLength={1}
                      autoFocus={index === 0} // Auto-focus sur le premier champ
                    />
                  ))}
                </div>
              </div>

              <motion.div
                className="flex justify-center mt-3 items-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  disabled={isLoading}
                  className="w-[17.5rem] py-5 hover:scale-1 transition duration-200"
                  type="submit"
                >
                  {isLoading ? (
                    <div>
                      <Loader
                        className="animate-spin mx-auto text-white"
                        size={24}
                      />
                    </div>
                  ) : (
                    "Vérifier Email"
                  )}
                </Button>
              </motion.div>
              <div className="text-center font-medium text-sm py-4">
                {otpValue.join("") === "" ? (
                  <>Entrez votre mot de passe à usage unique.</>
                ) : (
                  <>Code: {otpValue.join("")}</>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Page;
