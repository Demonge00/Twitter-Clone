import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@nextui-org/link";
import { Avatar } from "@nextui-org/avatar";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Display from "../contents/NavList";

function Notifications() {
  {
    /*Test*/
  }

  const [navList, setNavList] = useState(false);
  const [isActive, setIsActive] = useState("/home");
  const location = useLocation();
  useEffect(() => {
    setIsActive(location.pathname);
    console.log(location.pathname);
  }, [location]);
  return (
    <div className={`relative top-0 flex justify-between flex-col border-b`}>
      {/* Parte superior */}
      <div className={` flex w-full text-xl justify-between h-12 pt-2 pl-3`}>
        <Avatar
          src=""
          className={`
          } h-8 w-8 mt-1 ml-2 sm:hidden`}
          onClick={() => {
            setNavList(true);
          }}
        />
        {/* Notifications */}
        <div
          className={`${
            /\/notifications/.test(isActive) ? "" : "hidden"
          } flex ml-4 mr-auto w-5/6 justify-between`}
        >
          <p className="text-lg font-bold mt-1.5  w-3/4">Notificaciones</p>
          <Link className=" text-black " href="/settings">
            <FontAwesomeIcon
              icon={faGear}
              className=" h-6 mr-4"
            ></FontAwesomeIcon>
          </Link>
        </div>
      </div>

      {/*Mostrar navbar list */}
      {navList ? <Display clicker={() => setNavList(false)} /> : null}

      {/* Parte inferior */}
      {/* Notifications */}
      <div
        className={`${
          /\/notifications/.test(isActive) ? "" : "hidden"
        } flex w-full  text-base font-bold justify-between h-12 flex-nowrap overflow-x-auto stroke-none mt-2 scrollbar-hide`}
      >
        <Link
          href="/notifications/todas"
          className={`w-1/3 h-full justify-center ${
            isActive == "/notifications/todas"
              ? "bg-gray-200 border-b border-blue-500"
              : ""
          }`}
        >
          Todas
        </Link>
        <Link
          href="/notifications/verificado"
          className={`w-1/3 h-full justify-center ${
            isActive == "/notifications/verificado"
              ? "bg-gray-200 border-b border-blue-500"
              : ""
          }`}
        >
          Verificado
        </Link>
        <Link
          href="/notifications/menciones"
          className={`w-1/3 h-full justify-center ${
            isActive == "/notifications/menciones"
              ? "bg-gray-200 border-b border-blue-500"
              : ""
          }`}
        >
          Menciones
        </Link>
      </div>
    </div>
  );
}

export default Notifications;
