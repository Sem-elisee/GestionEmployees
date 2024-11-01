"use client";
import React, { useState, useEffect } from "react";
import { TbLogout2 } from "react-icons/tb";
import { useUserStore } from "@/store/Store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { LuFolderEdit } from "react-icons/lu";

const Page = () => {
  const [click, setClick] = useState("Paramètre");
  const [reduct, setReduct] = useState(true);
  const [nouveauNum, setNouveauNum] = useState<string>("");

  const Email = useUserStore((state) => state.Email);
  const Numero = useUserStore((state) => state.Numero);

  useEffect(() => {
    setNouveauNum(Numero || "");
  }, [Numero]);

  const handleClick = () => {
    setReduct(!reduct);
  };

  const router = useRouter();

  const Deconnecte = async () => {
    try {
      await axios.post(`http://localhost:2003/api/v.01/logout`);
      localStorage.removeItem("authToken");
      useUserStore.getState().Deconnecte();
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    const AdminID = useUserStore.getState().AdminID;
    // console.log(AdminID);

    // e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:2003/api/v.01/admin/${AdminID}`,
        {
          Numero: nouveauNum,
        }
      );
      useUserStore.getState().setUserInfo(Email, nouveauNum, AdminID);
      console.log(response.data);
      router.push("/parametre");
    } catch (err) {
      console.error(err, "Erreur");
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
            <main className="relative top-5 ">
              <Card className="w-full rounded-md">
                <CardHeader>
                  <CardTitle>Informations générales</CardTitle>
                  <CardDescription>
                    Voici vos informations personnelles et des options pour les
                    gérer.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border" />
                  <div className="p-4 flex items-center justify-between">
                    <h1 className="font-semibold">Photo de profil</h1>
                    <div>
                      <Image
                        src="/Profile2.png"
                        width={70}
                        height={70}
                        alt=""
                        className=" rounded-md"
                      />
                    </div>
                  </div>
                  <div className="border" />

                  <div className="p-4 flex gap-[22rem]">
                    <h1 className=" font-semibold">Adresse e-mail</h1>
                    <h1>{Email}</h1>
                  </div>
                  <div className="border" />
                  <div className="p-4 flex justify-between">
                    <h1 className=" font-semibold">téléphone</h1>
                    <div className="flex gap-2 items-center">
                      <Image src="/civ.png" width={20} height={20} alt="" />
                      <h1>{Numero}</h1>
                    </div>
                    <div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <div>
                            <div className=" flex items-center underline gap-2 cursor-pointer">
                              <h1>Modifier</h1>
                              <LuFolderEdit className="w-5 h-5" />
                            </div>
                          </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[340px]">
                          <DialogHeader>
                            <DialogTitle>Modifier Numéro</DialogTitle>
                          </DialogHeader>
                          <DialogDescription>
                            Vous avez la possibilite de Modifier votre Numéro
                            téléphone
                          </DialogDescription>
                          <div className=" flex justify-center">
                            <Image
                              src="/telephone.png"
                              width={70}
                              height={70}
                              alt=""
                              className=" rounded-md"
                            />
                          </div>
                          <div>
                            <form onSubmit={handleSubmit}>
                              {/*  handleSubmit */}
                              <div className="grid w-full items-center gap-4">
                                <div className="relative">
                                  <span className="absolute inset-y-0 left-0 pl-3 gap-1 flex items-center pointer-events-none">
                                    <Image
                                      src="/civ.png"
                                      width={20}
                                      height={20}
                                      alt=""
                                    />
                                    <h1>+225</h1>
                                  </span>
                                  <Input
                                    placeholder="Numéro de téléphone"
                                    type="text"
                                    className="w-full pl-[4.8rem] h-[2.7rem]"
                                    required
                                    value={nouveauNum}
                                    onChange={(e) =>
                                      setNouveauNum(e.target.value)
                                    }
                                  />
                                </div>
                                <Button
                                  type="submit"
                                  className=" w-full h-[2.6rem]"
                                >
                                  Modifier
                                </Button>
                              </div>
                            </form>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </main>
          </section>
        </div>
      </div>
    </div>
  );
};
export default Page;
