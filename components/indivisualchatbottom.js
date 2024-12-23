"use client";

import { HiSearch } from "react-icons/hi";
import { TextInput } from "flowbite-react";
import { IoSendSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

export default function Indivisualchatsection() {
  const [count, setcount] = useState(0);
  const [sentvalue, setsentvalue] = useState("");
  const [otheruserid, setotheruserid] = useState("");
  const [width, setwidth] = useState(0);
  const socketConnection = useSelector(
    (state) => state?.user?.socketConnection
  );
  const userdetails = useSelector((state) => state?.user?.userdetails);
  const searchParams = useSearchParams();

  useEffect(() => {
    setwidth(window.innerWidth);
    setotheruserid(searchParams.get("id"));
  }, []);
  function sentmassagehandel() {
    if (sentvalue != "" && otheruserid != "") {
      // console.log(userdetails);

      if (socketConnection) {
        socketConnection.emit("sentmassages", {
          sentvalue: sentvalue,
          otheruserid: otheruserid,
          mainuserid: userdetails._id,
        });
      }
      setsentvalue("");
    }
  }
  return (
    <div className="flex justify-between" style={{ width: width }}>
      {/* <text
        onClick={() => {
          setcount(count + 1);
        }}
      >
        hello
      </text> */}
      <div style={{ width: "inherit" }}>
        <TextInput
          className="mx-2"
          value={sentvalue}
          onChange={(e) => {
            setsentvalue(e.target.value);
          }}
          type="search"
          placeholder="Massage"
        />
      </div>
      <div
        className="rounded-full bg-blue-900 flex justify-center mr-2 cursor-pointer"
        style={{ alignItems: "center", width: "48px" }}
        onClick={() => {
          sentmassagehandel();
        }}
      >
        <IoSendSharp color="white" size={22} />
      </div>
    </div>
  );
}
