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
import { Security, TryRefreshToken } from "../api/api";
import PublicationPage from "./PublicationPage";

function WorkPage() {
  const location = useLocation();
  const { userInfo, updateUserInfo } = useUserDetails();
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
  }, [location]);

  return (
    <div className="w-screen h-screen grid grid-cols-1 sm:grid-cols-[15%_85%] lg:grid-cols-[25%_50%_25%] xl:grid-cols-[30%_40%_30%]  mx-auto overflow-hidden">
      <OpacityContext>
        <div className=" hidden sm:block w-full h-full overflow-y-auto">
          <NavbarLateral />
        </div>
        <div className=" h-screen sm:mr-10 lg:mr-0 border-r w-full xl:min-w-[550px]">
          <Navbar />
          <Routes>
            <Route path="/publication/:pubId" element={<PublicationPage />} />
            <Route path="/home" element={<Homepage />}>
              <Route path="/home/para_ti" element={<Homepage />}></Route>
              <Route path="/home/seguidos" element={<Homepage />}></Route>
            </Route>
            <Route path="/search" element={<Search />}>
              <Route path="/search/para_ti" element={<Search />}></Route>
              <Route path="/search/tendencias" element={<Search />}></Route>
              <Route path="/search/noticias" element={<Search />}></Route>
              <Route path="/search/deportes" element={<Search />}></Route>
              <Route
                path="/search/entretenimiento"
                element={<Search />}
              ></Route>
            </Route>
            <Route path="/notifications" element={<Notifications />}>
              <Route path="/notifications/todas" />
              <Route path="/notifications/verificado" />
              <Route path="/notifications/menciones" />
            </Route>
            <Route path="/messages" element={<Messages />}></Route>
            <Route path="/comunity" element={<Comunity />}></Route>
            <Route path="/bookmarks" element={<Bookmarks />}></Route>
            <Route path="/profile/:userNameId" element={<Profile />}>
              <Route path="/profile/:userNameId/post" element={<Profile />} />
              <Route
                path="/profile/:userNameId/responses"
                element={<Profile />}
              />
              <Route
                path="/profile/:userNameId/pictures-and-videos"
                element={<Profile />}
              />
              <Route path="/profile/:userNameId/likes" element={<Profile />} />
            </Route>
            <Route path="/settings"></Route>
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
