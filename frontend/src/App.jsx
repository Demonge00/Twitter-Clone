import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Navbar from "./contents/Navbar";
import NavbarLateral from "./contents/NavbarLateral";
import { NextUIProvider } from "@nextui-org/react";

function App() {
  const navigate = useNavigate();
  return (
    <NextUIProvider navigate={navigate}>
      <div className="w-screen h-screen grid grid-cols-1 sm:grid-cols-[15%_85%] lg:grid-cols-[25%_50%_25%] max-w-[1420px] mx-auto">
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
            <Route path="/search">
              <Route path="/search/para_ti" element={<Homepage />}></Route>
              <Route path="/search/tendencias" element={<Homepage />}></Route>
              <Route path="/search/noticias" element={<Homepage />}></Route>
              <Route path="/search/deportes" element={<Homepage />}></Route>
              <Route
                path="/search/entretenimiento"
                element={<Homepage />}
              ></Route>
            </Route>
            <Route path="/notifications"></Route>
            <Route path="/messages"></Route>
            <Route path="/comunity"></Route>
            <Route path="/bookmarks"></Route>
            <Route path="/profile"></Route>
            <Route path="/settings"></Route>
          </Routes>
        </div>
        <div className=" bg-black"></div>
      </div>
    </NextUIProvider>
  );
}

export default App;
