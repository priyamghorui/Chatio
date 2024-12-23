"use client";

import Image from "next/image";
import Navbar from "../../components/navbar";
import AboutPage from "../../components/aboutPage";

import { useEffect, useState } from "react";
import axios from "axios";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/redux/store";
import { setUserdetails } from "@/redux/userSlice";
function Aboutsubmain() {
  const dispatch = useDispatch();
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
    async function fetchMyAPI() {
      // console.log(localStorage.getItem("token"));
      const URL = "http://localhost:3001/api/validation";
      try {
        const response = await axios.post(URL, {
          token: localStorage.getItem("token"),
        });
        // console.log(response.data.success);
        if (response.data.success == true) {
          // setuservalidataiondatabytoken(response.data.data);
          // setuservalidataionbytoken(true);
          dispatch(setUserdetails(response.data.data));

        }
      } catch (error) {
        console.log("-----------");
      }
    }

    fetchMyAPI();
  }, []);
  return (
    <div className="flex flex-col lg:bg-center lg:bg-cover lg:h-screen bg-slate-300 lg:bg-[url('https://as2.ftcdn.net/v2/jpg/01/58/58/77/1000_F_158587781_xvjAWegfOhKCGPHg8bnQ0GFyb1hzsdmf.jpg')]">
      <link
        href="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.css"
        rel="stylesheet"
      />

      <Navbar/>
      <div className="m-5 lg:m-9">

      <AboutPage/>
      </div>
      {/* <script src="../../node_modules/flowbite/dist/flowbite.min.js"></script> */}
      <script src="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js"></script>
    </div>
  );
}
export default function About(){
  return (
    <Provider store={store}>
      <Aboutsubmain />
    </Provider>
  );
}