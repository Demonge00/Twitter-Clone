/* eslint-disable react-hooks/exhaustive-deps */
import { useUserDetails } from "./UserContext";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@nextui-org/progress";
import Publication from "./Publication";
import { GetListForYouAll } from "../api/api";

function ForYouAllTweetsList() {
  const { userInfo } = useUserDetails();
  const {
    data: listInformation,
    isLoading,
    isSuccess,
  } = useQuery(getListForYouAllQueryOptions(userInfo.accessToken));

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
  return mainPart(listInformation, isLoading, isSuccess);
}

function getListForYouAllQueryOptions(accessToken) {
  return {
    queryKey: ["list-for-you-all"],
    queryFn: () => GetListForYouAll(accessToken),
  };
}

export default ForYouAllTweetsList;
