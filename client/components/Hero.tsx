"use client";
import * as React from "react";
// import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

export default function Hero() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      console.log("current");
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="mx-8">
      <Carousel setApi={setApi}>
        {/* plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}    <div className="px-16 py-[5rem] ">
              <h1 className="text-6xl font-bold text-white">
                Explore the sights
              </h1>
              <h1 className="text-6xl font-bold relative top-4  text-white">
                Of the Azores
              </h1>
              <div className=" leading-10 relative top-8">
                <p className=" text-[#ffffff90]">
                  A place where nature and adventure unite
                </p>
                <div className="py-8">
                  <button className="font-semibold rounded-full px-12 py-1 bg-white text-black">
                    Book now
                  </button>
                </div>
              </div>
           
            </div>*/}
        <CarouselContent>
          <CarouselItem>
            <section
              className=" bg-center bg-cover h-[480px] rounded-xl"
              style={{
                backgroundImage: "url('/lighthouse (4).jpg') ",
              }}
            >
              <div className="min-[375px]:px-[4rem] min-[375px]:py-[3.5rem] min-[428px]:px-[4rem] min-[428px]:py-[3rem] ">
                <h1 className="min-[375px]:text-[1.5rem] text-white font-bold min-[428px]:text-[1.7rem] min-[540px]:text-[2.5rem] sm:text-[3.5rem] md:text-[4rem]">
                  Explore the sights
                </h1>
                <h1 className="min-[375px]:text-[1.5rem] text-white sm:text-[3.5rem] font-bold min-[428px]:text-[1.7rem] min-[540px]:text-[2.5rem] md:text-[4rem]">
                  Of the Azores
                </h1>
                <div className="min-[375px]:relative min-[375px]:top-7 min-[428px]:relative min-[428px]:top-9 ">
                  <p className="md:relative md:top-[-1.5rem] text-white">
                    A place where nature and adventure unite
                  </p>
                  <div className="min-[375px]:relative min-[375px]:top-7 md:relative md:top-[-.5rem]">
                    <button className="bg-white text-black px-12 py-[0.70rem] rounded-full hover:text-white hover:border-[1.5px] hover:border-[#fff]  hover:bg-transparent">
                      Book now
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </CarouselItem>
          <CarouselItem>
            <section
              className=" bg-center bg-cover h-[480px] rounded-xl"
              style={{
                backgroundImage: "url('/im1.jpg') ",
              }}
            >
              <div className="min-[375px]:px-[4rem] min-[375px]:py-[3.5rem] min-[428px]:px-[4rem] min-[428px]:py-[3rem] ">
                <h1 className="min-[375px]:text-[1.5rem] text-white font-bold min-[428px]:text-[1.7rem] min-[540px]:text-[2.5rem] sm:text-[3.5rem] md:text-[4rem]">
                  Explore the sights
                </h1>
                <h1 className="min-[375px]:text-[1.5rem] text-white sm:text-[3.5rem] font-bold min-[428px]:text-[1.7rem] min-[540px]:text-[2.5rem] md:text-[4rem]">
                  Of the Azores
                </h1>
                <div className="min-[375px]:relative min-[375px]:top-7 min-[428px]:relative min-[428px]:top-9 ">
                  <p className="md:relative md:top-[-1.5rem] text-white">
                    A place where nature and adventure unite
                  </p>
                  <div className="min-[375px]:relative min-[375px]:top-7 md:relative md:top-[-.5rem]">
                    <button className="bg-white text-black px-12 py-[0.70rem] rounded-full hover:text-white hover:border-[1.5px] hover:border-[#fff]  hover:bg-transparent">
                      Book now
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </CarouselItem>
          <CarouselItem>
            <section
              className=" bg-center bg-cover h-[480px] rounded-xl"
              style={{
                backgroundImage: "url('/img (2).jpg') ",
              }}
            >
              <div className="min-[375px]:px-[4rem] min-[375px]:py-[3.5rem] min-[428px]:px-[4rem] min-[428px]:py-[3rem] ">
                <h1 className="min-[375px]:text-[1.5rem] text-white font-bold min-[428px]:text-[1.7rem] min-[540px]:text-[2.5rem] sm:text-[3.5rem] md:text-[4rem]">
                  Explore the sights
                </h1>
                <h1 className="min-[375px]:text-[1.5rem] text-white sm:text-[3.5rem] font-bold min-[428px]:text-[1.7rem] min-[540px]:text-[2.5rem] md:text-[4rem]">
                  Of the Azores
                </h1>
                <div className="min-[375px]:relative min-[375px]:top-7 min-[428px]:relative min-[428px]:top-9 ">
                  <p className="md:relative md:top-[-1.5rem] text-white">
                    A place where nature and adventure unite
                  </p>
                  <div className="min-[375px]:relative min-[375px]:top-7 md:relative md:top-[-.5rem]">
                    <button className="bg-white text-black px-12 py-[0.70rem] rounded-full hover:text-white hover:border-[1.5px] hover:border-[#fff]  hover:bg-transparent">
                      Book now
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
