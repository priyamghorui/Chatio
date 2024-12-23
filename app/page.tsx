"use client";

import Image from "next/image";
import Navbar from "../components/navbar";
import Users from "../components/users";
import Welcomepage from "@/components/welcomepage";
import { Button, Card } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Provider, useDispatch, useSelector } from "react-redux";
import { setSocketConnection, setUserdetails } from "@/redux/userSlice";
import { store } from "@/redux/store";
import { io } from "socket.io-client";

function Homesubmain() {
  const dispatch = useDispatch();
  const [count, setcount] = useState(0);
  const userdetails = useSelector((state) => state?.user?.userdetails);
  const [uservalidataionbytoken, setuservalidataionbytoken] = useState(false);
  const [uservalidataiondatabytoken, setuservalidataiondatabytoken] = useState({
    _id: "",
    username: "",
    email: "",
    password: "",
    bio: "",
    profile_pic: "",
    createdAt: "",
    updatedAt: "",
    __v: 0,
  });

  useEffect(function () {
    console.log("========>>", userdetails);

    async function fetchMyAPI() {
      // console.log(localStorage.getItem("token"));
      const URL = "http://localhost:3001/api/validation";
      try {
        const response = await axios.post(URL, {
          token: localStorage.getItem("token"),
        });
        // console.log(response.data.success);
        if (response.data.success == true) {
          console.log("response.data.data", response.data.data);

          const socketConnection = io("http://localhost:3001", {
            auth: {
              token: localStorage.getItem("token"),
            },
          });
          // console.log(searchParams.id);
          console.log("***-", socketConnection);
          dispatch(setSocketConnection(socketConnection));

          dispatch(setUserdetails(response.data.data));
          // console.log("...???",response.data.data);
          return ()=>{
            socketConnection.disconnect()
          }
          // setuservalidataiondatabytoken(response.data.data);
          // setuservalidataionbytoken(true);
          // socketConnection.disconnect()
        }
      } catch (error) {
        console.log("-----------");
      }
     
    }

    fetchMyAPI();
  }, []);

  return (
    <div className="flex flex-col bg-no-repeat bg-center bg-cover h-screen bg-[url('https://as2.ftcdn.net/v2/jpg/01/58/58/77/1000_F_158587781_xvjAWegfOhKCGPHg8bnQ0GFyb1hzsdmf.jpg')]">
      <link
        href="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.css"
        rel="stylesheet"
      />

      <Navbar />
      {userdetails ? (
        <>
          <div
            className="h-screen text-white"
            style={{ backgroundColor: "#000000c7" }}
          >
            <Users />
          </div>
        </>
      ) : (
        <div className="lg:justify-center lg:flex ">
          <Welcomepage />
        </div>
      )}

      {/* <script src="../node_modules/flowbite/dist/flowbite.min.js"></script> */}
      <script src="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js"></script>
    </div>
  );
}

export default function Home() {
  return (
    <Provider store={store}>
      <Homesubmain />
    </Provider>
  );
}
