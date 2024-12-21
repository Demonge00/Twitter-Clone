import { useEffect, useState } from "react";
import Publication from "../contents/Publication";
import { useUserDetails } from "../contents/UserContext";
import { GetPostInfo, GetTweetResponses } from "../api/api";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@nextui-org/progress";
import PostResponseProfile from "../contents/PostResponseProfile";

function PublicationPage() {
  const { userInfo } = useUserDetails();
  const [postInfo, setPostInfo] = useState({});
  const [listInfo, setListInfo] = useState({});
  const {
    mutate: post,
    isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: (data) => GetPostInfo(data),
    onSuccess: (response) => setPostInfo(response.data),
    onError: (error) => {
      console.log(error);
    },
  });
  const {
    mutate: getList,
    isLoading: listLoading,
    isSuccess: listSuccess,
  } = useMutation({
    mutationFn: (data) => GetTweetResponses(data),
    onSuccess: (response) => setListInfo(response.data),
    onError: (error) => {
      console.log(error);
    },
  });

  const params = useParams();

  useEffect(() => {
    post({
      accessToken: userInfo.accessToken,
      pub_id: params.pubId,
    });
    getList({
      accessToken: userInfo.accessToken,
      pub_id: params.pubId,
    });
  }, []);
  if (isLoading)
    return (
      <div className=" flex w-full h-full justify-center items-cente ">
        <CircularProgress aria-label="Loading..." size="lg" />
        <h1 className=" text-center text-xl">Cargando</h1>
      </div>
    );
  else if (isSuccess)
    return (
      <div className="w-full h-full overflow-y-auto scrollbar-hide pb-14 sm:pb-0">
        {/*Pub*/}
        <Publication info={postInfo} />
        {/*Commenter*/}
        <PostResponseProfile info={postInfo} />
        {/*Lista de tweets*/}
        {listLoading ? (
          <div className=" flex items-center justify-center w-full h-full ">
            <CircularProgress aria-label="Loading..." size="lg" />
            <h1 className=" text-center text-xl">Cargando</h1>
          </div>
        ) : listSuccess ? (
          listInfo.length ? (
            listInfo.map((e, index) => {
              return (
                <Publication
                  info={e}
                  key={index}
                  response_mod={false}
                  showResponseOf={true}
                />
              );
            })
          ) : (
            <div className=" flex items-center justify-center w-full h-full">
              <h1 className=" text-center text-xl">
                No hay tweets para mostrar
              </h1>
            </div>
          )
        ) : (
          <h1>Error al obtener los datos</h1>
        )}
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
