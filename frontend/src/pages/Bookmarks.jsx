import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@nextui-org/link";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
function Bookmarks() {
  const [isActive, setIsActive] = useState("/home");

  const location = useLocation();

  useEffect(() => {
    setIsActive(location.pathname);
    console.log(location.pathname);
  }, [location]);

  return (
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
    </div>
  );
}

export default Bookmarks;
