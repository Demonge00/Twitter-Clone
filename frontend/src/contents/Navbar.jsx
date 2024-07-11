import {
  faBell,
  faBookmark,
  faEnvelope,
  faHouse,
  faSearch,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@nextui-org/link";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div>
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
