import { faFeather } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@nextui-org/link";
import { Avatar } from "@nextui-org/avatar";
import Display from "../contents/NavList";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserDetails } from "../contents/UserContext";
import { ObtainOpacity } from "../contents/OpacityContext";
import { useMutation } from "@tanstack/react-query";
import { CircularProgress } from "@nextui-org/progress";
import Publication from "../contents/Publication";
import { GetList } from "../api/api";

function Homepage() {
  const { userInfo } = useUserDetails();
  const [navList, setNavList] = useState(false);
  const [isActive, setIsActive] = useState("/home");
  const [information, setInformation] = useState(null);
  const { opacity, setOpacity } = ObtainOpacity();

  useEffect(() => {
    const scrollable = document.getElementById("scroll-component");
    const handleScroll = () => {
      const maxScroll = 300;
      const scrollY = scrollable.scrollTop;
      const newOpacity = Math.max(1 - scrollY / maxScroll, 0.5);
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
    mutationFn: (data) => GetList(data),
    onSuccess: (response) => setInformation(response.data),
  });
  const location = useLocation();
  useEffect(() => {
    setIsActive(location.pathname);
  }, [location]);
  useEffect(() => {
    obtainList(userInfo.accessToken);
  }, []);
  return (
    <div
      className={`w-full h-full relative top-0 flex justify-between flex-col`}
    >
      {/*Mostrar navbar list*/}
      {navList ? <Display clicker={() => setNavList(false)} /> : null}
      <div className="relative top-0 w-full z-40 bg-white">
        {/* Parte superior */}
        <div
          className={` flex w-full text-xl justify-between h-12 pt-2 pl-3 sm:hidden `}
        >
          <Avatar
            src={`http://localhost:8000/feather${userInfo.profile_pick}`}
            className={`
      } h-8 w-8 mt-1 ml-2 sm:hidden`}
            onClick={() => {
              setNavList(true);
            }}
          />
          <div className={`flex justify-start m-auto text-blue-500`}>
            <FontAwesomeIcon
              icon={faFeather}
              className=" h-8 pb-2 mr-8"
            ></FontAwesomeIcon>
          </div>
        </div>
        {/* Parte inferior */}
        <div
          className={`flex w-full text-base font-bold justify-between h-12 border-b `}
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
      </div>

      <div
        className="w-full h-full overflow-y-scroll scrollbar-hide pb-14 sm:p-0"
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

export default Homepage;
