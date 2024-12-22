import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@nextui-org/link";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { OpacitySetter } from "../contents/OpacityContext";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@nextui-org/progress";
import Publication from "../contents/Publication";
import { GetListBookmarked } from "../api/api";
import { useUserDetails } from "../contents/UserContext";
function Bookmarks() {
  const { userInfo } = useUserDetails();
  const [isActive, setIsActive] = useState("/home");
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
    queryKey: ["bookmarks", userInfo.accessToken],
    queryFn: ({ queryKey }) => GetListBookmarked(queryKey[1]),
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
      className={`relative h-full top-0 flex justify-between flex-col border-b pb-2`}
    >
      {/* Parte superior */}
      <div
        className={` flex w-full text-xl justify-between h-14 pt-2 pl-3 border-b`}
      >
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
          <h3 className="text-sm -mt-1 w-3/4 ml-4 mb-1">@user</h3>
        </div>
      </div>
      <div
        className="w-full h-full overflow-y-scroll scrollbar-hide pb-14 sm:p-0"
        id="scroll-component"
      >
        {ConditionalRender()}
      </div>
    </div>
  );
}

export default Bookmarks;
