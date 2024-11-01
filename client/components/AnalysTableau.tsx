import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FiDollarSign } from "react-icons/fi";
import { BiGroup } from "react-icons/bi";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface employe {
  EmployeID: number;
  Nom: string;
  Date_Embauche: Date;
  Salaire: number;
}
export default function AnalysTableau() {
  const [recentEmploye, setrecentEmploye] = useState<employe[]>([]);
  useEffect(() => {
    axios
      .get(`http://localhost:2003/api/v.01/employe/employeRecent`)
      .then((response) => {
        setrecentEmploye(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err, "Il y'a une erreur");
      });
  }, []);

  return (
    <div className="col-span-12 p-4 shadow w-full rounded border border-stone-300 bg-white ">
      <div className=" flex items-center justify-between">
        <h3 className="flex text-[#08162a] items-center text-xl font-bold gap-1.5">
          Recente Embauche
          {/* <BiGroup size={27} className="text-[#08162a]" /> */}
        </h3>
        <Link href="/employe">
          <h1 className="text-md text-violet-500 font-medium underline">
            Voir plus
          </h1>
        </Link>
      </div>
      <Table>
        <TableCaption> Une liste de vos récentes embauches</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>EmployeID</TableHead>
            <TableHead>Nom</TableHead>
            <TableHead>Date_Embauche</TableHead>
            <TableHead>Salaire</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentEmploye.map((invoice) => (
            <TableRow key={invoice.EmployeID} className="even:bg-stone-100">
              <TableCell className="font-medium">{invoice.EmployeID}</TableCell>
              <TableCell>{invoice.Nom}</TableCell>
              <TableCell>
                {new Date(invoice.Date_Embauche).toLocaleDateString()}
              </TableCell>
              <TableCell className="flex items-center">
                {invoice.Salaire}
                <Image
                  src="/FCFA.png"
                  width={15}
                  height={15}
                  alt="stylo"
                  className=" cursor-pointer"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
      </Table>
      {/* <table className="w-full table-auto border">
        <thead className="">
          <tr className="text-sm font-normal text-stone-500">
            <th className="text-start p-1.5">EmployeID</th>
            <th className="text-start p-1.5">Nom</th>
            <th className="text-start p-1.5">Date_Embauche</th>
            <th className="text-start p-1.5">Salaire</th>
          </tr>
        </thead>
        <tbody>
          {recentEmploye.map((employe) => (
            <tr
              key={employe.EmployeID}
              className=" text-md border even:bg-stone-100"
            >
              <td className="p-1.5">
                <p className="flex text-center items-center gap-1">
                  {employe.EmployeID}
                </p>
              </td>
              <td className="p-1.5 ">{employe.Nom}</td>
              <td className="p-1.5">
                {new Date(employe.Date_Embauche).toLocaleDateString()}
              </td>
              <td className="p-1.5 flex items-center">
                {employe.Salaire}
                <Image
                  src="/FCFA.png"
                  width={18}
                  height={18}
                  alt="stylo"
                  className=" cursor-pointer"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
}
