/* eslint-disable react/prop-types */
import {
  faArrowLeft,
  faSmile,
  faImage,
  faLock,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "@nextui-org/avatar";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { ChangeUserProfile } from "../api/api";
import { useUserDetails } from "./UserContext";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";

function PostPublication({ setIsPostingProp }) {
  const { userInfo } = useUserDetails();
  const [postingInfo, setPostingInfo] = useState({});
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [bgImageUrl, setBgImageUrl] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [isPubRestricted, setPubRestricted] = useState(false);
  const { mutate: edit } = useMutation({
    mutationFn: (data) => ChangeUserProfile(data),
    onSuccess: () => {
      setIsPostingProp(false);
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
    for (let clave in postingInfo) {
      if (
        clave == "name" ||
        clave == "name_id" ||
        clave == "bio" ||
        clave == "link" ||
        clave == "location"
      )
        formData.append(clave.toString(), postingInfo[clave]);
    }
    edit(formData);
  };
  return (
    <div className=" h-screen w-screen absolute top-0 left-0 flex items-center justify-center z-50">
      {/*Encover */}
      <div
        className=" w-screen h-screen absolute z-10  bg-black opacity-50"
        onClick={() => setIsPostingProp(false)}
      ></div>
      <div className=" h-full w-full z-20 absolute bg-white sm:h-[60%] sm:w-3/4 lg:w-2/5 sm:rounded-lg scrollbar-hide overflow-y-auto overflow-x-hidden">
        {/*Barra Go Back */}
        <div
          className={`w-full h-14 pl-5 pr-2 flex items-center gap-9 sticky top-0 border-b-1 justify-between sm:hidden z-50 bg-white mb-6`}
        >
          <button onClick={() => setIsPostingProp(false)}>
            <FontAwesomeIcon icon={faArrowLeft} className="h-4 text-black" />
          </button>
          <Button color="primary" className="rounded-full" onClick={handlePost}>
            Postear
          </Button>
        </div>
        {/*TextArea*/}
        <div className="flex w-full">
          <Avatar
            src={`http://localhost:8000/feather/${userInfo.profile_pick}`}
            className="h-14 w-14 sm:mt-1 ml-3 relative sm:top-3 ring-4 ring-white sm:max-w-1/4"
          ></Avatar>
          <div className="flex flex-col w-3/4">
            <textarea
              className={`block sm:mt-2 ml-3 w-full break-all resize-none outline-white p-2 text-xl scrollbar-hide h-[72px]`}
              type="textarea"
              placeholder="Que estás pensando?"
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
        <div className="sticky left-0 -bottom-0.5  w-full sm:rounded-t-lg flex flex-col justify-evenly items-center z-30 flex-wrap border-t mt-2 bg-white">
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
              <PopoverContent className="h-1 w-0">
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
                    onClick={() => setPubRestricted(false)}
                    className={`${
                      isPubRestricted ? "text-gray-500" : null
                    } mb-3 mt-1`}
                  >
                    Todos pueden comentar
                  </a>

                  <a
                    onClick={() => setPubRestricted(true)}
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

export default PostPublication;
