/* eslint-disable react/prop-types */
import {
  faSmile,
  faImage,
  faLock,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "@nextui-org/avatar";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { Posting } from "../api/api";
import { useUserDetails } from "./UserContext";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

function PostResponseProfile({ info }) {
  const navigate = useNavigate();
  const { userInfo } = useUserDetails();
  const [postingInfo, setPostingInfo] = useState({ text: "" });
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [bgImageUrl, setBgImageUrl] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [isPubRestricted, setPubRestricted] = useState(0);
  const { mutate: post } = useMutation({
    mutationFn: (data) => Posting(data),
    onSuccess: () => {
      navigate(0);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  {
    /*Importantisimo textarea*/
  }
  useEffect(() => {
    const area = document.querySelector("textarea");
    area.addEventListener("input", () => {
      area.style.height = "72px";
      area.style.height = area.scrollHeight + "px";
    });
  }, []);
  {
    /*Func*/
  }
  const handleBgImageChange = (event) => {
    setBackgroundImage(event.target.files[0]);
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setBgImageUrl(url);
    }
  };
  const handleClear = () => {
    setBackgroundImage(null);
    setBgImageUrl(null);
    let filer = document.querySelector("input");
    filer.value = "";
    console.log(filer.files[0]);
  };
  const handlePost = () => {
    const formData = new FormData();
    if (backgroundImage) {
      formData.append("bg_image", backgroundImage, backgroundImage.name);
    }
    formData.append("accessToken", userInfo.accessToken);
    formData.append("text", postingInfo.text);
    formData.append("privacity", isPubRestricted);
    formData.append("response_of", info.pub_id);
    post(formData);
  };
  return (
    <div className="w-full flex items-center justify-center">
      <div className=" h-full w-full bg-white scrollbar-hide overflow-y-auto overflow-x-hidden">
        <h1 className="text-sm sm:text-base flex gap-3 text-gray-500 mt-1 items-center">
          <FontAwesomeIcon icon={faComment} className={`h-4 pl-10`} />
          En respuesta a {info.name}
        </h1>

        {/*TextArea*/}
        <div className="flex w-full">
          <Avatar
            src={`http://localhost:8000/feather${userInfo.profile_pick}`}
            className="h-12 w-12 sm:h-14 sm:w-14 mt-1 ml-3 relative ring-4 ring-white sm:max-w-1/4"
          ></Avatar>
          <div className="flex flex-col w-3/4">
            <textarea
              className={`block sm:mt-2 ml-3 w-full break-all resize-none outline-white p-2 text-base sm:text-xl scrollbar-hide sm:h-[72px] h-[36px]`}
              type="textarea"
              placeholder="Escribe tu respuesta aqui!"
              onChange={(e) =>
                setPostingInfo({
                  ...postingInfo,
                  text: e.target.value,
                })
              }
              value={postingInfo.text}
            />
            {bgImageUrl ? (
              <div className="relative">
                <button
                  className="w-10 h-10 pt-1 absolute rounded-full z-30 -right-2 bg-black opacity-80 text-white top-2"
                  onClick={handleClear}
                >
                  <FontAwesomeIcon icon={faX} className=" h-6" />
                </button>
                <img
                  className=" w-full min-h-40 relative
                    
                z-20 object-fill block left-4"
                  src={bgImageUrl}
                ></img>
              </div>
            ) : null}
          </div>
        </div>

        {/*Barra de inserts*/}
        <div className=" w-full flex justify-evenly items-center flex-wrap border-b bg-white">
          <div className="flex justify-evenly items-center w-full">
            <label
              htmlFor="file-id"
              className="w-12 h-12 cursor-pointer rounded-full items-center justify-center flex z-40"
            >
              <FontAwesomeIcon icon={faImage} className=" h-6" />
            </label>
            <input
              type="file"
              className="hidden fileWork"
              id="file-id"
              onChange={handleBgImageChange}
            ></input>
            <Popover placement="top" showArrow>
              <PopoverTrigger>
                <button
                  className="w-12 h-12 pt-1 active:bg-gray-500 rounded-full"
                  onClick={() => {
                    setTimeout(() => setPickerVisible(true), 100);
                  }}
                >
                  <FontAwesomeIcon icon={faSmile} className=" h-6" />
                </button>
              </PopoverTrigger>
              <PopoverContent>
                {isPickerVisible ? (
                  <Picker
                    data={data}
                    previewPosition="top"
                    onEmojiSelect={(e) =>
                      setPostingInfo({
                        ...postingInfo,
                        text: postingInfo.text + e.native,
                      })
                    }
                    perLine={7}
                    onClickOutside={() => {
                      setPickerVisible(false);
                    }}
                  />
                ) : null}
              </PopoverContent>
            </Popover>
            <Popover placement="bottom" showArrow>
              <PopoverTrigger>
                <button className="w-12 h-12 pt-1">
                  <FontAwesomeIcon icon={faLock} className=" h-6" />
                </button>
              </PopoverTrigger>
              <PopoverContent>
                <ol className="flex flex-col text-blue-600 text-xl items-center justify-center">
                  <a
                    onClick={() => setPubRestricted(0)}
                    className={`${
                      isPubRestricted ? "text-gray-500" : null
                    } mb-3 mt-1`}
                  >
                    Todos pueden comentar
                  </a>

                  <a
                    onClick={() => setPubRestricted(1)}
                    className={`${
                      !isPubRestricted ? "text-gray-500" : null
                    } mb-1`}
                  >
                    Solo seguidores
                  </a>
                </ol>
              </PopoverContent>
            </Popover>

            <Button
              color="primary"
              className=" rounded-full hidden sm:block ml-auto mr-4"
              onClick={handlePost}
            >
              Postear!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostResponseProfile;
