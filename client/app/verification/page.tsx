"use client";
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

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const Page = () => {
  const [value, setValue] = React.useState("");

  //   const handleChange = (index: any, value: any) => {
  //     const newCode = [...code];
  //     newCode[index] = value;
  //     setCode(newCode);
  //   };

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
              <div className="text-center text-sm">
                {value === "" ? (
                  <>Enter your one-time password.</>
                ) : (
                  <>Code: {value}</>
                )}
              </div>
            </div>
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
