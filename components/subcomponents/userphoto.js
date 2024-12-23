import { useSelector } from "react-redux";

export default function Userphoto() {
  const userdetailsRedux = useSelector((state) => state?.user?.userdetails);

    return (
      <div className="w-full max-w-sm bg-white rounded-full dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-end"></div>
        <div className="flex flex-col items-center justify-center" style={{alignItems:"center",height:"50px",width:"50px"}}>
         <text className="font-bold text-4xl">{userdetailsRedux?.username[0]?.toUpperCase()}</text>
       
        </div>
      </div>
    );
  }
  