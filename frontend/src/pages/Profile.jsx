/* eslint-disable react-hooks/exhaustive-deps */
import {
  faArrowLeft,
  faCalendar,
  faChain,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@nextui-org/link";
import { Avatar } from "@nextui-org/avatar";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { useUserDetails } from "../contents/UserContext";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@nextui-org/progress";
import Publication from "../contents/Publication";
import {
  GetUserInfo,
  ChangeFollow,
  GetListPosts,
  GetListResponses,
  GetListMultimed,
  GetListLikes,
} from "../api/api";
import EditProfile from "../contents/EditProfile";

function Profile() {
  const params = useParams();
  const { userInfo } = useUserDetails();
  const [isActive, setIsActive] = useState("/home");
  const [scroll, setScroll] = useState(0);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [queryAgain, setQueryAgain] = useState(false);
  const location = useLocation();
  const {
    data: userInfomation,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["user", params.userNameId, userInfo.accessToken, queryAgain],
    queryFn: ({ queryKey }) =>
      GetUserInfo({ url: queryKey[1], accessToken: queryKey[2] }),
    select: (data) => data.data,
  });
  const {
    data: information,
    isSuccess,
    isLoading: LoadingFunct,
  } = useQuery({
    queryKey: ["list", params.userNameId, userInfo.accessToken, location],
    queryFn: ({ queryKey }) => {
      if (location.pathname.match(/post/))
        return GetListPosts({
          accessToken: queryKey[2],
          name_tag: queryKey[1],
        });
      else if (location.pathname.match(/responses/))
        return GetListResponses({
          accessToken: queryKey[2],
          name_tag: queryKey[1],
        });
      else if (location.pathname.match(/pictures-and-videos/))
        return GetListMultimed({
          accessToken: queryKey[2],
          name_tag: queryKey[1],
        });
      else
        return GetListLikes({
          accessToken: queryKey[2],
          name_tag: queryKey[1],
        });
    },
  });
  //Scrolls
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY; // Posición actual del scroll
      setScroll(currentScrollPosition);
    };

    // Agregar el listener de scroll
    window.addEventListener("scroll", handleScroll);

    // Limpiar el listener al desmontar el componente
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scroll]);
  useEffect(() => {
    setIsActive(location.pathname);
  }, [location, params.userNameId, userInfomation]);
  //Handlers
  const handleFollow = () => {
    ChangeFollow({
      accessToken: userInfo.accessToken,
      data: {
        name_tag: params.userNameId,
        follow: userInfomation.followed,
      },
    }).then(() => {
      setQueryAgain(!queryAgain);
    });
  };
  const conditionalRender = () => {
    if (LoadingFunct)
      return (
        <div className=" flex items-center justify-center w-full h-full">
          <CircularProgress aria-label="Loading..." size="lg" />
          <h1 className=" text-center text-xl">Cargando</h1>
        </div>
      );
    else if (isSuccess) {
      if (information.data.length) {
        return information.data.map((e, index) => {
          return <Publication info={e} key={index} commentPost={false} />;
        });
      } else {
        return (
          <div className=" flex items-center justify-center w-full h-full">
            <h1 className=" text-center text-xl">No hay tweets para mostrar</h1>
          </div>
        );
      }
    } else {
      return <h1>Error al obtener los datos</h1>;
    }
  };
  if (isLoading) return <div>Cargando...</div>;
  return (
    <div className=" w-full h-screen z-10 min-h-[300px] overflow-y-auto scrollbar-hide">
      {/*Editing User */}
      {isEditingUser ? (
        <EditProfile
          setIsEditingUserProp={() => {
            setIsEditingUser(false);
          }}
          userInformationProp={userInfomation}
        />
      ) : null}
      {/*Barra Go Back */}
      {isEditingUser ? null : (
        <div className="w-full h-14 pl-5 flex items-center gap-9 sticky z-40 bg-white top-0 sm:hidden">
          <Link href="/home">
            <FontAwesomeIcon icon={faArrowLeft} className="h-4 text-black" />
          </Link>
          <div className="">
            <p className="font-bold text-lg mt-1">{userInfomation.name}</p>
            <p className="text-slate-500 -mt-1">{userInfomation.post_number}</p>
          </div>
        </div>
      )}

      {/*Parte superior Geston de usuario*/}
      <div
        className={`w-full bg-white  relative top-0 ${
          scroll >= 90 ? "relative" : ""
        }`}
      >
        <img
          src={`http://localhost:8000/feather${userInfomation.background_pic}`}
          className=" w-full h-24 sm:h-40 object-cover"
        ></img>
        <Avatar
          src={`http://localhost:8000/feather${userInfomation.profile_pic}`}
          className="h-14 w-14 mt-1 ml-3 relative -top-8 ring-4 ring-white object-cover"
        />
        {userInfo.name_tag == userInfomation.name_tag ? (
          <Button
            className=" mr-4 ml-auto rounded-full -mt-10 bg-white border border-black active:bg-gray-200 font-bold block"
            size="sm"
            onClick={() => setIsEditingUser(true)}
          >
            Editar Perfil
          </Button>
        ) : userInfomation.followed ? (
          <Button
            className=" mr-4 ml-auto rounded-full -mt-10 bg-white border border-black active:bg-gray-200 font-bold block"
            size="sm"
            onClick={() => handleFollow()}
          >
            Dejar de Seguir
          </Button>
        ) : (
          <Button
            className=" mr-4 ml-auto rounded-full -mt-10 bg-white border border-black active:bg-gray-200 font-bold block"
            size="sm"
            onClick={() => handleFollow()}
          >
            Seguir
          </Button>
        )}

        {isError ? (
          <div>Ha ocurrido un error con tu conexión</div>
        ) : isLoading ? (
          <div className="text-center">Cargando</div>
        ) : (
          <div>
            <div className=" flex flex-col gap-0 -mt-2 ml-4 mr-4">
              <p className="p-0 m-0 h-6 font-bold text-lg ">
                {userInfomation.name}
              </p>
              <p className="p-0 m-0 text-base text-gray-600 ">
                @{userInfomation.name_tag}
              </p>
            </div>
            <p className=" break-words mr-2 ml-4 text-base mt-2">
              {userInfomation.bio}
            </p>
            {userInfomation.location ? (
              <div className=" ml-4 mt-2 flex gap-2 items-center text-slate-500 text-sm">
                <FontAwesomeIcon icon={faLocationDot} />
                <p>{userInfomation.location}</p>
              </div>
            ) : null}

            {userInfomation.link ? (
              <div className=" ml-3 flex gap-2 items-center text-slate-500 text-sm">
                <FontAwesomeIcon icon={faChain} />
                <p>{userInfomation.link}</p>
              </div>
            ) : null}
            {userInfomation.joined_in ? (
              <div className=" ml-4 mb-2 flex gap-2 items-center text-slate-500 text-sm">
                <FontAwesomeIcon icon={faCalendar} />
                <p>{userInfomation.joined_in}</p>
              </div>
            ) : null}
            <div className=" flex justify-start gap-5 mt-4 ml-4 mr-4">
              <p className="p-0 m-0  text-sm ">
                <span className="font-bold">{userInfomation.follows}</span>{" "}
                <span className="text-gray-600">Siguiendo</span>
              </p>
              <p className="p-0  text-sm ">
                <span className="font-bold">{userInfomation.followers}</span>{" "}
                <span className="text-gray-600">Seguidores</span>
              </p>
            </div>
          </div>
        )}

        {/*Parte media pestañas de tweets*/}
        <div
          className={`
        flex w-full  text-base font-bold justify-between h-12 flex-nowrap overflow-x-auto stroke-none mt-2 scrollbar-hide `}
        >
          <Link
            href={`/profile/${params.userNameId}/post`}
            className={`min-w-32 w-1/5 h-full justify-center ${
              isActive.match(/post/)
                ? "bg-gray-200 border-b border-blue-500 text-black"
                : "text-gray-500"
            }`}
          >
            Post
          </Link>
          <Link
            href={`/profile/${params.userNameId}/responses`}
            className={`min-w-32 h-full w-1/5 justify-center ${
              isActive.match(/responses/)
                ? "bg-gray-200 border-b border-blue-500 text-black"
                : "text-gray-500"
            }`}
          >
            Respuestas
          </Link>
          <Link
            href={`/profile/${params.userNameId}/pictures-and-videos`}
            className={`min-w-32 h-full w-1/5 justify-center ${
              isActive.match(/pictures-and-videos/)
                ? "bg-gray-200 border-b border-blue-500 text-black"
                : "text-gray-500"
            }`}
          >
            Fotos y videos
          </Link>
          <Link
            href={`/profile/${params.userNameId}/likes`}
            className={`min-w-32 h-full w-1/5 justify-center ${
              isActive.match(/likes/)
                ? "bg-gray-200 border-b border-blue-500 text-black"
                : "text-gray-500"
            }`}
          >
            Me gusta
          </Link>
        </div>
      </div>
      {/*Parte inferior paginado de tweets*/}
      <div className="w-full h-full pb-14 sm:p-0" id="scroll-component">
        {conditionalRender()}
      </div>
    </div>
  );
}

export default Profile;
