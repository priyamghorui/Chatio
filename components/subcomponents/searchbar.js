import axios from "axios";
import { Card, Spinner, Alert } from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Searchbar() {
  const userdetails = useSelector((state) => state?.user?.userdetails);
  const [searchvalue, setsearchvalue] = useState("");
  const [Loading, setLoading] = useState(false);
  const [SearchUser, setSearchUser] = useState([]);
  const [alart, setalart] = useState({
    show: "hidden",
    massage: "",
  });
  async function searchandel() {
    if (searchvalue != "") {
      const URL = `http://localhost:3001/api/searchuser`;
      try {
        setLoading(true);
        const response = await axios.post(URL, {
          search: searchvalue,
          mainuserId: userdetails._id,
        });
        console.log(response.data.data);
        setSearchUser(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log("here");
        setLoading(false);
        setalart({
          show: "",
          massage: "Something wrong , please try again later.",
        });
      }
    } else {
      setSearchUser([]);
    }
  }
  useEffect(() => {
    searchandel();
  }, [searchvalue]);
  return (
    <div className="m-2 ">
      <form className="max-w-sm mx-auto" autoComplete="off">
        <div className="">
          <div className="flex flex-col" style={{ alignItems: "center" }}>
            <input
              type="text"
              id="email"
              className="bg-gray-50 border rounded-full border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search.."
              value={searchvalue}
              onChange={(e) => {
                setsearchvalue(e.target.value);
              }}
            />
            {Loading ? (
              <>
                {" "}
                <div className="mt-3">
                  <Spinner aria-label="Default status example" />
                </div>
              </>
            ) : (
              <></>
            )}
            <div className="mt-1">
              <Alert
                color="failure"
                className={alart.show}
                onDismiss={() => setalart({ ...alart, show: "hidden" })}
              >
                <span className="font-medium">Info alert!</span> {alart.massage}
                .
              </Alert>
            </div>
          </div>
          <div
            href="#"
            className="max-w-sm"
            style={{ position: "absolute", width: "-webkit-fill-available" }}
          >
            {SearchUser.map((e) => (
              <Link
              href={{
                pathname: "/chat",
                query: { id: e._id },
              }}
                className="px-3 py-4 flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col hover:bg-gray-100 dark:hover:bg-gray-700 max-w-sm"
              >
                <div className="flex h-full flex-col justify-center">
                  <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {e.username}
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    {e.email}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
