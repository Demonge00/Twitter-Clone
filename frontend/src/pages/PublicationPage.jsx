import Publication from "../contents/Publication";
import { useUserDetails } from "../contents/UserContext";
import { GetPostInfo, GetTweetResponses } from "../api/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@nextui-org/progress";
import PostResponseProfile from "../contents/PostResponseProfile";
import MainTweet from "../contents/MainTweet";

function PublicationPage() {
  const { userInfo } = useUserDetails();
  const params = useParams();
  const {
    data: postInfo,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["postInfo", userInfo.accessToken, params.pubId],
    queryFn: ({ queryKey }) =>
      GetPostInfo({
        accessToken: queryKey[1],
        pub_id: queryKey[2],
      }),
  });
  const {
    data: listInfo,
    isLoading: listLoading,
    isSuccess: listSuccess,
  } = useQuery({
    queryKey: ["tweetResponses", userInfo.accessToken, params.pubId],
    queryFn: ({ queryKey }) =>
      GetTweetResponses({
        accessToken: queryKey[1],
        pub_id: queryKey[2],
      }),
  });
  function ConditionalRender() {
    if (listLoading) {
      return (
        <div className=" flex items-center justify-center w-screen flex-grow">
          <CircularProgress aria-label="Loading..." size="lg" />
          <h1 className=" text-center text-xl">Cargando</h1>
        </div>
      );
    } else if (listSuccess) {
      if (listInfo.data.length) {
        return listInfo.data.map((e, index) => {
          return (
            <Publication
              info={e}
              key={index}
              response_mod={false}
              showResponseOf={true}
            />
          );
        });
      } else {
        return (
          <div className=" flex items-center justify-center w-full h-auto flex-grow">
            <h1 className=" text-center text-xl">No hay tweets para mostrar</h1>
          </div>
        );
      }
    } else {
      return <h1>Error al obtener los datos</h1>;
    }
  }

  if (isLoading)
    return (
      <div className=" flex w-full h-screen justify-center items-center ">
        <CircularProgress aria-label="Loading..." size="lg" />
        <h1 className=" text-center text-xl">Cargando</h1>
      </div>
    );
  else if (isSuccess)
    return (
      <div className="w-full h-screen overflow-y-auto scrollbar-hide pb-14 sm:pb-0  flex flex-col">
        {/*Pub*/}
        <MainTweet info={postInfo.data} />
        {/*Commenter*/}
        <PostResponseProfile info={postInfo.data} />
        {/*Lista de tweets*/}
        {ConditionalRender()}
      </div>
    );
  else
    return (
      <div className=" flex w-full h-full justify-center items-center">
        <h1 className=" text-center text-xl">Error al cargar el tweet</h1>
      </div>
    );
}

export default PublicationPage;
