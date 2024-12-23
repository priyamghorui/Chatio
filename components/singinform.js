"use client";
import {
  Button,
  Checkbox,
  Label,
  TextInput,
  FileInput,
  Alert,
} from "flowbite-react";
import React, { useState } from "react";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
function Sininform() {
  const router = useRouter();
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });
  const [alart, setalart] = useState({
    show: "hidden",
    massage: "",
  });
  const submitForm = async (e) => {
    e.preventDefault();

    const URL = "http://localhost:3001/api/singin";
    try {
      const response = await axios.post(URL, formdata);
      console.log("response", response);
      if (response.data.message == 98981 && response.data.success == true) {
        localStorage.setItem("token", response?.data?.token);
        router.push("/");
      } else if (
        response.data.message == 52 &&
        response.data.success == false
      ) {
        setalart({
          show: "",
          massage: "Something wrong , please try again later.",
        });
      } else {
        setalart({
          show: "",
          massage: "wrong username and password.2",
        });
      }
    } catch (error) {
      console.log(">>", error);
      setalart({
        show: "",
        massage: "Something wrong , please try again later.1",
      });
    }
  };

  return (
    <div className="flex flex-col">
      <Alert
        color="failure"
        className={alart.show}
        onDismiss={() => setalart({ ...alart, show: "hidden" })}
      >
        <span className="font-medium">Info alert!</span> {alart.massage}.
      </Alert>{" "}
      <div className="mt-20 mx-2 flex justify-center">
        <div
          className="flex-col w-96"
          style={{
            alignItems: "center",
            background: "#06050870",
            border: "1px solid #0e0e0e",
            borderRadius: "12px",
          }}
        >
          <form
            className="flex max-w-md flex-col gap-4 px-4 pt-4 pb-1"
            onSubmit={submitForm}
          >
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="email1"
                  value="Email"
                  style={{ color: "#fff" }}
                />
              </div>
              <TextInput
                name="email"
                value={formdata.email}
                onChange={(e) => {
                  setformdata({ ...formdata, email: e.target.value });
                }}
                id="email1"
                type="email"
                placeholder="name@email.com"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="password1"
                  value="Password"
                  style={{ color: "#fff" }}
                />
              </div>
              <TextInput
                name="password"
                onChange={(e) => {
                  setformdata({ ...formdata, password: e.target.value });
                }}
                value={formdata.password}
                id="password1"
                type="password"
                required
              />
            </div>
            {/* <div id="fileUpload" className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="file" value="Profile photo" />
          </div>
          <FileInput
            name="profilePic"
            id="file"
            helperText="A profile picture is useful to confirm your are logged into your account"
          />
        </div> */}
            <Button type="submit" color="blue">
              Sing in
            </Button>
          </form>
          <div className="text-white flex justify-center">
            <Link href={"/singup"} className="hover:text-slate-300">
              <text className="border-b border-white"> Sing Up </text>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sininform;
