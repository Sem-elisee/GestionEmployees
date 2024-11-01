"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRefetch } from "@/provider";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type employe = {
  EmployeID: number;
  Image: string;
  Nom: string;
  Date_Embauche: string;
  Salaire: number;
  Direction: string;
  Fonction: string;
};

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";

export const columns: ColumnDef<employe>[] = [
  {
    accessorKey: "EmployeID",
    header: "EmployeID",
  },
  {
    accessorKey: "Image",
    header: "Image",
    cell: ({ row }) => (
      <Image
        src={`http://localhost:2003/public/uploads/${row.original.Image}`}
        alt=""
        width={50}
        height={50}
      />
    ),
  },
  {
    accessorKey: "Nom",
    header: "Nom",
  },
  {
    accessorKey: "Date_Embauche",
    cell: ({ row }) => {
      const item = row.original;
      console.log();

      return <div>{item.Date_Embauche && item.Date_Embauche.slice(0, 10)}</div>;
    },
  },
  {
    accessorKey: "Salaire",
    header: "Salaire",
    cell: ({ row }) => {
      return (
        <div className=" flex items-center text-center">
          {row.getValue("Salaire")}{" "}
          <Image
            src="/FCFA.png"
            alt=""
            width={20}
            height={20}
            className=" w-4 h-5"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "Direction",
    header: "Direction",
  },
  {
    accessorKey: "Fonction",
    header: "Fonction",
    cell: ({ row }) => {
      return (
        <div
          className={cn("font-medium text-center  px-4 py-2 rounded-lg", {
            "bg-red-300": row.getValue("Fonction") === "Tech-superieur",
            "bg-orange-300":
              row.getValue("Fonction") === "Tech-moyen-superieur",
            "bg-green-300": row.getValue("Fonction") === "Tech-moyen",
          })}
        >
          {row.getValue("Fonction")}
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",

    id: "actions",
    cell: ({ row }) => {
      const CellActions = () => {
        const employe = row.original;
        const refetch = useRefetch(); // Hook called at the top level of a functional component

        const [selectedImage, setSelectedImage] = useState<File | null>(null);
        const [nom, setNom] = useState<string>(employe.Nom || "");
        const [date, setDate] = useState<Date | undefined>(
          new Date(employe.Date_Embauche)
        );
        const [salaire, setSalaire] = useState<number>(employe.Salaire || 0);
        const [direction, setDirection] = useState<string>(
          employe.Direction || ""
        );
        const [fonction, setFonction] = useState<string>(
          employe.Fonction || ""
        );

        const handleFileChange = (
          event: React.ChangeEvent<HTMLInputElement>
        ) => {
          const file = event.target.files ? event.target.files[0] : null;
          if (file) {
            setSelectedImage(file);
          }
        };

        const handleDelete = async () => {
          try {
            const response = await axios.delete(
              `http://localhost:2003/api/v.01/employe/${employe.EmployeID}`
            );
            if (response) {
              refetch();
            }
          } catch (e) {
            console.log(e);
          }
        };
        const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          const formData = new FormData();
          formData.append("Nom", nom);
          formData.append("Date_Embauche", date?.toISOString() || "");
          formData.append("Salaire", salaire.toString());
          formData.append("Direction", direction);
          formData.append("Fonction", fonction);
          if (selectedImage) {
            formData.append("Image", selectedImage);
          }

          try {
            const response = await axios.put(
              `http://localhost:2003/api/v.01/employe/${employe.EmployeID}`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data", // Assurez-vous d'indiquer que vous envoyez des données de formulaire
                },
              }
            );
            if (response) {
              refetch();
            }
          } catch (error) {
            console.error(error);
          }
        };
        return (
          <DropdownMenu>
            <div className=" flex items-center justify-center gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Image
                    src="/stylo.png"
                    width={20}
                    height={20}
                    alt="stylo"
                    className=" cursor-pointer"
                  />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[805px] px-10">
                  <DialogHeader>
                    <DialogTitle>Employé</DialogTitle>
                  </DialogHeader>
                  <div>
                    <form
                      action=""
                      onSubmit={handleSubmit}
                      className="flex gap-10"
                    >
                      <main className="">
                        <div className="w-[230px] h-[340px] rounded-sm border-dashed border-[1.33px] border-black">
                          {selectedImage ? (
                            <div className="flex-col py-4">
                              <Image
                                src={URL.createObjectURL(selectedImage)}
                                alt="Selected"
                                width={150}
                                height={150}
                                className="object-cover w-[210px] bg-center relative left-[9px] top-[-7px] bg-cover rounded-sm h-[270px]"
                              />
                            </div>
                          ) : (
                            <div className="flex-col py-4">
                              <Image
                                src={`http://localhost:2003/public/uploads/${employe.Image}`}
                                alt="Selected"
                                width={150}
                                height={150}
                                className="object-cover w-[210px] bg-center relative left-[9px] top-[-7px] bg-cover rounded-sm h-[270px]"
                              />
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
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
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
                            value={salaire}
                            onChange={(e) =>
                              setSalaire(parseFloat(e.target.value))
                            }
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

              <div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Image
                      src="/poubelle1.png"
                      width={20}
                      height={20}
                      alt="poubelle"
                      className=" cursor-pointer"
                    />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        En êtes-vous absolument sûr ?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        {/* This action cannot be undone. This will permanently delete */}
                        {/* your account and remove your data from our servers. */}
                        Cette action ne peut pas être annulée. Cela supprimera
                        définitivement vos données de nos serveurs.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        className=" bg-red-700 text-white"
                      >
                        Continuer
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </DropdownMenu>
        );
      };
      return <CellActions />;
    },
  },
];
