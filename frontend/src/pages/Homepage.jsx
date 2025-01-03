import { faFeather } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@nextui-org/link";
import { Avatar } from "@nextui-org/avatar";
import Display from "../contents/NavList";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserDetails } from "../contents/UserContext";
import { OpacitySetter } from "../contents/OpacityContext";

function Homepage() {
  const { userInfo } = useUserDetails();
  const [navList, setNavList] = useState(false);
  const [isActive, setIsActive] = useState("/home");
  const location = useLocation();
  {
    /*Opacity Handle*/
  }
  OpacitySetter();
  {
    /*Request*/
  }

  {
    /*Conditional func*/
  }
  useEffect(() => {
    setIsActive(location.pathname);
  }, [location]);
  return (
    <div
      className={`w-full h-full relative top-0 flex justify-between flex-col`}
    >
      {/*Mostrar navbar list*/}
      {navList ? <Display clicker={() => setNavList(false)} /> : null}
      <div className="relative top-0 w-full z-40 bg-white">
        {/* Parte superior */}
        <div
          className={` flex w-full text-xl justify-between h-12 pt-2 pl-3 sm:hidden `}
        >
          <Avatar
            src={userInfo.profile_pic}
            className={`
      } h-8 w-8 mt-1 ml-2 sm:hidden`}
            onClick={() => {
              setNavList(true);
            }}
          />
          <div className={`flex justify-start m-auto text-blue-500`}>
            <FontAwesomeIcon
              icon={faFeather}
              className=" h-8 pb-2 mr-8"
            ></FontAwesomeIcon>
          </div>
        </div>
        {/* Parte inferior */}
        <div
          className={`flex w-full text-base font-bold justify-between h-12 border-b `}
        >
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

      <div
        className="w-full h-full overflow-y-scroll scrollbar-hide pb-14 sm:p-0"
        id="scroll-component"
      >
        <Outlet />
      </div>
    </div>
  );
}

export default Homepage;
