import { faFeather } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@nextui-org/link";
import { Avatar } from "@nextui-org/avatar";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Homepage() {
  const [isActive, setIsActive] = useState("/home");
  const location = useLocation();
  useEffect(() => {
    setIsActive(location.pathname);
    console.log(location.pathname);
  }, [location]);
  return (
    <div className={`relative top-0 flex justify-between flex-col border-b`}>
      {/* Parte superior */}
      <div
        className={` flex w-full text-xl justify-between h-12 pt-2 pl-3 sm:hidden`}
      >
        <Avatar
          src=""
          className={`
        } h-8 w-8 mt-1 ml-2 `}
        />

        <div className={`flex justify-start m-auto text-blue-500`}>
          <FontAwesomeIcon
            icon={faFeather}
            className=" h-8 pb-2 mr-8"
          ></FontAwesomeIcon>
        </div>
      </div>
      {/* Parte inferior */}
      <div className={`flex w-full text-base font-bold justify-between h-12 `}>
        <Link
          href="/home/para_ti"
          className={` w-1/2 h-full justify-center ${
            isActive == "/home/para_ti"
              ? "bg-gray-200 border-b border-blue-500"
              : ""
          }`}
        >
          Para ti
        </Link>
        <Link
          href="/home/seguidos"
          className={` w-1/2 h-full justify-center ${
            isActive == "/home/seguidos"
              ? "bg-gray-200 border-b border-blue-500"
              : ""
          }`}
        >
          Seguidos
        </Link>
      </div>
    </div>
  );
}

export default Homepage;
