import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Userdetails() {

  const userdetailsRedux = useSelector((state) => state?.user?.userdetails);
//   const [userdetails,setuserdetails]=useState({
//     username:"U",
//     email:" ",
//     _id:" "
//   })
// useEffect(()=>{

// setuserdetails(userdetailsRedux)

// },[])

  return (
    <div className="w-full max-w-sm bg-white  dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-end px-4 pt-4"></div>
      <div className="flex flex-col items-center pb-10">
        {/* <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src="/images/userdp.jpg"
          alt="Bonnie image"
        /> */}
        <div
          className="flex flex-col items-center justify-center bg-black text-white rounded-xl"
          style={{ alignItems: "center", height: "60px", width: "60px" }}
        >
          <text className="font-bold text-4xl">
            {userdetailsRedux?.username[0]?.toUpperCase()}
          </text>
        </div>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {userdetailsRedux?.username}
        </h5>
        <span
          className="text-sm text-gray-500 dark:text-gray-400"
          style={{ overflowWrap: "anywhere" }}
        >
          {userdetailsRedux?.email}
          {userdetailsRedux?._id}

          {/* 1111111111111111111111111111111111111111111111111110 */}
        </span>
        {/* <div className="flex mt-4 md:mt-6">
          <a
            href="#"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Log Out
          </a>
        </div> */}
      </div>
    </div>
  );
}
