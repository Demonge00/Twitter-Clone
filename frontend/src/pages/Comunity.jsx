import {
  faArrowLeft,
  faSearch,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@nextui-org/link";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import StillForWork from "../contents/StillForWork";
function Comunity() {
  const [isActive, setIsActive] = useState("/home");

  const location = useLocation();

  useEffect(() => {
    setIsActive(location.pathname);
  }, [location]);

  return (
    <div className="flex flex-col w-full h-full">
      <div
        className={`relative top-0 flex justify-between flex-col border-b pb-2`}
      >
        {/* Parte superior */}
        <div className={` flex w-full text-xl justify-between h-12 pt-2 pl-3`}>
          {/* Arrow Back */}
          <Link href="/home" className=" text-black">
            <FontAwesomeIcon
              icon={faArrowLeft}
              className={`h-4  ml-2 `}
            ></FontAwesomeIcon>
          </Link>
          {/* Comunidad */}
          <div
            className={`${
              /\/comunity/.test(isActive) ? "" : "hidden"
            } flex ml-4 mr-auto w-5/6 justify-between`}
          >
            <p className="text-lg font-bold mt-1.5  w-3/4">Comunidad</p>
            <div>
              <FontAwesomeIcon
                icon={faSearch}
                className=" h-6 mt-2 mr-2 "
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                icon={faUserGroup}
                className=" h-6 mt-2"
              ></FontAwesomeIcon>
            </div>
          </div>
        </div>
      </div>
      <StillForWork />
    </div>
  );
}

export default Comunity;
