"use client";
import React, { useEffect, useRef, useState } from "react";
import { TiTick, TiTickOutline } from "react-icons/ti";
import { useSelector } from "react-redux";
import { Card } from "flowbite-react";
import { io } from "socket.io-client";
import { useSearchParams,usePathname  } from "next/navigation";
const Indivisualchatmassages = () => {
  const [count, setcount] = useState(0);
  const [mainuserid, setmainuserid] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname()
  // const userdetails = useSelector((state) => state?.user?.userdetails);
  
  const socketConnection = useSelector(
    (state) => state?.user?.socketConnection
  );
  const [allmassage, setallmassage] = useState([]);
  const currentMassage = useRef(null);


  useEffect(() => {
    console.log("-=-=-=-");
    
    if (socketConnection) {
      console.log("-=-=-=-socketConnection",socketConnection);
      
      socketConnection.on("previousallmassage", (data) => {
        console.log("-=-=-=-98");
        console.log("-**previousallmassage", data);
        const mainuser = data.pop();
        setmainuserid(mainuser.mainuserid);
        setallmassage(data);
      });
      
      socketConnection.on("newmassage", (data) => {
        const mainuser = data.pop();
        console.log("-*newmassage", data);
        setmainuserid(mainuser.mainuserid);
        setallmassage(data);
      });
      
     
  
      
    }


  }, [socketConnection]);
  useEffect(() => {
    if (currentMassage.current) {
      currentMassage.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [allmassage]);
  const check = (element) => {
    if (element.msgByUserId == mainuserid) {
      return (
        <>
          <div style={{ display: "flex", flexDirection: "row-reverse" }}>
            <text className="bg-white rounded text-xl p-2 border-white border-2 m-1">
              {element.text}
              <text style={{ display: "flex", flexDirection: "row-reverse" }}>
                {/* {element.seen ? (
                  <>
                    <TiTick color="blue" />
                  </>
                ) : (
                  <>
                    {" "}
                    <TiTick color="gray" />
                  </>
                )} */}
              </text>
            </text>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <text className="bg-white rounded text-xl p-2 border-white border-2 m-1">
              {element.text}
            </text>
          </div>
        </>
      );
    }
  };
  return (
    <div ref={currentMassage} className="pb-10">
      {/* 
      <text
        onClick={() => {
          setcount(count + 1);
        }}
        >
        click{count}
      </text> */}
      <div className="flex flex-col text-center rounded-md p-3 bg-white mx-9 my-4 drop-shadow-md">
        <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          Your Privacy Matters
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          All your messages on Chatio are protected with{" "}
          <text className="font-bold"> end-to-end encryption</text>. This means
          only you and the person you're chatting with can read or listen to
          them—no one else, not even us. Chat with confidence knowing your
          conversations are secure and private.
        </p>
      </div>
      <div className="mx-2">

      {allmassage.map((element) => (
        <>{check(element)}</>
      ))}
      </div>
    </div>
  );
};

export default Indivisualchatmassages;
