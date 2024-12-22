/* eslint-disable react/prop-types */
import {
  faBookmark as BookmarkFill,
  faChartSimple,
  faRetweet,
  faComment as CommentFill,
  faHeart as heartFilled,
} from "@fortawesome/free-solid-svg-icons";

import {
  faComment,
  faBookmark,
  faHeart as heart,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "@nextui-org/avatar";
import { useEffect, useState } from "react";
import { useUserDetails } from "./UserContext";
import { Link } from "@nextui-org/link";
import { Link as LinkG } from "react-router-dom";
import {
  GetPostInfo,
  ChangeLike,
  ChangeRetweet,
  ChangeBookmark,
} from "../api/api";
import PostResponse from "./PostResponse";
function Publication({
  info,
  response_mod = true,
  commentPost,
  showResponseOf = false,
}) {
  const { userInfo } = useUserDetails();
  const [publicationInfo, setPublicationInfo] = useState({ ...info });
  const [isCommenting, setIsCommenting] = useState(false);
  const [refresher, setRefresher] = useState(false);
  const reetweet_from = info.reetweet_from;
  {
    /*Func*/
  }
  useEffect(() => {
    GetPostInfo({
      accessToken: userInfo.accessToken,
      pub_id: publicationInfo.pub_id,
    }).then((response) => {
      setPublicationInfo(response.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresher]);
  const handleLike = () => {
    if (!publicationInfo.is_private)
      ChangeLike({
        accessToken: userInfo.accessToken,
        data: {
          pub_id: publicationInfo.pub_id,
          liked: publicationInfo.is_liked,
        },
      }).then((response) => {
        setPublicationInfo({
          ...publicationInfo,
          is_liked: response.data.is_liked,
        });
        setRefresher((e) => !e);
      });
  };
  const handleRetweet = () => {
    if (!publicationInfo.is_private)
      ChangeRetweet({
        accessToken: userInfo.accessToken,
        data: {
          pub_id: publicationInfo.pub_id,
          retweeted: publicationInfo.is_retweet,
        },
      }).then((response) => {
        setPublicationInfo({
          ...publicationInfo,
          is_retweet: response.data.is_retweet,
        });
        setRefresher((e) => !e);
      });
    return;
  };
  const handleBookmark = () => {
    if (!publicationInfo.is_private)
      ChangeBookmark({
        accessToken: userInfo.accessToken,
        data: {
          pub_id: publicationInfo.pub_id,
          bookmarked: publicationInfo.is_bookmarked,
        },
      }).then((response) => {
        setPublicationInfo({
          ...publicationInfo,
          is_bookmarked: response.data.is_bookmarked,
        });
        setRefresher((e) => !e);
      });
  };
  return (
    <div className={`w-full ${commentPost ? "" : "border-b"} `}>
      {info.response_of && response_mod ? (
        <Publication info={{ ...info.response_of }} commentPost={true} />
      ) : null}

      {/*TextArea*/}

      <LinkG
        className="flex flex-col w-full justify-start hover:bg-gray-100 cursor-pointer z-10 active:bg-white"
        to={`/publication/${publicationInfo.pub_id}`}
        reloadDocument={true}
      >
        {location.pathname.match(/post/) && reetweet_from != null ? (
          <h1 className="text-sm flex gap-3 text-gray-500 mt-1 items-center">
            <FontAwesomeIcon icon={faRetweet} className={`h-4 pl-10`} />
            {reetweet_from != userInfo.name
              ? `Retweeteado por ${reetweet_from}`
              : "Retweeteaste"}
          </h1>
        ) : null}
        {showResponseOf ? (
          <h1 className="text-sm mt-0.5 flex gap-2 sm:gap-4 text-gray-500 items-center">
            <FontAwesomeIcon icon={faComment} className={`h-4 pl-10 `} />
            En respuesta a {info.response_of.name}
          </h1>
        ) : null}
        <div className="flex w-full justify-start gap-2">
          <div className="flex flex-col w-auto mt-1 ml-1 items-center">
            <Avatar
              as={Link}
              href={`/profile/${publicationInfo.name_tag}/post`}
              src={`http://localhost:8000/feather${publicationInfo.avatar}`}
              className="h-12 w-12 ml-1 sm:h-14 sm:w-14 ring-4 ring-white sm:max-w-1/4"
            ></Avatar>
            {commentPost ? (
              <div className="flex-grow ml-1 w-0.5 bg-gray-500"></div>
            ) : null}
          </div>

          <div className="flex flex-col w-full mt-1 max-w-[80%] sm:max-w-[85%]">
            <div className="flex gap-1 justify-start text-sm max-[370px]:text-xs items-center sm:text-base">
              <h1 className="font-bold text-base">{publicationInfo.name}</h1>
              <LinkG to={`/profile/${publicationInfo.name_tag}/post`}>
                <p className="text-gray-400 hover:text-blue-500">
                  @{publicationInfo.name_tag}
                </p>
              </LinkG>
              <h1 className="text-gray-400">
                {" "}
                <span className="font-bold text-black">-</span>{" "}
                {publicationInfo.time_elapsed}
              </h1>
            </div>
            <div className="break-all">{publicationInfo.text}</div>
            {publicationInfo.publication_pick ? (
              <div className="relative w-full h-full">
                <img
                  className=" w-full min-h-40 relative z-20 object-fill block rounded-md"
                  src={`http://localhost:8000/feather${publicationInfo.publication_pick}`}
                ></img>
              </div>
            ) : null}
            {/*Barra de inserts*/}
            <div className="w-full flex flex-col justify-evenly items-center z-10 flex-wrap text-gray-500">
              <div className="flex gap-1 justify-evenly items-center w-full py-2">
                <button
                  className="p-1 text-xs flex items-center justify-center gap-0.5 hover:bg-blue-200  rounded-full"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsCommenting(true);
                  }}
                >
                  {publicationInfo.comments}
                  <FontAwesomeIcon
                    icon={
                      !publicationInfo.is_commented ? faComment : CommentFill
                    }
                    className="h-5 text-blue-300"
                  />
                </button>
                <button
                  className="py-1 px-1 text-xs flex items-center justify-center gap-1 hover:bg-red-200  rounded-full"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleLike();
                  }}
                >
                  {publicationInfo.likes}
                  <FontAwesomeIcon
                    icon={publicationInfo.is_liked ? heartFilled : heart}
                    className=" h-5 text-red-500"
                  />
                </button>
                <button
                  className="p-1 text-xs flex items-center justify-center gap-1 hover:bg-green-200  rounded-full"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleRetweet();
                  }}
                >
                  {publicationInfo.retweets}
                  <FontAwesomeIcon
                    icon={faRetweet}
                    className={`h-5 ${
                      publicationInfo.is_retweet
                        ? "text-green-600"
                        : "text-black"
                    }`}
                  />
                </button>

                <div className="py-1 ml-8 px-2 text-xs flex items-center justify-center gap-1 hover:bg-blue-200  rounded-full">
                  {publicationInfo.views}
                  <FontAwesomeIcon
                    icon={faChartSimple}
                    className=" h-5 text-blue-700"
                  />
                </div>
                <button
                  className="py-1 ml-8 px-2 text-xs flex items-center justify-center gap-1 hover:bg-blue-200  rounded-full"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleBookmark();
                  }}
                >
                  <FontAwesomeIcon
                    icon={
                      !publicationInfo.is_bookmarked ? faBookmark : BookmarkFill
                    }
                    className=" h-5 text-blue-500"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </LinkG>
      {isCommenting ? (
        <PostResponse
          setIsCommentingProp={setIsCommenting}
          info={{ ...publicationInfo }}
          commentPost={true}
        />
      ) : null}
    </div>
  );
}

export default Publication;
