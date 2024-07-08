import {
  faArrowLeft,
  faBell,
  faBookmark,
  faEnvelope,
  faFeather,
  faGear,
  faHouse,
  faSearch,
  faUserGroup,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@nextui-org/link";
import { Avatar } from "@nextui-org/avatar";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const [isActive, setIsActive] = useState("/home");
  const [searchText, setSearchText] = useState("");
  const location = useLocation();
  useEffect(() => {
    setIsActive(location.pathname);
    console.log(location.pathname);
  }, [location]);
  return (
    <div>
      {/* Navbar superior */}
      <div
        className={`relative top-0 flex justify-between sm:hidden ${
          /\/home/.test(isActive) ||
          /\/search/.test(isActive) ||
          /\/notifications/.test(isActive) ||
          /\/comunity/.test(isActive)
            ? "border-b"
            : ""
        } flex-col`}
      >
        {/* Parte superior de navbar */}
        <div className="flex w-screen text-xl justify-between h-12 pt-2 pl-3">
          {/* Arrow Back */}
          <Link href="/home" className=" text-black">
            <FontAwesomeIcon
              icon={faArrowLeft}
              className={`${
                /\/comunity/.test(isActive) || /\/bookmarks/.test(isActive)
                  ? ""
                  : "hidden"
              } h-4  ml-2 `}
            ></FontAwesomeIcon>
          </Link>
          <Avatar
            src=""
            className={`${
              /\/comunity/.test(isActive) || /\/bookmarks/.test(isActive)
                ? "hidden"
                : ""
            } h-8 w-8 mt-1 ml-2 `}
          />
          {/* Home */}
          <div
            className={`${
              /\/home/.test(isActive) ? "" : "hidden"
            } flex justify-start m-auto text-blue-500`}
          >
            <FontAwesomeIcon
              icon={faFeather}
              className=" h-8 pb-2 mr-8"
            ></FontAwesomeIcon>
          </div>
          {/* Search */}
          <div
            className={`${
              /\/search/.test(isActive) ? "" : "hidden"
            } flex ml-8 mr-auto w-5/6 justify-between`}
          >
            <div className=" flex h-2/3 w-3/4 border rounded-full bg-gray-100 mt-2">
              <FontAwesomeIcon icon={faSearch} className=" h-4 m-auto" />
              <input
                type="text"
                value={searchText}
                placeholder="Buscar"
                onChange={(e) => setSearchText(e.target.value)}
                className=" custom-input h-full"
              />
            </div>

            <FontAwesomeIcon
              icon={faGear}
              className=" h-6 mt-2 mr-4"
            ></FontAwesomeIcon>
          </div>
          {/* Notifications */}
          <div
            className={`${
              /\/notifications/.test(isActive) ? "" : "hidden"
            } flex ml-4 mr-auto w-5/6 justify-between`}
          >
            <p className="text-lg font-bold mt-1.5  w-3/4">Notificaciones</p>
            <FontAwesomeIcon
              icon={faGear}
              className=" h-6 mt-2 mr-2"
            ></FontAwesomeIcon>
          </div>
          {/* Mensajes directos */}
          <div
            className={`${
              /\/messages/.test(isActive) ? "" : "hidden"
            } flex ml-4 mr-auto w-5/6 justify-between`}
          >
            <p className="text-lg font-bold mt-1.5  w-5/6">Mensajes</p>
            <FontAwesomeIcon
              icon={faGear}
              className=" h-6 mt-2 mr-2"
            ></FontAwesomeIcon>
          </div>
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
                className=" h-6 mt-2 mr-2"
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                icon={faUserGroup}
                className=" h-6 mt-2 mr-2"
              ></FontAwesomeIcon>
            </div>
          </div>
          {/* Bookmarks */}
          <div
            className={`${
              /\/bookmarks/.test(isActive) ? "" : "hidden"
            } flex flex-col ml-4 mr-auto w-5/6 justify-between`}
          >
            <h2 className="text-lg font-bold ml-4  w-3/4">Guardados</h2>
            <h3 className="text-sm -mt-1 w-3/4 ml-4">@user</h3>
          </div>
        </div>
        {/* Home */}
        <div
          className={`${
            /\/home/.test(isActive) ? "" : "hidden"
          } flex w-screen text-base font-bold justify-between h-12 `}
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
        {/* Buscar */}
        <div
          className={`${
            /\/search/.test(isActive) ? "" : "hidden"
          } flex w-screen  text-base font-bold justify-between h-12 flex-nowrap overflow-x-auto stroke-none mt-2`}
        >
          <Link
            href="/search/para_ti"
            className={`min-w-32 h-full justify-center ${
              isActive == "/search/para_ti"
                ? "bg-gray-200 border-b border-blue-500"
                : ""
            }`}
          >
            Para ti
          </Link>
          <Link
            href="/search/tendencias"
            className={`min-w-32 h-full justify-center ${
              isActive == "/search/tendencias"
                ? "bg-gray-200 border-b border-blue-500"
                : ""
            }`}
          >
            Tendencias
          </Link>
          <Link
            href="/search/noticias"
            className={`min-w-32 h-full justify-center ${
              isActive == "/search/noticias"
                ? "bg-gray-200 border-b border-blue-500"
                : ""
            }`}
          >
            Noticias
          </Link>
          <Link
            href="/search/deportes"
            className={`min-w-32 h-full justify-center ${
              isActive == "/search/deportes"
                ? "bg-gray-200 border-b border-blue-500"
                : ""
            }`}
          >
            Deportes
          </Link>
          <Link
            href="/search/entretenimiento"
            className={`min-w-32 h-full justify-center ${
              isActive == "/search/entretenimiento"
                ? "bg-gray-200 border-b border-blue-500"
                : ""
            }`}
          >
            Entretenimiento
          </Link>
        </div>
        {/* Notifications */}
        <div
          className={`${
            /\/notifications/.test(isActive) ? "" : "hidden"
          } flex w-screen  text-base font-bold justify-between h-12 flex-nowrap overflow-x-auto stroke-none mt-2`}
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
        {/* Mensajes directos */}
        <div
          className={`flex h-12 w-5/6 border rounded-full bg-gray-50 mb-2 mx-auto mt-2 
            ${/\/messages/.test(isActive) ? "" : "hidden"}`}
        >
          <FontAwesomeIcon icon={faSearch} className=" h-4 m-auto" />
          <input
            type="text"
            value={searchText}
            placeholder="Buscar"
            onChange={(e) => setSearchText(e.target.value)}
            className=" custom-input h-full w-4/5 "
          />
        </div>
      </div>{" "}
      {/* Navbar inferior */}
      <ul className=" absolute bottom-0  w-screen flex justify-between h-14 border-t pt-4 sm:hidden">
        <li className="text-center w-1/6 h-full max-w-[60px]">
          <Link className=" w-4/6 h-4/6 ">
            <NavLink
              to="/home"
              style={({ isActive }) => {
                return {
                  color: isActive ? "" : "black",
                };
              }}
            >
              <FontAwesomeIcon icon={faHouse} className=" w-full h-full " />
            </NavLink>
          </Link>
        </li>
        <li className="text-center w-1/6 max-w-[60px]">
          <Link className=" w-1/2 h-1/2 mt-1">
            <NavLink
              to="/search"
              style={({ isActive }) => {
                return {
                  color: isActive ? "" : "black",
                };
              }}
            >
              <FontAwesomeIcon icon={faSearch} className=" w-full h-full" />
            </NavLink>
          </Link>
        </li>
        <li className="text-center w-1/6 max-w-[60px]">
          <Link className=" w-1/2 h-1/2 mt-1">
            <NavLink
              to="/notifications"
              style={({ isActive }) => {
                return {
                  color: isActive ? "" : "black",
                };
              }}
            >
              <FontAwesomeIcon icon={faBell} className=" w-full h-full" />
            </NavLink>
          </Link>
        </li>
        <li className="text-center w-1/6 max-w-[60px]">
          <Link className=" w-4/6 h-4/6 ">
            <NavLink
              to="/messages"
              style={({ isActive }) => {
                return {
                  color: isActive ? "" : "black",
                };
              }}
            >
              <FontAwesomeIcon icon={faEnvelope} className=" w-full h-full" />
            </NavLink>
          </Link>
        </li>
        <li className="text-center w-1/6 max-w-[60px]">
          <Link className=" w-4/6 h-4/6 ">
            <NavLink
              to="/comunity"
              style={({ isActive }) => {
                return {
                  color: isActive ? "" : "black",
                };
              }}
            >
              <FontAwesomeIcon icon={faUsers} className=" w-full h-full" />
            </NavLink>
          </Link>
        </li>
        <li className="text-center w-1/6 max-w-[60px] ">
          <Link className=" w-1/2 h-1/2 mt-1">
            <NavLink
              to="/bookmarks"
              style={({ isActive }) => {
                return {
                  color: isActive ? "" : "black",
                };
              }}
            >
              <FontAwesomeIcon icon={faBookmark} className=" w-full h-full" />
            </NavLink>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
