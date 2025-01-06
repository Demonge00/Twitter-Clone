import { Routes, Route, useLocation } from "react-router-dom";
import Homepage from "./Homepage";
import Navbar from "../contents/Navbar";
import NavbarLateral from "../contents/NavbarLateral";
import Search from "./Search";
import Notifications from "./Notifications";
import Messages from "./Messages";
import Bookmarks from "./Bookmarks";
import Comunity from "./Comunity";
import Profile from "./Profile";
import { useEffect } from "react";
import { useUserDetails } from "../contents/UserContext";
import { OpacityContext } from "../contents/OpacityContext";
import { GetUserInfo, Security, TryRefreshToken } from "../api/api";
import PublicationPage from "./PublicationPage";
import ProfilePostsList from "../contents/ProfilePostsList";
import ProfileResponsesList from "../contents/ProfileResponsesList";
import ProfileMultimediaList from "../contents/ProfileMultimediaList";
import ProfileLikeList from "../contents/ProfileLikeList";
import ForYouTweetsList from "../contents/ForYouTweetsList";
import FollowsTweetsList from "../contents/FollowsTweetsList";
import ForYouAllTweetsList from "../contents/ForYouAllTweetsList";
import TendenciesTweetsList from "../contents/TendenciesTweetsList";
import StillForWork from "../contents/StillForWork";
import { useQuery } from "@tanstack/react-query";

function WorkPage() {
  const location = useLocation();
  const { userInfo, updateUserInfo } = useUserDetails();
  useQuery(
    getUserPropertiesQueryOptions(userInfo.name_tag, userInfo.accessToken)
  );
  useEffect(() => {
    Security(userInfo.accessToken).catch(() => {
      TryRefreshToken({ refresh: userInfo.refreshToken })
        .then((response) => {
          updateUserInfo(response.data.access, userInfo.refreshToken);
        })
        .catch(() => {
          updateUserInfo(false, false);
        });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div className="w-screen h-screen grid grid-cols-1 sm:grid-cols-[15%_85%] lg:grid-cols-[25%_50%_25%] xl:grid-cols-[30%_40%_30%]  mx-auto overflow-hidden">
      <OpacityContext>
        <div className=" hidden sm:block w-full h-full overflow-y-auto overflow-hidden">
          <NavbarLateral />
        </div>
        <div className=" h-screen sm:mr-10 lg:mr-0 border-r w-full xl:min-w-[550px]">
          <Navbar />
          <Routes>
            <Route path="publication/:pubId" element={<PublicationPage />} />
            <Route path="home" element={<Homepage />}>
              <Route index element={<ForYouTweetsList />}></Route>
              <Route
                index
                path="para_ti"
                element={<ForYouTweetsList />}
              ></Route>
              <Route path="seguidos" element={<FollowsTweetsList />}></Route>
            </Route>
            <Route path="search" element={<Search />}>
              <Route path="para_ti" element={<ForYouAllTweetsList />}></Route>
              <Route
                path="tendencias"
                element={<TendenciesTweetsList />}
              ></Route>
              <Route path="noticias" element={<Search />}></Route>
              <Route path="deportes" element={<Search />}></Route>
              <Route path="entretenimiento" element={<Search />}></Route>
            </Route>
            <Route path="notifications" element={<Notifications />}>
              <Route path="todas" />
              <Route path="verificado" />
              <Route path="menciones" />
            </Route>
            <Route path="messages" element={<Messages />}></Route>
            <Route path="comunity" element={<Comunity />}></Route>
            <Route path="bookmarks" element={<Bookmarks />}></Route>
            <Route path="profile/:userNameId" element={<Profile />}>
              <Route path="post" element={<ProfilePostsList />} />
              <Route path="responses" element={<ProfileResponsesList />} />
              <Route
                path="pictures-and-videos"
                element={<ProfileMultimediaList />}
              />
              <Route path="likes" element={<ProfileLikeList />} />
            </Route>
            <Route path="settings" element={<StillForWork />}></Route>
          </Routes>
        </div>
        <div className="flex flex-col border rounded-lg">
          <div className=" h-12 w-full bg-gray-100 text-center flex justify-center items-center">
            <p className=" text-2xl">Mensajes</p>
          </div>
          <div className="flex flex-grow items-center justify-center">
            Aun no hay mensajes para mostrar
          </div>
        </div>
      </OpacityContext>
    </div>
  );
}

export default WorkPage;

function getUserPropertiesQueryOptions(userNameId, accessToken) {
  return {
    queryKey: ["userCommonInfo"],
    queryFn: () => GetUserInfo({ url: userNameId, accessToken }),
    select: (data) => data.data,
    staleTime: 1000 * 60 * 20,
  };
}
