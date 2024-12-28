import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../App.css";
import { Avatar } from "@nextui-org/avatar";
import {
  faDoorClosed,
  faGear,
  faPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useUserDetails } from "./UserContext";
import { Link } from "@nextui-org/link";
import { GetUserInfo } from "../api/api";
import { useQuery } from "@tanstack/react-query";
// eslint-disable-next-line react/prop-types
function Display({ clicker }) {
  const { userInfo, updateUserInfo } = useUserDetails();
  const {
    data: userInfomation,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", userInfo.accessToken, userInfo.name_tag],
    queryFn: ({ queryKey }) =>
      GetUserInfo({ url: queryKey[2], accessToken: queryKey[1] }),
  });
  if (isLoading) return <div className="w-full h-full">Loading...</div>;
  else if (isError) return <div>Error</div>;
  return (
    <div>
      <div
        className=" h-screen w-screen absolute top-0 left-0 z-30 bg-black opacity-40"
        onClick={clicker}
      ></div>
      <div className=" h-screen w-[80vw] absolute bg-white z-50 top-0 left-[-80vw] animate-moveIn animate-fill-forwards overflow-y-auto overflow-x-hidden scrollbar-hide">
        <div className=" flex justify-between mt-4 ml-4 mr-4">
          <Avatar
            src={`${import.meta.env.VITE_API_URL}feather${
              userInfo.profile_pic
            }`}
            className={`
      } h-10 w-10 `}
          />
          <FontAwesomeIcon
            icon={faPlus}
            className="h-8 w-8 mt-1"
          ></FontAwesomeIcon>
        </div>
        <div className=" flex flex-col gap-0 mt-1 ml-4 mr-4">
          <p className="p-0 m-0 h-6 font-bold text-lg ">{userInfo.name}</p>
          <p className="p-0 m-0 text-base text-gray-600 ">
            @{userInfo.name_tag}
          </p>
        </div>
        <div className=" flex justify-start gap-5 mt-2 ml-4 mr-4">
          <p className="p-0 m-0  text-sm ">
            <span className="font-bold">{userInfomation.data.follows}</span>{" "}
            <span className="text-gray-600">Siguiendo</span>
          </p>
          <p className="p-0  text-sm ">
            <span className="font-bold">{userInfomation.data.followers}</span>{" "}
            <span className="text-gray-600">Seguidores</span>
          </p>
        </div>
        <Link
          className=" text-black w-full"
          href={`/profile/${userInfo.name_tag}/post`}
        >
          <button className=" flex justify-start gap-6 mt-6 h-16 w-full items-center active:bg-gray-100">
            <FontAwesomeIcon
              icon={faUser}
              className="h-6 w-6 ml-6 "
            ></FontAwesomeIcon>
            <h1 className="text-xl font-bold">Perfil</h1>
          </button>
        </Link>

        <Link className=" text-black w-full" href="/settings">
          <button className=" flex justify-start gap-6 h-16 w-full items-center active:bg-gray-100">
            <FontAwesomeIcon
              icon={faGear}
              className="h-6 w-6 ml-6 "
            ></FontAwesomeIcon>
            <h1 className="text-xl font-bold">Configuración</h1>
          </button>
        </Link>

        <Link
          className=" text-black w-full"
          href="/login"
          onClick={() => updateUserInfo(false, false)}
        >
          <button className=" flex justify-start gap-6 h-16 w-full items-center active:bg-gray-100">
            <FontAwesomeIcon
              icon={faDoorClosed}
              className="h-6 w-6 ml-6 "
            ></FontAwesomeIcon>
            <h1 className="text-xl font-bold">Cerrar Sesión</h1>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Display;
