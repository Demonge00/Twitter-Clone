/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { useUserDetails } from "./UserContext";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@nextui-org/progress";
import Publication from "./Publication";
import { GetListPosts } from "../api/api";

function ProfilePostsList() {
  const { userInfo } = useUserDetails();
  const params = useParams();
  const {
    data: listPost,
    isSuccess: successPost,
    isLoading: loadingPost,
  } = useQuery(
    getListPostsQueryOptions(params.userNameId, userInfo.accessToken)
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
  return mainPart(listPost, loadingPost, successPost);
}

function getListPostsQueryOptions(name_tag, accessToken) {
  return {
    queryKey: ["list-posts", name_tag],
    queryFn: () => GetListPosts({ accessToken, name_tag }),
  };
}

export default ProfilePostsList;
