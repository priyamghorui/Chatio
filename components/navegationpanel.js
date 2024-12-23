"use client";
import React, { useEffect, useState } from "react";
import { Button, List, Avatar, Dropdown, Drawer, Card } from "flowbite-react";
import { FaArrowLeft } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

import Link from "next/link";

const Navegationpanel = () => {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [onlinestatus, setonlinestatus] = useState(false);
  const [otheruserid, setotheruserid] = useState("");

  const handleClose = () => setIsOpen(false);
  const socketConnection = useSelector(
    (state) => state?.user?.socketConnection
  );
  const [useridtotalk, setuseridtotalk] = useState({
    bio: "",
    createdAt: "",
    email: "",
    profile_pic: "",
    token: "",
    updatedAt: "",
    username: "",
    __v: 0,
    _id: "",
  });
  useEffect(() => {
    setotheruserid(searchParams.get("id"));
    if (socketConnection) {
      socketConnection.on("useridtotalkdetails", (data) => {
        setuseridtotalk(data);
        // console.log("data>>", data);
      });

      socketConnection.on("onlineUser", async (datas) => {
        console.log(">>?", searchParams.get("id"));

        if (datas.includes(searchParams.get("id"))) {
          console.log("asdasdf");

          setonlinestatus(true);
        }
        // console.log(datas.includes(searchParams.get("id")));
      });
    }
  }, [socketConnection]);

  return (
    <div
      className="pl-3 pr-3 flex justify-between bg-gray-200"
      style={{ alignItems: "center" }}
    >
      <div className="p-1 flex" style={{ alignItems: "center" }}>
        <div
          className="cursor-pointer"
          onClick={() => {
            router.push("/");
          }}
        >
          <FaArrowLeft size={25} color="black" />
        </div>
        <div className="ml-4 flex flex-col" style={{ alignItems: "center" }}>
          <div className="flex" style={{ alignItems: "center" }}>
            {/* <Avatar
            img="/images/userdp.jpg"
            className=""
            size="md"
            alt="avatar of Jese"
            rounded
            /> */}
            <div className="flex flex-col" style={{ alignItems: "center" }}>
              <div className="flex items-center justify-center">
                <div className="cursor-pointer" onClick={() => setIsOpen(true)}>
                  <div className="hover:bg-gray-700 w-full max-w-sm bg-black text-white rounded-full dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex justify-end"></div>
                    <div
                      className="flex flex-col items-center justify-center"
                      style={{
                        alignItems: "center",
                        height: "50px",
                        width: "50px",
                      }}
                    >
                      <text className="font-bold text-4xl">
                        {useridtotalk?.username[0]?.toUpperCase()}
                      </text>
                    </div>
                  </div>
                </div>
              </div>
              <Drawer open={isOpen} onClose={handleClose} position="bottom">
                <Drawer.Header />
                <Drawer.Items>
                  <Card href="#" className="max-w-sm">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {useridtotalk?.username}
                    </h5>
                    <p className="font-normal flex flex-col text-gray-700 dark:text-gray-400">
                      <text>Email : {useridtotalk?.email}</text>
                      <text>Bio : {useridtotalk?.bio}</text>
                    </p>
                  </Card>
                </Drawer.Items>
              </Drawer>
              {/* <div className="w-full max-w-sm bg-black text-white rounded-full dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-end"></div>
                <div
                  className="flex flex-col items-center justify-center"
                  style={{
                    alignItems: "center",
                    height: "50px",
                    width: "50px",
                  }}
                >
                  <text className="font-bold text-4xl">
                    {useridtotalk?.username[0]?.toUpperCase()}
                  </text>
                </div>
              </div> */}
              <div>
                {onlinestatus ? (
                  <>
                    {" "}
                    <text className="" style={{ fontSize: 13, color: "black" }}>
                      online
                    </text>
                  </>
                ) : (
                  <>
                    <text className="" style={{ fontSize: 13, color: "black" }}>
                      offline
                    </text>
                  </>
                )}
              </div>
            </div>
            <div className="ml-3 mb-6">
              <text className="text-2xl">{useridtotalk?.username}</text>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Dropdown
          dismissOnClick={false}
          renderTrigger={() => (
            <span>
              <HiDotsVertical size={25} />
            </span>
          )}
        >
          <div className="pr-9">
            <Dropdown.Item>Mute</Dropdown.Item>
            <Dropdown.Item>Block</Dropdown.Item>
            <Dropdown.Item>Delete</Dropdown.Item>
            <Dropdown.Item>Export chat</Dropdown.Item>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default Navegationpanel;
