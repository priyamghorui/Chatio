import { useEffect, useState } from "react";
import Searchbar from "./subcomponents/searchbar";
import Link from "next/link";
import axios from "axios";
import { useSelector } from "react-redux";
import Image from "next/image";

export default function Users() {
  const [availablechat, setavailablechat] = useState([]);
  let [reload, setreload] = useState([]);

  // return (<div className="p-5 shadow-2xl" style={{height:"100vh",width:"50%"}}>
  //   <Searchbar/>
  // <IndivisualUser/>
  // {/* <ParticularUser/> */}

  // </div>)
  const userdetails = useSelector((state) => state?.user?.userdetails);
  const socketConnection = useSelector(
    (state) => state?.user?.socketConnection
  );
  // useEffect(() => {
  //   const availablechating = async () => {
  //     try {
  //       const URL = "http://localhost:3001/api/availablechating";
  //       const data = await axios.post(URL, userdetails);
  //       console.log("{}>>", data.data.data);
  //       setavailablechat(data.data.data);
  //     } catch (error) {}
  //   };
  //   // availablechating();
  // }, []);

  useEffect(() => {
    const availablechating = async () => {
      if (socketConnection) {
        socketConnection.on("onlineUser", async (datas) => {
          // console.log(datas);
          try {
            const URL = "http://localhost:3001/api/availablechating";
            const data = await axios.post(URL, userdetails);
            console.log("{}>>", data.data.data);
            const offlineset = await data.data.data.filter((ee) => {
              return !datas.includes(ee._id.toString());
            });
            const onlineset = await data.data.data.filter((ee) => {
              return datas.includes(ee._id.toString());
            });

            setavailablechat(offlineset);
            setreload(onlineset);
          } catch (error) {}
        });
      }
    };
    availablechating();
  }, []);

  return (
    <div>
      <Searchbar />
      {/* <text
        onClick={() => {
          console.log(availablechat);
        }}
      >
        54ss
      </text> */}
      {reload.map((e) => {
        return (
          <>
            <div className="rounded-lg dark:text-white hover:bg-gray-600 dark:hover:bg-gray-700 group">
              <Link
                href={{ 
                  pathname: "/chat",
                  query: { id: e._id },
                }}
              >
                <div
                  className="p-2 flex"
                  style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="p-2 flex" style={{ alignItems: "center" }}>
                    {/* <Image
          src="/images/userdp.jpg"
          width={50}
          height={50}
          alt="Picture of the author"
          className="rounded-full w-10 h-10"
        /> */}
                    <div className="max-w-sm bg-black text-white rounded-full dark:bg-gray-800 dark:border-gray-700">
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
                          {e.details.username[0].toUpperCase()}
                        </text>
                      </div>
                    </div>
                    <div className="absolute">
                      <div
                        className="w-3.5 h-3.5 rounded-full bg-green-600 border-2 border-white mt-9 "
                        style={{ marginLeft: "38px" }}
                      ></div>
                    </div>
                    {/* {e.online ? (
                      <>
                        {" "}
                        <div className="absolute">
                          <div
                            className="w-3.5 h-3.5 rounded-full bg-green-600 border-2 border-white mt-9 "
                            style={{ marginLeft: "38px" }}
                          ></div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="absolute">
                          <div
                            className="w-3.5 h-3.5 rounded-full bg-red-600 border-2 border-white mt-9 "
                            style={{ marginLeft: "38px" }}
                          ></div>
                        </div>
                      </>
                    )} */}

                    <div className="p-2 flex flex-col">
                      <text>
                        {e.details.username}
                        {/* {e._id} */}
                      </text>
                      {/* <text className="text-gray-400 text-sm">
                        Priyam : hello
                      </text> */}
                    </div>
                  </div>
                  <div>
                    <lu className="">
                      {/* <li
                        className="text-gray-400 text-sm"
                        style={{ listStyle: "none" }}
                      >
                        9/12/2024
                      </li> */}
                      {/* <div className="flex flex-row-reverse">
                        <li
                          className="bg-green-500 rounded-full h-6 w-6 flex items-center justify-center text-white"
                          style={{ listStyle: "none" }}
                        >
                          8
                        </li>
                      </div> */}
                    </lu>
                  </div>
                </div>
              </Link>
            </div>
          </>
        );
      })}

      {availablechat.map((e) => {
        return (
          <>
            <div className="rounded-lg dark:text-white hover:bg-gray-600 dark:hover:bg-gray-700 group">
              <Link
                href={{
                  pathname: "/chat",
                  query: { id: e._id },
                }}
              >
                <div
                  className="p-2 flex"
                  style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="p-2 flex" style={{ alignItems: "center" }}>
                    {/* <Image
          src="/images/userdp.jpg"
          width={50}
          height={50}
          alt="Picture of the author"
          className="rounded-full w-10 h-10"
        /> */}
                    <div className="max-w-sm bg-black text-white rounded-full dark:bg-gray-800 dark:border-gray-700">
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
                          {e.details.username[0].toUpperCase()}
                        </text>
                      </div>
                    </div>
                    <div className="absolute">
                      <div
                        className="w-3.5 h-3.5 rounded-full bg-red-600 border-2 border-white mt-9 "
                        style={{ marginLeft: "38px" }}
                      ></div>
                    </div>
                    {/* {e.online ? (
                      <>
                        {" "}
                        <div className="absolute">
                          <div
                            className="w-3.5 h-3.5 rounded-full bg-green-600 border-2 border-white mt-9 "
                            style={{ marginLeft: "38px" }}
                          ></div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="absolute">
                          <div
                            className="w-3.5 h-3.5 rounded-full bg-red-600 border-2 border-white mt-9 "
                            style={{ marginLeft: "38px" }}
                          ></div>
                        </div>
                      </>
                    )} */}

                    <div className="p-2 flex flex-col">
                      <text>
                        {e.details.username}
                        {/* {e._id} */}
                      </text>
                      {/* <text className="text-gray-400 text-sm">
                        Priyam : hello
                      </text> */}
                    </div>
                  </div>
                  <div>
                    <lu className="">
                      {/* <li
                        className="text-gray-400 text-sm"
                        style={{ listStyle: "none" }}
                      >
                        9/12/2024
                      </li> */}
                      {/* <div className="flex flex-row-reverse">
                        <li
                          className="bg-green-500 rounded-full h-6 w-6 flex items-center justify-center text-white"
                          style={{ listStyle: "none" }}
                        >
                          9
                        </li>
                      </div> */}
                    </lu>
                  </div>
                </div>
              </Link>
            </div>
          </>
        );
      })}
    </div>
  );
}
