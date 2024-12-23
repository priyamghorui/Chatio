"use client";

import Navbar from "@/components/navbar";
import Singupform from "@/components/sinupform";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function singup() {
  const router=useRouter()
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

  useEffect(() => {
    async function fetchMyAPI() {
      // console.log(localStorage.getItem("token"));
      const URL = "http://localhost:3001/api/validation";
      try {
        const response = await axios.post(URL, {
          token: localStorage.getItem("token"),
        });
        // console.log(response.data.success);
        if (response.data.success == true) {
          router.push("/")
         
        }
      } catch (error) {
        console.log("-----------");
      }
    }

    fetchMyAPI();
  }, []);
  return (
    <div className="flex flex-col bg-no-repeat bg-cover bg-center h-screen bg-[url('https://as2.ftcdn.net/v2/jpg/01/58/58/77/1000_F_158587781_xvjAWegfOhKCGPHg8bnQ0GFyb1hzsdmf.jpg')]">
      <link
        href="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.css"
        rel="stylesheet"
      />

      <Navbar
        validationphoto={uservalidataionbytoken}
        uservalidataiondatabytoken={uservalidataiondatabytoken}
      />
         <div className="">

      <Singupform />
         </div>
      {/* <script src="../node_modules/flowbite/dist/flowbite.min.js"></script> */}
      <script src="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js"></script>
    </div>
  );
}

export default singup;
