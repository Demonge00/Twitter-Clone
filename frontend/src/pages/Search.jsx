import {
  faGear,
  faSearch,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@nextui-org/link";
import { Avatar } from "@nextui-org/avatar";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserDetails } from "../contents/UserContext";
import { OpacitySetter } from "../contents/OpacityContext";
import { GetListForYouAll, GetListTendences } from "../api/api";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@nextui-org/progress";
import Publication from "../contents/Publication";

import Display from "../contents/NavList";

function Search() {
  const { userInfo } = useUserDetails();
  const [navList, setNavList] = useState(false);
  const [isActive, setIsActive] = useState("/home");
  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const location = useLocation();
  {
    /*Opacity Handle*/
  }
  OpacitySetter();
  {
    /*Request*/
  }
  const {
    data: information,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["search", userInfo.accessToken, location],
    queryFn: ({ queryKey }) => {
      if (location.pathname.match(/para_ti/))
        return GetListForYouAll(queryKey[1]);
      else if (location.pathname.match(/tendencias/))
        return GetListTendences(queryKey[1]);
      else return;
    },
  });
  {
    /*Conditional func*/
  }
  function ConditionalRender() {
    if (isLoading) {
      return (
        <div className=" flex items-center justify-center w-full h-full">
          <CircularProgress aria-label="Loading..." size="lg" />
          <h1 className=" text-center text-xl">Cargando</h1>
        </div>
      );
    } else if (isSuccess) {
      return information.data.length ? (
        information.data.map((e, index) => {
          return <Publication info={e} key={index} />;
        })
      ) : (
        <div className=" flex items-center justify-center w-full h-full">
          <h1 className=" text-center text-xl">No hay tweets para mostrar</h1>
        </div>
      );
    } else {
      return (
        <div className=" flex items-center justify-center w-full h-full">
          <h1 className=" text-center text-xl">Error al cargar los tweets</h1>
        </div>
      );
    }
  }
  useEffect(() => {
    setIsActive(location.pathname);
  }, [location]);
  return (
    <div
      className={`relative h-full top-0 flex justify-between flex-col border-b`}
    >
      {/*Mostrar navbar list*/}
      {navList ? <Display clicker={() => setNavList(false)} /> : null}
      {/* Parte superior */}
      <div className={` flex w-full text-xl justify-between h-12 pt-2 pl-3`}>
        <Avatar
          src={`http://localhost:8000/feather${userInfo.profile_pic}`}
          className={`
            } h-8 w-8 mt-1 ml-2 sm:hidden`}
          onClick={() => {
            setNavList(true);
          }}
        />
        {/* Arrow Back */}
        <FontAwesomeIcon
          icon={faArrowLeft}
          className={`h-6  ml-2 mr-6 my-auto ${
            isSearching ? " text-blue-500" : " hidden"
          }`}
          onClick={() => {
            setSearchText("");
            setIsSearching(false);
          }}
        ></FontAwesomeIcon>
        <div className={`flex h-full w-5/6 justify-between sm:pt-0 sm:w-full`}>
          <div
            className={`flex h-full w-3/4 border rounded-full bg-gray-100  ${
              isSearching ? "border-blue-500 text-blue-500" : ""
            }`}
          >
            <FontAwesomeIcon icon={faSearch} className=" h-4 m-auto" />
            <input
              type="text"
              value={searchText}
              placeholder="Buscar"
              onChange={(e) => {
                setSearchText(e.target.value);
                setIsSearching(true);
              }}
              className={`custom-input h-full w-3/4`}
            />
          </div>
          <Link className=" text-black " href="/settings">
            <FontAwesomeIcon
              icon={faGear}
              className=" h-6 mr-4"
            ></FontAwesomeIcon>
          </Link>
        </div>
      </div>
      {/* Parte inferior */}
      {/* Buscar */}
      <div
        className={`${
          /\/search/.test(isActive) ? "" : "hidden"
        } flex w-full  text-base font-bold justify-between h-12 mt-2  overflow-x-scroll scrollbar-hide `}
      >
        <Link
          href="/search/para_ti"
          className={`min-w-32 w-1/5 h-full justify-center sm:min-w-fit px-3 ${
            isActive == "/search/para_ti"
              ? "bg-gray-200 border-b border-blue-500"
              : ""
          }`}
        >
          Para ti
        </Link>
        <Link
          href="/search/tendencias"
          className={`min-w-32 h-full w-1/5 justify-center sm:min-w-fit px-3 ${
            isActive == "/search/tendencias"
              ? "bg-gray-200 border-b border-blue-500"
              : ""
          }`}
        >
          Tendencias
        </Link>
        <Link
          href="/search/noticias"
          className={`min-w-32 h-full w-1/5 justify-center sm:min-w-fit  px-3 ${
            isActive == "/search/noticias"
              ? "bg-gray-200 border-b border-blue-500"
              : ""
          }`}
        >
          Noticias
        </Link>
        <Link
          href="/search/deportes"
          className={`min-w-32 h-full w-1/5 justify-center sm:min-w-fit px-3 ${
            isActive == "/search/deportes"
              ? "bg-gray-200 border-b border-blue-500"
              : ""
          }`}
        >
          Deportes
        </Link>
        <Link
          href="/search/entretenimiento"
          className={`min-w-32 h-full w-1/5 justify-center sm:min-w-fit px-3 ${
            isActive == "/search/entretenimiento"
              ? "bg-gray-200 border-b border-blue-500"
              : ""
          }`}
        >
          Entretenimiento
        </Link>
      </div>
      <div
        className="w-full h-full overflow-y-scroll scrollbar-hide pb-12 sm:p-0"
        id="scroll-component"
      >
        {ConditionalRender()}
      </div>
    </div>
  );
}

export default Search;
