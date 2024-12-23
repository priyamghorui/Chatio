"use client";

import { Card, Button, Alert } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Welcomepage() {
  const router = useRouter();
  const [alart, setalart] = useState({
    show: "hidden",
    massage: "",
  });
  return (
    <>
      <div
        className="max-w-lg border-0 shadow text-white mt-44 flex flex-col"
        style={{
          alignItems: "center",
          background: "#06050870",
          border: "1px solid #0e0e0e",
          borderRadius: "12px",
        }}
        renderImage={() => (
          <Image
            className="lg:hidden"
            width={500}
            height={500}
            src="/images/depositphotos_325254196-stock-photo-women-hand-using-smartphone-typing.jpg"
            alt="image 1"
          />
        )}
      >
        <h5 className="text-2xl font-bold tracking-tight  dark:text-white text-center">
          Welcome to Chatio
        </h5>
        <p className="font-normal dark:text-gray-400 text-center">
          <span>Your go-to place for seamless, real-time conversations.</span>
          Whether it's staying connected with friends, sharing moments, or
          meeting new people, Chatio is designed to make communication
          effortless.
        </p>

        <div className="flex flex-col w-48 mt-3">
          <Link href={"/singin"} className="flex flex-col w-48">
            <Button
              gradientMonochrome="info"
              size="xl"
              // href="/singin"
            >
              <div className="flex" style={{ alignItems: "center" }}>
                <text>Sing In</text>
                <svg
                  className="-mr-1 ml-2 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </Button>
          </Link>

          <div className=" flex justify-center">
            <Link
              href={"/singup"}
              className="border-b hover:text-slate-300  hover:border-slate-300"
            >
              <text className=" "> Sing Up </text>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
