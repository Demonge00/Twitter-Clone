import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Navbar from "../contents/Navbar";
import NavbarLateral from "../contents/NavbarLateral";
import Search from "./Search";
import Notifications from "./Notifications";
import Messages from "./Messages";
import Bookmarks from "./Bookmarks";
import Comunity from "./Comunity";

function WorkPage() {
  return (
    <div className="w-screen h-screen grid grid-cols-1 sm:grid-cols-[15%_85%] lg:grid-cols-[30%_30%_20%_20%] mx-auto">
      <div className=" hidden sm:block w-full h-full max-w-full">
        <NavbarLateral />
      </div>
      <div className=" h-screen sm:mr-10 lg:mr-0 border-r">
        <Navbar />
        <Routes>
          <Route path="/home" element={<Homepage />}>
            <Route path="/home/para_ti" element={<Homepage />}></Route>
            <Route path="/home/seguidos" element={<Homepage />}></Route>
          </Route>
          <Route path="/search" element={<Search />}>
            <Route path="/search/para_ti" element={<Search />}></Route>
            <Route path="/search/tendencias" element={<Search />}></Route>
            <Route path="/search/noticias" element={<Search />}></Route>
            <Route path="/search/deportes" element={<Search />}></Route>
            <Route path="/search/entretenimiento" element={<Search />}></Route>
          </Route>
          <Route path="/notifications" element={<Notifications />}>
            <Route path="/notifications/todas" />
            <Route path="/notifications/verificado" />
            <Route path="/notifications/menciones" />
          </Route>
          <Route path="/messages" element={<Messages />}></Route>
          <Route path="/comunity" element={<Comunity />}></Route>
          <Route path="/bookmarks" element={<Bookmarks />}></Route>
          <Route path="/profile"></Route>
          <Route path="/settings"></Route>
        </Routes>
      </div>
      <div className=" bg-black"></div>
    </div>
  );
}

export default WorkPage;
