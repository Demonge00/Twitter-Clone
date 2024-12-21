import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@nextui-org/link";
import { Avatar } from "@nextui-org/avatar";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Display from "../contents/NavList";
import { useUserDetails } from "../contents/UserContext";
import { useMutation } from "@tanstack/react-query";
import { CircularProgress } from "@nextui-org/progress";
import Publication from "../contents/Publication";
import { GetListForYou } from "../api/api";
import { ObtainOpacity } from "../contents/OpacityContext";
function Notifications() {
  const { userInfo } = useUserDetails();
  const [navList, setNavList] = useState(false);
  const [information, setInformation] = useState(null);
  const [isActive, setIsActive] = useState("/home");
  const { setOpacity } = ObtainOpacity();

  useEffect(() => {
    const scrollable = document.getElementById("scroll-component");
    const handleScroll = () => {
      const maxScroll = 300;
      const scrollY = scrollable.scrollTop;
      const newOpacity = Math.max(1 - scrollY / maxScroll, 0.4);
      setOpacity(newOpacity);
    };

    scrollable.addEventListener("scroll", handleScroll);

    setOpacity(1);

    return () => {
      scrollable.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const {
    mutate: obtainList,
    isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: (data) => GetListForYou(data),
    onSuccess: (response) => setInformation(response.data),
  });
  useEffect(() => {
    obtainList(userInfo.accessToken);
  }, []);
  const location = useLocation();
  useEffect(() => {
    setIsActive(location.pathname);
  }, [location]);
  return (
    <div
      className={`relative top-0 flex justify-between flex-col border-b w-full h-full`}
    >
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
        } flex w-full  text-base font-bold justify-between h-12 flex-nowrap overflow-x-auto stroke-none mt-2 scrollbar-hide border-b`}
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
      <div
        className="w-full h-full overflow-y-scroll scrollbar-hide"
        id="scroll-component"
      >
        {isLoading ? (
          <div className=" flex items-center justify-center w-full h-full">
            <CircularProgress aria-label="Loading..." size="lg" />
            <h1 className=" text-center text-xl">Cargando</h1>
          </div>
        ) : isSuccess ? (
          information.map((e, index) => {
            return <Publication info={e} key={index} />;
          })
        ) : (
          <h1>Error al obtener los datos</h1>
        )}
      </div>
    </div>
  );
}

export default Notifications;
