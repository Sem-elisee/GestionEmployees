"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useRouter } from "next/navigation";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import axios from "axios";

const Page = () => {
  const [otpValue, setOtpValue] = useState("");

  const router = useRouter();

  // useEffect(() => {
  //   const token = localStorage.getItem("authToken");
  //   if (!token) {
  //     router.push("/");
  //   }
  // }, [router]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let codeConfirm = {
      code: otpValue,
    };
    try {
      await axios
        .post(`http://localhost:2003/api/v.01/admin/verification`, codeConfirm)
        .then((response) => {
          if (response) {
            const token = response.data.token;
            if (token) {
              localStorage.setItem("authToken", token);
              router.push("/tableaudebord");
            }
          }
        });
    } catch (err) {
      console.error("Erreur", err);
    }
    console.log("OTP Value:", otpValue);
  };

  return (
    <div
      className=" flex justify-center items-center h-screen bg-cover bg-center "
      style={{ backgroundImage: "url('/blob-scene-haikei 11.svg')" }}
    >
      <div>
        <Card className="w-[420px] rounded-lg">
          <CardContent className="p-8">
            <h1 className=" text-center text-2xl font-medium">
              Vérification du Mail
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="flex items-center space-y-8 justify-center">
                <InputOTP
                  maxLength={6}
                  value={otpValue}
                  onChange={(value) => {
                    console.log("OTP Changed:", value);
                    setOtpValue(value);
                  }}
                  className="flex justify-center items-center"
                >
                  <InputOTPGroup className="flex gap-2">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className="flex justify-center items-center mt-4">
                <Button className="px-[6.7rem] py-5" type="submit">
                  Vérifier Email
                </Button>
              </div>
              <div className="text-center text-sm py-4">
                {otpValue === "" ? (
                  <>Entrez votre mot de passe à usage unique.</>
                ) : (
                  <>Code: {otpValue}</>
                )}
              </div>
            </form>
            {/* <form onSubmit={handleSubmit}>
              <div className="space-y-4 ">
                <div className=" flex items-center space-y-8 justify-center">
                  <InputOTP
                    maxLength={6}
                    value={value}
                    onChange={(value) => setValue(value)}
                    className="flex justify-center items-center"
                  >
                    <InputOTPGroup className=" flex gap-2">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <div className="flex justify-center items-center">
                  <Button className="px-[6.7rem] py-5" type="submit">
                    Vérifier Email
                  </Button>
                </div>
                
            </form> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;

{
  /* <form onSubmit={handleSubmit}>
				<div className='flex justify-between'>
					{code.map((digit, index) => (
						<input
							key={index}
							ref={(el) => (inputRefs.current[index] = el)}
							type='text'
							maxLength='6'
							value={digit}
							onChange={(e) => handleChange(index, e.target.value)}
							onKeyDown={(e) => handleKeyDown(index, e)}
							className='w-12 h-12 text-center text-2xl font-bold ...'
						/>
					))}
				</div>
				<motion.button ... >
					{isLoading ? "Verifying..." : "Verify Email"}
				</motion.button>
			</form> */
}
