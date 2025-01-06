import { faFeather } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@nextui-org/input";
import { Button, Link } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Login } from "../api/api";
import { useUserDetails } from "../contents/UserContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const { userInfo, updateUserInfo } = useUserDetails();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const buttonEnabled = Boolean(email && password);

  const {
    mutate: login,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: (data) => Login(data),
    onError: (error) => {
      if (error.response) {
        setError(error.response.data.detail);
      } else setError("Error de red");
    },
    onSuccess: (response) => {
      updateUserInfo(response.data.access, response.data.refresh);
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      email: email,
      password: password,
    });
  };

  useEffect(() => {
    if (userInfo.accessToken) {
      navigate("/home");
    }
  }, [navigate, userInfo.accessToken]);
  return (
    <div
      className={" w-screen h-screen flex flex-col justify-center items-center"}
    >
      <form className=" min-w-[280px] sm:min-w-[382px] w-1/2 lg:w-1/3 min-h-60 border rounded flex flex-col gap-2 bg-gray-50 ">
        {isError ? (
          <h1 className="text-center text-red-500 gap-2 pt-4 bg-red-200 h-10 w-full">
            {error}
          </h1>
        ) : (
          <FontAwesomeIcon
            icon={faFeather}
            className="text-blue-500 h-8 mt-2"
          />
        )}
        <div>
          <Input
            className="mb-2 ml-1 w-11/12 mx-auto"
            type="text"
            label="Usuario o Email"
            labelPlacement="outside"
            placeholder="Inserta tu Email o Usuario"
            color="primary"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            className="mb-2 ml-1 w-11/12 mx-auto"
            type="password"
            label="Contraseña"
            labelPlacement="outside"
            placeholder="Inserta tu Contraseña"
            classNames={{ mainWrapper: "mt-4" }}
            color="primary"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            color="primary"
            radius="md"
            size="sm"
            className="block mx-auto mt-3 mb-2"
            isDisabled={!buttonEnabled}
            isLoading={isLoading}
            onClick={handleSubmit}
          >
            Logueate
          </Button>
        </div>
      </form>
      <div className=" min-w-[280px] sm:min-w-[382px] w-1/2 lg:w-1/3 flex flex-col sm:flex-row justify-center items-center sm:justify-between">
        <Link href="/recover-password" className="mt-2 sm:ml-4">
          Olvide mi contraseña
        </Link>
        <Link href="/register" className="mt-2 sm:mr-4">
          No tengo cuenta
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
