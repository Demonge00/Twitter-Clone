import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import LoginPage from "./pages/LoginPage";
import WorkPage from "./pages/WorkPage";
import RegisterPage from "./pages/RegisterPage";
import RecoverPasswordPage from "./pages/RecoverPasswordPage";
import NewPasswordPage from "./pages/NewPasswordPage";
import VerificationPage from "./pages/VerificationPage";
import { UserDetailsProvider } from "./contents/UserContext";

function App() {
  const navigate = useNavigate();

  return (
    <UserDetailsProvider>
      <NextUIProvider navigate={navigate}>
        <Routes>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="register" element={<RegisterPage />}></Route>
          <Route
            path="verify-user/:userSecret"
            element={<VerificationPage />}
          ></Route>
          <Route
            path="recover-password"
            element={<RecoverPasswordPage />}
          ></Route>
          <Route
            path="recover-password/:passwordSecret"
            element={<NewPasswordPage />}
          ></Route>
          <Route path="*" element={<WorkPage />}></Route>
        </Routes>
      </NextUIProvider>
    </UserDetailsProvider>
  );
}

export default App;
