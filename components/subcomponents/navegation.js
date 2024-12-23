"use client";

import { Button, Drawer, Sidebar, TextInput } from "flowbite-react";
import { useState } from "react";
import {
  HiChartPie,
  HiClipboard,
  HiCollection,
  HiInformationCircle,
  HiLogin,
  HiPencil,
  HiSearch,
  HiShoppingBag,
  HiUsers,
} from "react-icons/hi";
import { FaHome, FaUserEdit } from "react-icons/fa";
import Userdetails from "./userdetails";
import Link from "next/link";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
export default function Navegation() {
  const userdetails = useSelector((state) => state?.user?.userdetails);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const handleClose = () => setIsOpen(false);
  const logout = async () => {
    const URL = "http://localhost:3001/api/singout";
    console.log(localStorage.getItem("token"));

    try {
      const response = await axios.post(URL, {
        token: localStorage.getItem("token"),
      });
      console.log(response);
      if (response.data.success == true) {
        const tokenRemove = localStorage.removeItem("token");
        if (!tokenRemove) {
          console.log("yes..");
          window.location.replace("/");
        }
      }
    } catch (error) {
      console.log("err>>", error);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center">
        <Button
          className="enabled:hover:bg-inherit focus:ring-0"
          onClick={() => setIsOpen(true)}
        >
          <svg
            className="w-9 h-9 m-1 text-white dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="M5 7h14M5 12h14M5 17h14"
            />
          </svg>
        </Button>
      </div>
      <Drawer open={isOpen} onClose={handleClose}>
        <Drawer.Header title="" titleIcon={() => <></>} />
        <Drawer.Items>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:bg-transparent [&>div]:p-0"
          >
            <div className="flex h-full flex-col justify-between py-2">
              <div>
                {/* <form className="pb-3 md:hidden">
                  <TextInput icon={HiSearch} type="search" placeholder="Search" required size={32} />
                </form> */}
                <Sidebar.Items>
                  <Sidebar.ItemGroup>
                    {userdetails ? (
                      <>
                        <div>
                          <Userdetails />
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    <Sidebar.Item href="/" icon={FaHome}>
                      Home
                    </Sidebar.Item>

                    {userdetails ? (
                      <Sidebar.Item
                        href="/e-commerce/products"
                        icon={FaUserEdit}
                      >
                        Update Profile
                      </Sidebar.Item>
                    ) : (
                      <></>
                    )}

                    <Sidebar.Item href={`/about`} icon={HiInformationCircle}>
                      About Us
                    </Sidebar.Item>
                    {userdetails ? (
                      <div className="cursor-pointer" onClick={logout}>
                        <Sidebar.Item icon={HiLogin}>Log Out</Sidebar.Item>
                      </div>
                    ) : (
                      <></>
                    )}
                  </Sidebar.ItemGroup>
                </Sidebar.Items>
              </div>
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
    </>
  );
}
