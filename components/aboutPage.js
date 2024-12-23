"use client";

import { Card, Button, Alert } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function AboutPage() {
  const router = useRouter();
  const [alart, setalart] = useState({
    show: "hidden",
    massage: "",
  });
  return (
    <>
      <div className="lg:text-white text-wrap lg:bg-black lg:rounded-lg lg:py-5 lg:px-9 lg:bg-opacity-85">
        <div>
          <h1 className="text-2xl font-bold text-slate-300">Chatio</h1>
          <div className="text-lg mx-5 text-wrap">
            <text>
              Chatio is designed to make communication simple, secure, and
              enjoyable for everyone. Our mission is to connect people worldwide
              through effortless and private conversations.
            </text>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-300">Key Features</h1>
          <div className="text-lg mx-5 text-wrap">
            <ol>
              <li>
                <text className="text-lg font-bold">Instant Messaging:</text>{" "}
                Connect with friends and family in real-time.
              </li>
              <li>
                <text className="text-lg font-bold">Instant Messaging:</text>{" "}
                Connect with friends and family in real-time.
              </li>
              <li>
                <text className="text-lg font-bold">Group Chats:</text> Easily
                create groups for family, friends, or work teams.
              </li>
              <li>
                <text className="text-lg font-bold">Media Sharing:</text> Share
                photos, videos, and voice messages.
              </li>
              <li>
                <text className="text-lg font-bold">Customizable Themes:</text>{" "}
                Personalize the app to match your style.
              </li>
            </ol>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-300">Privacy and Security</h1>
          <div className="text-lg mx-5 text-wrap">
            <text>
              Reinforce the app's commitment to protecting user data and
              privacy, emphasizing the importance of end-to-end encryption and
              data security.
            </text>
          </div>
        </div>
        <div>
          <div>
            <div>
              <text className="text-2xl font-bold text-slate-300">Creater: </text><text className="text-2xl font-bold">Priyam Ghorui</text>
            </div>
            <text className="text-blue-800 ml-2 underline text-lg text-wrap">
              <a className="lg:text-blue-600" href="https://priyamghorui.vercel.app/">
                https://priyamghorui.vercel.app
              </a>
            </text>
            <div className="text-lg mx-5 text-wrap">
              <ol>
                <li>
                  GitHub:{" "}
                    <text className="text-blue-800 ml-2 underline">
                  <a className="lg:text-blue-600" href="https://github.com/priyamghorui">
                      https://github.com/priyamghorui
                  </a>
                    </text>
                </li>
                <li>
                  LinkedIn:{" "}
                    <text className="text-blue-800 ml-2 underline">
                  <a className="lg:text-blue-600" href="https://www.linkedin.com/in/priyam-ghorui-409041217">
                      https://www.linkedin.com/in/priyam-ghorui-409041217
                  </a>
                    </text>
                </li>
                <li>
                  Contact no:{" "}
                    <text className="text-blue-800  ml-2 underline">
                  <text className="lg:text-blue-600 lg:underline">
                      6289305571
                    </text>
                  </text>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
