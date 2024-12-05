import {
  faBell,
  faBookmark,
  faEnvelope,
  faHouse,
  faSearch,
  faUsers,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@nextui-org/link";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import PostPublication from "./PostPublication";
import { ObtainOpacity } from "./OpacityContext";

function Navbar() {
  const [isPosting, setIsPosting] = useState(false);
  const { opacity } = ObtainOpacity();

  const location = useLocation();
  if (location.pathname.match(/profile/)) {
    return null;
  }
  return (
    <div className="h-screen absolute">
      {/* Navbar inferior */}
      <ul
        className=" absolute bottom-0  w-screen flex justify-between h-14 border-t pt-4 sm:hidden z-50 bg-white"
        style={{ opacity: opacity }}
      >
        <li className="text-center w-1/6 h-full max-w-[60px]">
          <Link className=" w-4/6 h-4/6 ">
            <NavLink
              to="/home/para_ti"
              className={`${
                location.pathname.match(/home/) ? "" : "text-black"
              }`}
            >
              <FontAwesomeIcon icon={faHouse} className=" w-full h-full " />
            </NavLink>
          </Link>
        </li>
        <li className="text-center w-1/6 max-w-[60px]">
          <Link className=" w-1/2 h-1/2 mt-1">
            <NavLink
              to="/search/para_ti"
              className={`${
                location.pathname.match(/search/) ? "" : "text-black"
              }`}
            >
              <FontAwesomeIcon icon={faSearch} className=" w-full h-full" />
            </NavLink>
          </Link>
        </li>
        <li className="text-center w-1/6 max-w-[60px]">
          <Link className=" w-1/2 h-1/2 mt-1">
            <NavLink
              to="/notifications/todas"
              className={`${
                location.pathname.match(/notifications/) ? "" : "text-black"
              }`}
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
        {location.pathname.match(/home/) ? (
          <button
            className=" w-14 h-14 rounded-full bg-blue-500 mb-2 mr-1 absolute -top-[4.5rem] right-5 active:bg-black opacity-100"
            onClick={() => setIsPosting(true)}
          >
            <FontAwesomeIcon
              icon={faPen}
              className=" h-8 w-8 text-white rotate-[270deg] opacity-100"
            ></FontAwesomeIcon>
          </button>
        ) : null}
      </ul>
      {/*Posteador*/}
      {isPosting ? (
        <PostPublication setIsPostingProp={(e) => setIsPosting(e)} />
      ) : null}
    </div>
  );
}

export default Navbar;
