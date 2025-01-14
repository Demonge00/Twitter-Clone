/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { useUserDetails } from "./UserContext";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@nextui-org/progress";
import Publication from "./Publication";
import { GetListLikes } from "../api/api";

function ProfileLikeList() {
  const { userInfo } = useUserDetails();
  const params = useParams();
  const {
    data: listLikes,
    isSuccess: successLikes,
    isLoading: loadingLikes,
  } = useQuery(
    getListLikesQueryOptions(params.userNameId, userInfo.accessToken)
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
  return mainPart(listLikes, loadingLikes, successLikes);
}

function getListLikesQueryOptions(userNameId, accessToken) {
  return {
    queryKey: ["list-likes", userNameId],
    queryFn: () => GetListLikes({ accessToken, name_tag: userNameId }),
  };
}

export default ProfileLikeList;
