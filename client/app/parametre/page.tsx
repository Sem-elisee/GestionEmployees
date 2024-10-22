"use client";
import React, { useState } from "react";
import { TbLogout2 } from "react-icons/tb";
import { useUserStore } from "@/store/Store";
import { Pencil } from "lucide-react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { data } from "@/constants";
import Link from "next/link";
import axios from "axios";

const Page = () => {
  const [click, setClick] = useState("Paramètre");
  const [reduct, setReduct] = useState(true);
  const [adminInfo, setAdminInfo] = useState(null);

  const Email = useUserStore((state) => state.Email);
  const Numero = useUserStore((state) => state.Numero);

  const handleClick = () => {
    setReduct(!reduct);
  };

  const router = useRouter();

  const Deconnecte = async () => {
    try {
      await axios.post(`http://localhost:2003/api/v.01/logout`);
      localStorage.removeItem("authToken");

      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("authToken");
  //   if (!token) {
  //     router.push("/");
  //   }
  // }, [router]);

  return (
    <div>
      <div className="overflow-hidden">
        <div
          className={`grid w-full h-[100vh] grid-cols-[12rem_auto] duration-90 ${
            reduct && "grid-cols-[3.4rem_auto]  "
          }`}
        >
          <section className=" border-[1px] border-[#bbc6d3]">
            <div className="py-[8rem] px-2">
              <ul className="">
                {data.map((element) => (
                  <li key={element.id}>
                    <div
                      onClick={() => setClick(element.title)}
                      className={`my-2 px-3 py-[7px] rounded-md ${
                        click === element.title
                          ? "bg-[#08162a]"
                          : "hover:bg-[#d6dfec82]"
                      }`}
                    >
                      <Link
                        href={element.link}
                        className="flex items-center gap-2  cursor-pointer "
                      >
                        <TooltipProvider delayDuration={0}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <h3
                                className={`${
                                  click === element.title && "text-white"
                                }`}
                              >
                                {element.icon}
                              </h3>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{element.title}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <h3
                          className={`${
                            click === element.title && "text-white"
                          } ${reduct && " hidden"}`}
                        >
                          {element.title}
                        </h3>
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <section
            className="  overflow-x-hidden px-8 p-8 bg-center bg-cover"
            style={{ backgroundImage: "url('/blob-scene-haikei (1).svg')" }}
          >
            <div className=" flex justify-between">
              <h1 className=" font-semibold text-2xl">Paramètre</h1>
              <div className=" flex items-center justify-between">
                <button
                  onClick={Deconnecte}
                  className=" flex items-center  border-[1.5px] px-7 py-2 rounded-md shadow gap-2 border-[#AAAAC5]"
                >
                  <span className=" font-medium">Déconnecté</span>
                  <TbLogout2 className="w-6 h-6" />
                </button>
              </div>
            </div>
            <main className=" z-50 w-full h-full  border-dashed border-[1.4px] shadow border-black relative top-4 rounded-md">
              <div className="px-14 py-14">
                <h1 className=" text-2xl font-bold">Mon Profil</h1>

                <div className="py-8 flex items-center gap-10">
                  <Image
                    src="/Profile2.png"
                    width={250}
                    height={80}
                    alt=""
                    className=" rounded-md"
                  />

                  <div>
                    <div className=" space-y-4">
                      <div className=" flex flex-col">
                        <span className=" font-bold text-xl">Email:</span>
                        <span>{Email}</span>
                      </div>
                      <div className=" flex flex-col">
                        <span className="font-bold text-xl">Numero:</span>
                        <span>+ {Numero}</span>
                      </div>

                      <button className=" flex items-center gap-3 border-[1.5px] px-7 py-3 rounded-md border-[#000]">
                        <Pencil className="text-[#3a3a57]" />
                        <span className=" text-[#3a3a57] font-medium">
                          Edit Profile
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </section>
        </div>
      </div>
    </div>
  );
};
export default Page;
