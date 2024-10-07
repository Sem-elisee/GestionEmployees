"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

const pageRef = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Page />
    </QueryClientProvider>
  );
};

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import axios from "axios";

import {
  ShoppingCart,
  LayoutDashboard,
  UsersRound,
  Plus,
  BadgePlus,
  ChevronRight,
} from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  // DialogDescription,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { data } from "@/constants";
import Link from "next/link";

import Image from "next/image";
import { employe, columns } from "./columns";
import { DataTable } from "./data-table";
import { RefectchContex } from "@/provider";
import { log } from "console";
import { any } from "zod";

// la 1
async function getEmploye(): Promise<employe[]> {
  const res = await fetch("http://localhost:2003/api/v.01/employe");
  const data = await res.json();
  return data;
}

const Page = () => {
  const [click, setClick] = useState("Employé");
  const [reduct, setReduct] = useState(true);

  // const [selectedImage, setSelectedImage] = useState(
  //   "/Image upload-bro (1).svg"
  // );
  // const [imageName, setImageName] = useState("");

  const [selectedImage, setSelectedImage] = useState(
    "/Image upload-bro (1).svg"
  );
  const [imageFile, setImageFile] = useState<File | null>(null); // Store the actual file
  const [imageName, setImageName] = useState("");

  // const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  // const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // const [data, setData] = useState<User[]>([]);

  // la 3
  const { error, mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) => {
      return axios.post(`http://localhost:2003/api/v.01/employe`, formData);
    },
  });

  // la 2
  const dataMap = useQuery({ queryKey: ["employe"], queryFn: getEmploye });

  interface Form {
    nom: string;
    salaire: string;
  }

  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const [formDatas, setFormData] = useState<Form>({
    nom: "",
    salaire: "",
  });
  const [direction, setDirection] = useState("");
  const [fonction, setFonction] = useState("");

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files ? event.target.files[0] : null;
  //   if (file) {
  //     setImageName(file.name);
  //     setSelectedImage(URL.createObjectURL(file));
  //   }
  // };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setImageName(file.name);
      setSelectedImage(URL.createObjectURL(file));
      setImageFile(file); // Save the file for form submission
    }
  };

  const handleClick = () => {
    setReduct(!reduct);
  };

  // mutate(data, {
  //   onSuccess: (response) => {
  //     console.log("Succès :", response);
  //     // e.target; // Réinitialise le formulaire après succès
  //     dataMap.refetch(); // Rafraîchit les données
  //   },
  //   onError: (err) => {
  //     console.error("Erreur :", err);
  //   },
  // });

  const mutation = useMutation({
    mutationFn: (value: any) =>
      axios.post("http://localhost:2003/api/v.01/employe", value),
    onSuccess: () => {
      dataMap.refetch();
      setFormData({
        nom: "",
        salaire: "",
      });
      setDirection("");
      setFonction("");
      setImageFile(null);
      setSelectedImage("/Image upload-bro (1).svg");
    },
    onError: (err) => {
      console.error("Erreur :", err);
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Nom", formDatas.nom);
    formData.append("Salaire", formDatas.salaire);
    const formattedDate = date ? date.toISOString().split("T")[0] : "";
    formData.append("Date_Embauche", formattedDate);
    formData.append("Direction", direction);
    formData.append("Fonction", fonction);

    if (imageFile) {
      formData.append("Image", imageFile);
    }
    // const data = {
    //   Nom: formData.nom,
    //   Salaire: formData.salaire,
    //   Date_Embauche: date,
    //   Direction: direction,
    //   Fonction: fonction,
    //   Image: selectedImage,
    // };

    mutation.mutate(formData);
    // mutation.mutate(data);
    e.currentTarget.reset();

    console.log(data);
  };

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
            className=" overflow-x-hidden  px-8 p-8 bg-cover bg-center"
            style={{ backgroundImage: "url('/blob-scene-haikei (2).svg')" }}
          >
            <h1 className="font-bold text-2xl">Employés</h1>
            <div className="">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="flex justify-end">
                    <div className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-sm bg-[#08162a] text-white">
                      {/* z-50  flex  */}
                      <BadgePlus className=" w-[18px] h-[21px]" />
                      <h3>Ajoutez</h3>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[805px] px-10">
                  <DialogHeader>
                    <DialogTitle>Employé</DialogTitle>
                  </DialogHeader>
                  <div>
                    <form action="" onSubmit={onSubmit} className="flex gap-10">
                      <main className="">
                        <div className="w-[230px] h-[340px] rounded-sm border-dashed border-[1.33px] border-black">
                          {selectedImage && (
                            <div className="flex-col py-4">
                              <Image
                                src={selectedImage}
                                alt="Selected"
                                width={150}
                                height={150}
                                className="object-cover w-[210px] bg-center relative left-[9px] top-[-7px] bg-cover rounded-sm h-[270px]"
                              />
                              {/* <p className="mt-2">{imageName}</p> */}
                            </div>
                          )}
                          <div>
                            <Input
                              type="file"
                              className="w-[13rem]  relative top-[-15px] left-[10px]"
                              onChange={handleFileChange}
                              name="Image"
                              required
                            />
                          </div>
                        </div>
                      </main>
                      <main className=" flex-col">
                        <div className="flex gap-6">
                          <Input
                            type="text"
                            className="w-[13rem] h-[2.8rem]"
                            placeholder="Nom"
                            name="nom"
                            value={formDatas.nom}
                            onChange={handleInputChange}
                          />
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[210px] h-[2.8rem] justify-start text-left font-normal",
                                  !date && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? (
                                  format(date, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                required
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="my-7 flex gap-6">
                          <Input
                            type="number"
                            className="w-[13rem] h-[2.8rem]"
                            placeholder="Salaire"
                            name="salaire"
                            required
                            value={formDatas.salaire}
                            onChange={handleInputChange}
                          />

                          <Select
                            value={direction}
                            onValueChange={setDirection}
                            required
                          >
                            <SelectTrigger className="w-[13rem] h-[45px]">
                              <SelectValue placeholder="Direction" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="DRB-09 (Abobo)">
                                  DRB-09 (Abobo)
                                </SelectItem>
                                <SelectItem value="DRB-08 (Port bouet)">
                                  DRB-08 (Port bouet)
                                </SelectItem>
                                <SelectItem value="DRB-07 (Cocody)">
                                  DRB-07 (Cocody)
                                </SelectItem>
                                <SelectItem value="DRB-03 (Yopougon)">
                                  DRB-03 (Yopougon)
                                </SelectItem>
                                <SelectItem value="DRB-05 (Koumassi)">
                                  DRB-05 (Koumassi)
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="my-7 flex gap-6">
                          <Select
                            value={fonction}
                            required
                            onValueChange={setFonction}
                          >
                            <SelectTrigger className="w-[13rem] h-[45px]">
                              <SelectValue placeholder="Fonction" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="Tech-moyen">
                                  Tech-moyen
                                </SelectItem>
                                <SelectItem value="Tech-moyen-superieur">
                                  Tech-moyen-superieur
                                </SelectItem>
                                <SelectItem value="Tech-superieur">
                                  Tech-superieur
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>

                          <Button className="w-[12.9rem] h-[44px] bg-[#08162a] ">
                            Valider
                          </Button>
                        </div>
                      </main>
                    </form>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="py-[-]">
              {dataMap.isLoading ? (
                <div className="flex flex-col gap-3 justify-center items-center w-full h-full relative top-28">
                  Loading...
                  <Image src="/tail-spin.svg" width={25} height={25} alt="" />
                </div>
              ) : (
                <div>
                  <RefectchContex.Provider value={dataMap.refetch}>
                    <DataTable
                      columns={columns}
                      data={dataMap.data ? dataMap.data : []}
                    />
                  </RefectchContex.Provider>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
export default pageRef;
