/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { useUserDetails } from "./UserContext";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@nextui-org/progress";
import Publication from "./Publication";
import { GetListMultimed } from "../api/api";

function ProfileMultimediaList() {
  const { userInfo } = useUserDetails();
  const params = useParams();
  const {
    data: listMultimedia,
    isSuccess: successMultimedia,
    isLoading: loadingMultimedia,
  } = useQuery(
    getListMultimediaQueryOptions(params.userNameId, userInfo.accessToken)
  );
  const mainPart = (tweetList, loadingInfo, isSuccess) => {
    if (loadingInfo)
      return (
        <div className=" flex items-center justify-center w-full h-full">
          <CircularProgress aria-label="Loading..." size="lg" />
          <h1 className=" text-center text-xl">Cargando</h1>
        </div>
      );
    else if (isSuccess) {
      if (tweetList.data.length) {
        return tweetList.data.map((e, index) => {
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
  return mainPart(listMultimedia, loadingMultimedia, successMultimedia);
}

function getListMultimediaQueryOptions(userNameId, accessToken) {
  return {
    queryKey: ["list-multimedia", userNameId],
    queryFn: () => GetListMultimed({ accessToken, name_tag: userNameId }),
  };
}

export default ProfileMultimediaList;
