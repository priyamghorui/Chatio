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
function Sinupform() {
  const router = useRouter();
  const [formdata, setformdata] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [alart, setalart] = useState({
    show: "hidden",
    massage: "",
  });
  const submitForm = async (e) => {
    e.preventDefault();

    const URL = "http://localhost:3001/api/singup";
    try {
      const response = await axios.post(URL, formdata);

      console.log("response", response);
      if (response.data.message == 98981 && response.data.success == true) {
        router.push("/singin");
      } else if (
        response.data.message == 52 &&
        response.data.success == false
      ) {
        setalart({
          show: "",
          massage: "Something wrong , please try again later",
        });
      } else {
        setalart({
          show: "",
          massage:
            "Email Or Name already used please use another Email Or Name",
        });
      }
    } catch (error) {
      console.log(">>", error);
      setalart({
        show: "",
        massage: "Something wrong , please try again later",
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
      <div
        className="mt-20 mx-2 flex justify-center"
        
      >
        <div className="flex-col w-96" style={{
          alignItems: "center",
          background: "#06050870",
          border: "1px solid #0e0e0e",
          borderRadius: "12px",
          // width:"400px"
        }}>
          <form
            className="flex  max-w-md flex-col gap-4 px-4 pt-4 pb-1"
            onSubmit={submitForm}
          >
            <div>
              <div className="mb-2 block ">
                <Label
                  htmlFor="username1"
                  style={{ color: "#fff" }}
                  value="Name"
                />
              </div>
              <TextInput
                name="username"
                value={formdata.username}
                onChange={(e) => {
                  setformdata({ ...formdata, username: e.target.value });
                }}
                id="username1"
                type="text"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="email1"
                  style={{ color: "#fff" }}
                  value="Email"
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
                  style={{ color: "#fff" }}
                  value="Password"
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
              Sing up
            </Button>
          </form>
          <div className="text-white flex justify-center">
            <Link href={"/singin"} className="hover:text-slate-300">
              <text className="border-b border-white"> Sing In </text>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sinupform;
