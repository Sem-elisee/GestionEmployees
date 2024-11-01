"use client";
import axios from "axios";
import { CalendarClock } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CountUp from "react-countup";
import { data } from "@/constants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import CourbeEvolution from "@/components/CourbeEvolution";
import AnalysTableau from "@/components/AnalysTableau";
import { Radars } from "@/components/Radars";
import PieChar from "@/components/PieChar";

const Page = () => {
  const [click, setClick] = useState("Tableau de Bord");
  const [reduct, setReduct] = useState(true);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [employeeCount, setEmployeeCount] = useState<number>(0);
  const [employeTechMoyen, setEmployeTechMoyen] = useState<number>(0);
  const [employeTechMoyenSup, setEmployeTechMoyenSup] = useState<number>(0);
  const [employeTechSup, setEmployeTechSup] = useState<number>(0);
  // count tous les employe

  useEffect(() => {
    const fetchEmployeeCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2003/api/v.01/employe/count"
        );
        // console.log("API Response:", response.data);
        if (Array.isArray(response.data) && response.data.length > 0) {
          setEmployeeCount(response.data[0].count);
        } else {
          setEmployeeCount(response.data.count);
        }
      } catch (error) {
        console.error("Error fetching employee count:", error);
      }
    };

    fetchEmployeeCount();
  }, []);

  // count tous les tectMoyen
  useEffect(() => {
    const CountTechMoyen = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2003/api/v.01/employe/countTechMoyen`
        );
        console.log("API Response:", response.data);
        if (Array.isArray(response.data) && response.data.length > 0) {
          setEmployeTechMoyen(response.data[0].count);
        } else {
          setEmployeTechMoyen(response.data.count);
        }
      } catch (err) {
        console.error(err, "erreur");
      }
    };
    CountTechMoyen();
  }, []);

  // count tous les techSup
  useEffect(() => {
    const CountTechSup = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2003/api/v.01/employe/countTechSup`
        );
        console.log("API Response:", response.data);
        if (Array.isArray(response.data) && response.data.length > 0) {
          setEmployeTechSup(response.data[0].count);
        } else {
          setEmployeTechSup(response.data.count);
        }
      } catch (err) {
        console.error(err, "erreur");
      }
    };
    CountTechSup();
  }, []);

  // count tous les techMoyenSup
  useEffect(() => {
    const CountTechMoyenSup = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2003/api/v.01/employe/countTechMoyenSup`
        );
        if (Array.isArray(response.data) && response.data.length > 0) {
          setEmployeTechMoyenSup(response.data[0].count);
        } else {
          setEmployeTechMoyenSup(response.data.count);
        }
      } catch (err) {
        console.error(err, "erreur");
      }
    };

    CountTechMoyenSup();
  }, []);

  const [dateTime, setDateTime] = useState({
    date: "",
    time: "",
  });

  const router = useRouter();

  // useEffect(() => {
  //   const token = localStorage.getItem("authToken");
  //   if (!token) {
  //     router.push("/");
  //   }
  // }, [router]);

  useEffect(() => {
    const formatDateTime = () => {
      const now = new Date();
      const date = now.toLocaleDateString("fr-FR");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const time = `${hours}:${minutes}:${seconds}`;
      setDateTime({ date, time });
    };
    const intervalId = setInterval(formatDateTime, 1000);
    formatDateTime();
    return () => clearInterval(intervalId);
  }, []);

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
                        className="flex items-center gap-2 cursor-pointer"
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
            className=" overflow-x-hidden p-5  bg-cover bg-center"
            style={{ backgroundImage: "url('/blob-scene-haikei (2).svg')" }}
          >
            <div className=" flex justify-between ">
              <h1 className="font-bold text-2xl">Tableau de Bord</h1>
              <div className="flex justify-center bg-white shadow items-center rounded-full border-[1.3px] border-gray-300 px-3 gap-2 ">
                <p>{dateTime.date}</p> -<p>{dateTime.time}</p>
                <CalendarClock className="w-4 h-5" />
              </div>
            </div>
            <main className="py-5">
              <div className="flex gap-3">
                <div className="flex gap-3">
                  <div className="w-[17.7rem] h-[5.5rem] z-50 bg-white rounded-md border-[1.3px] shadow   overflow-hidden ">
                    <div className="px-3 py-[0.6rem]">
                      <div className=" flex items-center gap-5">
                        <div className="relative w-[4rem] h-[4rem] bg-[#7077df45] rounded-lg">
                          <div className="relative text-2xl top-[0.83rem] font-bold text-center">
                            <CountUp
                              start={0}
                              end={employeeCount}
                              duration={1.5}
                              separator=","
                            />
                          </div>
                        </div>
                        <h2 className=" font-serif">Total Employés</h2>
                      </div>
                    </div>
                  </div>
                  <div className="w-[17.7rem] rounded-md h-[5.5rem] z-50 bg-white shadow border-[1.3px]">
                    <div className="px-3 py-[0.7rem]">
                      <div className=" flex items-center gap-3">
                        <div className="relative w-[4rem] h-[4rem] bg-[#cfd14279] rounded-md">
                          <div className="relative  text-2xl top-[0.83rem] font-bold text-center">
                            <CountUp
                              start={0}
                              end={employeTechMoyenSup}
                              duration={1.5}
                              separator=","
                            />
                          </div>
                        </div>
                        <div>
                          <h1 className=" font-serif">Employés</h1>
                          <h2 className=" font-serif">Tech-Moyen-Superieur</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-[17.7rem] rounded-md h-[5.5rem] z-50 bg-white shadow border-[1.3px]">
                    <div className="px-3 py-[0.6rem]">
                      <div className=" flex items-center gap-3">
                        <div className="relative w-[4rem] h-[4rem] bg-[#df7d705b] rounded-md">
                          <div className="relative text-2xl top-[0.83rem] font-bold text-center">
                            <CountUp
                              start={0}
                              end={employeTechSup}
                              duration={1.5}
                              separator=","
                            />
                          </div>
                        </div>
                        <div>
                          <h1 className=" font-serif">Employés</h1>
                          <h2 className=" font-serif">Tech-superieur</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-[17.7rem] rounded-md h-[5.5rem] z-50 bg-white shadow border-[1.5px]">
                    <div className="px-3 py-[0.6rem]">
                      <div className=" flex items-center gap-5">
                        <div className="relative w-[4rem] h-[4rem] bg-[#70df8456] rounded-md">
                          <div className="relative  text-2xl top-[0.83rem] font-bold text-center">
                            <CountUp
                              start={0}
                              end={employeTechMoyen}
                              duration={1.5}
                              separator=","
                            />
                          </div>
                        </div>
                        <div>
                          <h1 className=" font-serif">Employés</h1>
                          <h2 className=" font-serif">Tech-moyen</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>

            <div className="py-0 flex gap-3">
              <div>
                <Radars />
              </div>
              <AnalysTableau />
            </div>
            <div className="flex py-3 justify-between ">
              <CourbeEvolution />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Page;
