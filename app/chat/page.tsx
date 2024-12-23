"use client";
import Image from "next/image";
import Navbar from "../../components/navbar";
import Navegationpanel from "../../components/navegationpanel";
import Indivisualchatsection from "../../components/indivisualchatbottom";
import Indivisualchatmassages from "../../components/indivisualchatmassages";
import { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import { Provider, useDispatch, useSelector } from "react-redux";
// import {setsocketconnectionredux} from "../../redux/action/action"
import { store } from "../../redux/store";
import { setSocketConnection, setUserdetails } from "@/redux/userSlice";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

function Indivisualchatsubmain() {
  const router = useRouter();
  // const socketConnection = useSelector(state => state.setsocketconnectionreducerredux)
  const searchParams = useSearchParams();
  const [count, setcount] = useState(0);
  const [height, setheight] = useState(0);
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
  const socketConnection01 = useSelector(
    (state) => state?.user?.socketConnection
  );
  const dispatch = useDispatch();
  useEffect(function () {
    async function fetchMyAPI() {
      // console.log(localStorage.getItem("token"));
      const URL = "http://localhost:3001/api/validation";
      try {
        const response = await axios.post(URL, {
          token: localStorage.getItem("token"),
          useridtotalk: searchParams.get("id"),
        });
        // console.log(response.data.success);
        if (response.data.success == true) {
          const socketConnection = io("http://localhost:3001", {
            auth: {
              token: localStorage.getItem("token"),
              friend:searchParams.get("id")
            },
          });
          // console.log(searchParams.id);
          console.log("***-connection in chatsections", socketConnection);
          dispatch(setUserdetails(response.data.data));
          dispatch(setSocketConnection(socketConnection));
          // setuservalidataiondatabytoken(response.data.data);
          // setuservalidataionbytoken(true);

          // const socketConnection = io("http://localhost:3001", {
          //   auth: {
          //     token: localStorage.getItem("token"),
          //     useridtotalk: searchParams.get("id"),
          //   },
          // });
          // // console.log(searchParams.id);
          // console.log("***-", socketConnection);
          // dispatch(setSocketConnection(socketConnection));

                      // if (socketConnection) {
                      //   console.log("send>>>>>>");
                        
                      //   socketConnection.emit("chatwithuserid", {
                      //     _id: "searchParams.get('id')",
                      //     data: 'response.data.useridtotalk',
                      //   });
                      // }
          // return () => {
          //   socketConnection.disconnect();
          // };
        }
      } catch (error) {
        console.log("-----------");
        router.push("/");
      }
    }

    fetchMyAPI();
  }, []);

  useEffect(() => {
    setheight(window.innerHeight);
  }, []);
  return (
    <Provider store={store}>
      <div
        className="flex flex-col bg-[url('/images/backgroundimg.jpg')]"
        style={{ height: height }}
      >
        <link
          href="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.css"
          rel="stylesheet"
        />
        <Navbar />
        {/* <text
        onClick={() => {
          setcount(count + 1);
        }}
        >
        hello
      </text> */}
        <Navegationpanel />
        <div style={{ overflow: "scroll" }}>
          <Indivisualchatmassages />
        </div>
        <div style={{ position: "absolute", bottom: "12px" }}>
          <Indivisualchatsection />
        </div>
        {/* <script src="../../node_modules/flowbite/dist/flowbite.min.js"></script> */}
        <script src="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js"></script>
      </div>
    </Provider>
  );
}
export default function Indivisualchat() {
  return (
    <Provider store={store}>
      <Indivisualchatsubmain />
    </Provider>
  );
}
