"use client";
import { useEffect, useState } from "react";
import Navegation from "./subcomponents/navegation";
import Userphoto from "./subcomponents/userphoto";
import { Provider, useSelector } from "react-redux";
import { store } from "@/redux/store";

function Navbarmain() {
  const userdetails = useSelector(
    (state) => state?.user?.userdetails
  );
  return (
    <div
      className=" bg-slate-950 flex"
      style={{ alignItems: "center", justifyContent: "space-between" }}
    >
      <div>
        <Navegation/>
      </div>
      <div>
        <text className="text-white">Chatio</text>
      </div>
      <div className="mr-2">
        {userdetails ? (
          <div>
            <Userphoto/>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default function Navbar(){
return (
  <Provider store={store}>

  <Navbarmain/>
  </Provider>
)
}

