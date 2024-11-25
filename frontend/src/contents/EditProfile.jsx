/* eslint-disable react/prop-types */
import { faArrowLeft, faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@nextui-org/input";
import { Avatar } from "@nextui-org/avatar";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { ChangeUserProfile } from "../api/api";
import { useUserDetails } from "./UserContext";
import { useNavigate } from "react-router-dom";

function EditProfile({
  userInformationProp,
  setUserInfomationProp,
  setIsEditingUserProp,
}) {
  {
    /*Var*/
  }
  const navigate = useNavigate();
  const { userInfo, updateUserInfo } = useUserDetails();
  const [updatedInfo, setUpdatedInfo] = useState({ ...userInformationProp });
  const [bgImageUrl, setBgImageUrl] = useState(null);
  const [profImageUrl, setProfImageUrl] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const { mutate: edit } = useMutation({
    mutationFn: (data) => ChangeUserProfile(data),
    onSuccess: (response) => {
      updateUserInfo(response.data.access, response.data.refresh);
      navigate(`/profile/${updatedInfo.name_id}`);
      setIsEditingUserProp(false);
      setUserInfomationProp(updatedInfo);
    },
    onError: (error) => {
      console.log(error);
    },
  });
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
  const handleProfImageChange = (event) => {
    setProfileImage(event.target.files[0]);
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfImageUrl(url);
    }
  };
  const handleClick = () => {
    const formData = new FormData();
    if (backgroundImage) {
      formData.append("bg_image", backgroundImage, backgroundImage.name);
    }
    if (profileImage) {
      formData.append("prof_image", profileImage, profileImage.name);
    }
    formData.append("accessToken", userInfo.accessToken);
    for (let clave in updatedInfo) {
      if (
        clave == "name" ||
        clave == "name_id" ||
        clave == "bio" ||
        clave == "link" ||
        clave == "location"
      )
        formData.append(clave.toString(), updatedInfo[clave]);
    }
    edit(formData);
  };
  return (
    <div className=" h-full w-full absolute top-0 left-0 flex items-center justify-center">
      <div
        className=" w-screen h-screen absolute z-10  bg-black opacity-50"
        onClick={setIsEditingUserProp}
      ></div>
      <div className=" h-full w-full z-20 absolute bg-white sm:h-[60%] sm:w-1/3 sm:rounded-lg overflow-x-scroll scrollbar-hide">
        {/*Barra Go Back */}
        <div
          className={`w-full h-14 pl-5 pr-2 flex items-center gap-9 sticky top-0 border-b-1 justify-between sm:hidden z-50 bg-white mb-6`}
        >
          <button onClick={setIsEditingUserProp}>
            <FontAwesomeIcon icon={faArrowLeft} className="h-4 text-black" />
          </button>
          <p className="font-bold text-lg mt-1">Editar tu perfil</p>
          <Button
            color="primary"
            size="sm"
            className="rounded-full"
            onClick={handleClick}
          >
            Guardar
          </Button>
        </div>
        {/*Imagenes*/}
        <div className=" w-full h-28 sm:h-40 sm:rounded-t-lg flex justify-center items-center z-20">
          <img
            className=" w-full h-40 absolute z-20 object-fit"
            src={`${
              bgImageUrl
                ? bgImageUrl
                : `http://localhost:8000/feather${updatedInfo.background_pick}`
            }`}
          ></img>
          <label
            htmlFor="file-id"
            className="w-12 h-12 bg-slate-400 cursor-pointer rounded-full items-center justify-center flex z-40"
          >
            <FontAwesomeIcon icon={faCamera} className=" h-6" />
          </label>
          <input
            type="file"
            className="hidden"
            id="file-id"
            onChange={handleBgImageChange}
          ></input>
        </div>
        <div className="absolute z-40 left-6 mt-1 sm:-mt-4 sm:left-8 lg:left-11 lg:-mt-7 opacity-90">
          <label
            htmlFor="file-id2"
            className="w-8 h-8 lg:w-12 lg:h-12  bg-slate-600 cursor-pointer rounded-full items-center justify-center flex"
          >
            <FontAwesomeIcon icon={faCamera} className=" h-4 sm:h-6" />
          </label>
          <input
            type="file"
            className="hidden"
            id="file-id2"
            onChange={handleProfImageChange}
          ></input>
        </div>
        <Avatar
          src={`${
            profImageUrl
              ? profImageUrl
              : `http://localhost:8000/feather${updatedInfo.profile_pick}`
          }`}
          className="h-14 w-14 mt-1 ml-3 relative -top-3 ring-4 ring-white sm:w-18 sm:h-18 sm:-top-8 sm:ml-5 z-30 lg:w-24 lg:h-24 lg:-top-14"
        ></Avatar>
        {/*Imagenes*/}
        <div className="z-20 bg-white">
          <Input
            className="mb-2 ml-1 w-11/12 mx-auto"
            type="text"
            label="Nuevo nombre de usuario"
            labelPlacement="outside"
            defaultValue={updatedInfo.name}
            color="primary"
            onChange={(e) =>
              setUpdatedInfo({
                ...updatedInfo,
                name: e.target.value,
              })
            }
          />
          <Input
            className="mb-2 ml-1 w-11/12 mx-auto"
            type="text"
            label="Nuevo id de usuario"
            labelPlacement="outside"
            defaultValue={updatedInfo.name_id}
            classNames={{ mainWrapper: "mt-2" }}
            color="primary"
            onChange={(e) =>
              setUpdatedInfo({
                ...updatedInfo,
                name_id: e.target.value,
              })
            }
          />
          <Input
            className="mb-2 ml-1 w-11/12 mx-auto break-words"
            type="textarea"
            label="Descripción"
            labelPlacement="outside"
            placeholder="Biografia"
            defaultValue={updatedInfo.bio}
            classNames={{
              mainWrapper: "mt-2",
              inputWrapper: "h-16",
              input: " break-words",
              label: "top-6",
            }}
            color="primary"
            onChange={(e) =>
              setUpdatedInfo({
                ...updatedInfo,
                bio: e.target.value,
              })
            }
          />
          <Input
            className="mb-2 ml-1 w-11/12 mx-auto"
            type="text"
            label="Ubicación"
            labelPlacement="outside"
            defaultValue={updatedInfo.location}
            placeholder="Ubicación geográfica"
            color="primary"
            classNames={{ mainWrapper: "mt-2" }}
            onChange={(e) =>
              setUpdatedInfo({
                ...updatedInfo,
                location: e.target.value,
              })
            }
          />
          <Input
            className="mb-2 ml-1 w-11/12 mx-auto"
            type="text"
            label="Enlace"
            labelPlacement="outside"
            placeholder="Enlace personal"
            defaultValue={updatedInfo.link}
            classNames={{ mainWrapper: "mt-2" }}
            color="primary"
            onChange={(e) =>
              setUpdatedInfo({
                ...updatedInfo,
                link: e.target.value,
              })
            }
          />
          <Button
            color="primary"
            size="lg"
            className=" rounded-full hidden sm:block mx-auto my-4"
            onClick={handleClick}
          >
            Guardar cambios
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
