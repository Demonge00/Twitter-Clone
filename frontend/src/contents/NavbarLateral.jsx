import {
  faBell,
  faBookmark,
  faEnvelope,
  faFeather,
  faGear,
  faHouse,
  faSearch,
  faUser,
  faUserGroup,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@nextui-org/link";
import { Avatar } from "@nextui-org/avatar";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { useUserDetails } from "./UserContext";
import PostPublication from "./PostPublication";

function NavbarLateral() {
  const navigate = useNavigate();
  const { userInfo, updateUserInfo } = useUserDetails();
  const [isActive, setIsActive] = useState("/home");
  const [isPosting, setIsPosting] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (userInfo.accessToken == false) {
      navigate("/login");
    }
    setIsActive(location.pathname);
  }, [location, navigate, userInfo.accessToken]);
  return (
    <nav className="hidden sm:flex flex-col h-screen border-r pr-6 pt-4 items-end ">
      {/* Lista de iconos */}
      <ul className=" flex flex-col w-full h-full gap-1 items-end xl:w-1/3 xl:items-start">
        <li>
          <Link href="/home" className="text-blue-900">
            <button className=" w-14 h-14 rounded-full active:bg-gray-200">
              <FontAwesomeIcon
                icon={faFeather}
                className=" h-8 w-8"
              ></FontAwesomeIcon>
            </button>
          </Link>
        </li>
        <li>
          <Popover placement="bottom">
            <PopoverTrigger>
              <Link
                href="/home/para_ti"
                className={`${/\/home/.test(isActive) ? "" : "text-black"}`}
              >
                <button className=" w-14 h-14 rounded-full active:bg-gray-200">
                  <FontAwesomeIcon
                    icon={faHouse}
                    className=" h-8 w-8"
                  ></FontAwesomeIcon>
                </button>
                <h1 className="hidden xl:inline text-xl">Inicio</h1>
              </Link>
            </PopoverTrigger>
            <PopoverContent className="xl:hidden">
              <div className="px-1 py-2 ">
                <div className="text-xs font-bold">Inicio</div>
              </div>
            </PopoverContent>
          </Popover>
        </li>
        <li>
          <Popover placement="bottom">
            <PopoverTrigger>
              <Link
                href="/search/para_ti"
                className={`${/\/search/.test(isActive) ? "" : "text-black"}`}
              >
                <button className=" w-14 h-14 rounded-full active:bg-gray-200">
                  <FontAwesomeIcon
                    icon={faSearch}
                    className=" h-8 w-8"
                  ></FontAwesomeIcon>
                </button>
                <h1 className="hidden xl:inline text-xl">Buscar</h1>
              </Link>
            </PopoverTrigger>
            <PopoverContent className="xl:hidden">
              <div className="px-1 py-2">
                <div className="text-xs font-bold">Buscar</div>
              </div>
            </PopoverContent>
          </Popover>
        </li>
        <li>
          <Popover placement="bottom">
            <PopoverTrigger>
              <Link
                href="/notifications"
                className={`${
                  /\/notifications/.test(isActive) ? "" : "text-black"
                }`}
              >
                <button className=" w-14 h-14 rounded-full active:bg-gray-200">
                  <FontAwesomeIcon
                    icon={faBell}
                    className=" h-8 w-8"
                  ></FontAwesomeIcon>
                </button>
                <h1 className="hidden xl:inline text-xl">Notificaciones</h1>
              </Link>
            </PopoverTrigger>
            <PopoverContent className="xl:hidden">
              <div className="px-1 py-2">
                <div className="text-xs font-bold w-16 break-words">
                  Notificaciones
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </li>
        <li>
          <Popover placement="bottom">
            <PopoverTrigger>
              <Link
                href="/messages"
                className={`${/\/messages/.test(isActive) ? "" : "text-black"}`}
              >
                <button className=" w-14 h-14 rounded-full active:bg-gray-200">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className=" h-8 w-8"
                  ></FontAwesomeIcon>
                </button>
                <h1 className="hidden xl:inline text-xl">Mensajes</h1>
              </Link>
            </PopoverTrigger>
            <PopoverContent className="xl:hidden">
              <div className="px-1 py-2">
                <div className="text-xs font-bold">Mensajes</div>
              </div>
            </PopoverContent>
          </Popover>
        </li>
        <li>
          <Popover placement="bottom">
            <PopoverTrigger>
              <Link
                href="/bookmarks"
                className={`${
                  /\/bookmarks/.test(isActive) ? "" : "text-black"
                }`}
              >
                <button className=" w-14 h-14 rounded-full active:bg-gray-200">
                  <FontAwesomeIcon
                    icon={faBookmark}
                    className=" h-8 w-8"
                  ></FontAwesomeIcon>
                </button>
                <h1 className="hidden xl:inline text-xl">Marcadores</h1>
              </Link>
            </PopoverTrigger>
            <PopoverContent className="xl:hidden">
              <div className="px-1 py-2">
                <div className="text-xs font-bold">Marcadores</div>
              </div>
            </PopoverContent>
          </Popover>
        </li>
        <li>
          <Popover placement="bottom">
            <PopoverTrigger>
              <Link
                href="/comunity"
                className={`${/\/comunity/.test(isActive) ? "" : "text-black"}`}
              >
                <button className=" w-14 h-14 rounded-full active:bg-gray-200">
                  <FontAwesomeIcon
                    icon={faUserGroup}
                    className=" h-8 w-8"
                  ></FontAwesomeIcon>
                </button>
                <h1 className="hidden xl:inline text-xl">Comunidad</h1>
              </Link>
            </PopoverTrigger>
            <PopoverContent className="xl:hidden">
              <div className="px-1 py-2">
                <div className="text-xs font-bold">Comunidad</div>
              </div>
            </PopoverContent>
          </Popover>
        </li>
        <li>
          <Popover placement="bottom">
            <PopoverTrigger>
              <Link
                href={`/profile/${userInfo.name_id}/post`}
                className={`${/\/profile/.test(isActive) ? "" : "text-black"}`}
              >
                <button className=" w-14 h-14 rounded-full active:bg-gray-200">
                  <FontAwesomeIcon
                    icon={faUser}
                    className=" h-8 w-8"
                  ></FontAwesomeIcon>
                </button>
                <h1 className="hidden xl:inline text-xl">Perfil</h1>
              </Link>
            </PopoverTrigger>
            <PopoverContent className="xl:hidden">
              <div className="px-1 py-2">
                <div className="text-xs font-bold">Perfil</div>
              </div>
            </PopoverContent>
          </Popover>
        </li>
        <li>
          <Popover placement="bottom">
            <PopoverTrigger>
              <Link
                href="/settings"
                className={`${/\/settings/.test(isActive) ? "" : "text-black"}`}
              >
                <button className=" w-14 h-14 rounded-full active:bg-gray-200">
                  <FontAwesomeIcon
                    icon={faGear}
                    className=" h-8 w-8"
                  ></FontAwesomeIcon>
                </button>
                <h1 className="hidden xl:inline text-xl">Opciones</h1>
              </Link>
            </PopoverTrigger>
            <PopoverContent className="xl:hidden">
              <div className="px-1 py-2">
                <div className="text-xs font-bold">Opciones</div>
              </div>
            </PopoverContent>
          </Popover>
        </li>
        <li>
          <Popover placement="bottom">
            <PopoverTrigger>
              <button
                className=" w-12 h-12 rounded-full bg-blue-500 mb-2 mr-1 xl:w-48 xl:h-full"
                onClick={() => setIsPosting(true)}
              >
                <FontAwesomeIcon
                  icon={faPen}
                  className=" h-8 w-8 text-white rotate-[270deg] xl:hidden"
                ></FontAwesomeIcon>
                <h1 className="hidden xl:inline text-xl text-white">Postear</h1>
              </button>
            </PopoverTrigger>
            <PopoverContent className="xl:hidden">
              <div className="px-1 py-2">
                <div className="text-xs font-bold">Postear</div>
              </div>
            </PopoverContent>
          </Popover>
        </li>
        <li className=" mb-0 mt-auto">
          {/* User profile chequear el onclick para el logout */}
          <Popover className="w-full h-full" placement="top-start">
            <PopoverTrigger className="w-full h-full">
              <div className="w-full h-full flex">
                <Avatar
                  src={`http://localhost:8000/feather${userInfo.profile_pick}`}
                  className=" mb-6 mr-2"
                />
                <div className="flex flex-col flex-grow -mt-1 text-gray-400">
                  <h1>{userInfo.name}</h1>
                  <h1>@{userInfo.name_id}</h1>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2 w-48">
                <Link
                  href="/login"
                  color="danger"
                  onClick={() => {
                    updateUserInfo(false, false);
                  }}
                >
                  Cerrar la sección del usuario
                </Link>
              </div>
            </PopoverContent>
          </Popover>
        </li>
      </ul>
      {/*Posteador*/}
      {isPosting ? (
        <PostPublication setIsPostingProp={(e) => setIsPosting(e)} />
      ) : null}
    </nav>
  );
}

export default NavbarLateral;
