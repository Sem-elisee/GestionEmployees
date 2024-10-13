"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { Calendar } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { data } from "@/constants";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = () => {
  const [click, setClick] = useState("Tableau de Bord");
  const [reduct, setReduct] = useState(true);
  const [employeeCount, setEmployeeCount] = useState<number>(0);

  useEffect(() => {
    const fetchEmployeeCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2003/api/v.01/employe/count"
        );
        console.log("API Response:", response.data);
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

  const [dateTime, setDateTime] = useState({
    date: "",
    time: "",
  });

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/");
    }
  }, [router]);

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

  const [count, setCount] = useState(0);

  useEffect(() => {
    let startCount = 0;
    const interval = setInterval(() => {
      startCount += Math.ceil(employeeCount / 100);
      if (startCount >= employeeCount) {
        startCount = employeeCount;
        clearInterval(interval);
      }
      setCount(startCount);
    }, 30);

    return () => clearInterval(interval);
  }, [employeeCount]);

  return (
    <div>
      <div className="overflow-hidden">
        <div
          className={`grid w-full h-[100vh] grid-cols-[12rem_auto] duration-90 ${
            reduct && "grid-cols-[3.4rem_auto]  "
          }`}
        >
          <section className=" border-[1px] border-[#bbc6d3]">
            {/* <div
              className={`absolute left-[10.7rem] top-7 bg-[#d6dfece2] rounded-full p-2 cursor-pointer ${
                reduct && " absolute left-[2.5rem]"
              }`}
              onClick={handleClick}
            >
              <ChevronRight className="w-6 h-6" />
            </div> */}
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
            className=" overflow-x-hidden px-8 p-8 bg-cover bg-center"
            style={{ backgroundImage: "url('/blob-scene-haikei (3).svg')" }}
          >
            <div className=" flex justify-between ">
              <h1 className="font-bold text-2xl">Tableau de Bord</h1>
              <div className="flex justify-center bg-white shadow items-center rounded-full border-[1.3px] border-gray-300 px-3 gap-2 ">
                <p>{dateTime.date}</p> -<p>{dateTime.time}</p>
                <Calendar className="w-4 h-5" />
              </div>
            </div>
            <main className=" px-0 py-8">
              <div className=" flex items-center gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="w-[16rem] z-50 bg-white rounded-md border-[1.5px] shadow  h-[10rem] ">
                    {/* border-[1.5px] */}
                    <div className="p-6">
                      <span className=" ">
                        {/* fill-foreground relative top-3 flex-col text-3xl text-[#08162a] font-bold */}
                        {count.toLocaleString()}
                        employés
                      </span>
                      {/* <div className="flex items-center">
                        <div className=" flex flex-col">
                          <span className=" font-semibold text-[1.1rem]">
                            Total d'
                          </span>
                          <span className="text-[.9rem] text-[#aaa]">
                            Dernier temps
                          </span>
                          <span className=" fill-foreground relative top-3 flex-col text-3xl text-[#08162a] font-bold ">
                            {count.toLocaleString()}
                          </span>
                        </div>
                        <div className="relative bg-[#96d08d71] rounded-xl  p-2 left-6 ">
                          <MdOutlineBadge className="h-7 w-7 " />
                        </div>
                      </div> */}
                    </div>
                  </div>
                  <div className="w-[16rem] rounded-md h-[10rem] z-50 bg-white shadow border-[1.5px]"></div>
                  <div className="w-[16rem] rounded-md h-[10rem] z-50 bg-white shadow border-[1.5px]"></div>
                  <div className="w-[16rem] rounded-md h-[10rem] z-50 bg-white shadow border-[1.5px]"></div>
                </div>
                <div className=" w-[19rem] h-[21rem] rounded-md z-50 bg-white shadow border-[1.5px]"></div>
                <div className=" w-[19rem] h-[21rem] rounded-md z-50 bg-white shadow border-[1.5px]"></div>
              </div>
            </main>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Page;
{
}
