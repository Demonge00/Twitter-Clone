import {
  faGear,
  faSearch,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "@nextui-org/avatar";
import { useState } from "react";
import { Link } from "@nextui-org/link";
import Display from "../contents/NavList";
import { useUserDetails } from "../contents/UserContext";

function Messages() {
  const { userInfo } = useUserDetails();
  const [navList, setNavList] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  return (
    <div className={`relative top-0 flex justify-between flex-col border-b`}>
      {/* Parte superior */}
      <div className={` flex w-full text-xl justify-between h-12 pt-2 pl-3`}>
        <Avatar
          src={`http://localhost:8000/feather/${userInfo.profile_pick}`}
          className={`
      } h-8 w-8 mt-1 ml-2 sm:hidden`}
          onClick={() => {
            setNavList(true);
          }}
        />

        {/*Mostrar navbar list */}
        {navList ? <Display clicker={() => setNavList(false)} /> : null}

        {/* Mensajes directos */}
        <div className={`flex ml-4 mr-auto w-5/6 justify-between`}>
          <p className="text-lg font-bold mt-1.5  w-5/6">Mensajes</p>
          <Link className=" text-black " href="/settings">
            <FontAwesomeIcon
              icon={faGear}
              className=" h-6 mr-4"
            ></FontAwesomeIcon>
          </Link>
        </div>
      </div>
      {/* Parte inferior */}
      {/* Mensajes directos */}
      <div className=" flex w-5/6 h-full m-auto">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className={` h-6 w-6 mr-6 my-auto ${
            isSearching ? " text-blue-500" : " hidden"
          }`}
          onClick={() => {
            setSearchText("");
            setIsSearching(false);
          }}
        ></FontAwesomeIcon>
        <div
          className={`flex h-12 w-full border rounded-full bg-gray-100 mb-2 mx-auto mt-2 
             ${isSearching ? "border-blue-500 text-blue-500" : ""}`}
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
            className=" custom-input h-full w-4/5 "
          />
        </div>
      </div>
    </div>
  );
}

export default Messages;
