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
function Search() {
  const [isActive, setIsActive] = useState("/home");

  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const location = useLocation();
  useEffect(() => {
    setIsActive(location.pathname);
  }, [location]);
  return (
    <div className={`relative top-0 flex justify-between flex-col border-b`}>
      {/* Parte superior */}
      <div className={` flex w-full text-xl justify-between h-12 pt-2 pl-3`}>
        <Avatar
          src=""
          className={`
            } h-8 w-8 mt-1 ml-2 sm:hidden`}
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

          <FontAwesomeIcon
            icon={faGear}
            className=" h-6 mt-2 mr-4"
          ></FontAwesomeIcon>
        </div>
      </div>
      {/* Parte inferior */}
      {/* Buscar */}
      <div
        className={`${
          /\/search/.test(isActive) ? "" : "hidden"
        } flex w-full  text-base font-bold justify-between h-12 flex-nowrap overflow-x-auto stroke-none mt-2`}
      >
        <Link
          href="/search/para_ti"
          className={`min-w-32 w-1/5 h-full justify-center ${
            isActive == "/search/para_ti"
              ? "bg-gray-200 border-b border-blue-500"
              : ""
          }`}
        >
          Para ti
        </Link>
        <Link
          href="/search/tendencias"
          className={`min-w-32 h-full w-1/5 justify-center ${
            isActive == "/search/tendencias"
              ? "bg-gray-200 border-b border-blue-500"
              : ""
          }`}
        >
          Tendencias
        </Link>
        <Link
          href="/search/noticias"
          className={`min-w-32 h-full w-1/5 justify-center ${
            isActive == "/search/noticias"
              ? "bg-gray-200 border-b border-blue-500"
              : ""
          }`}
        >
          Noticias
        </Link>
        <Link
          href="/search/deportes"
          className={`min-w-32 h-full w-1/5 justify-center ${
            isActive == "/search/deportes"
              ? "bg-gray-200 border-b border-blue-500"
              : ""
          }`}
        >
          Deportes
        </Link>
        <Link
          href="/search/entretenimiento"
          className={`min-w-32 h-full w-1/5 justify-center ${
            isActive == "/search/entretenimiento"
              ? "bg-gray-200 border-b border-blue-500"
              : ""
          }`}
        >
          Entretenimiento
        </Link>
      </div>
    </div>
  );
}

export default Search;
