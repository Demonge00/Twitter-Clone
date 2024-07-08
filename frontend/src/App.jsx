import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Navbar from "./contents/Navbar";
import { NextUIProvider } from "@nextui-org/react";

function App() {
  const navigate = useNavigate();
  return (
    <NextUIProvider navigate={navigate}>
      <div className="w-screen h-screen max-w-full">
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
        </Routes>
      </div>
    </NextUIProvider>
  );
}

export default App;
