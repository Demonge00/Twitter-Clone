import { faFeather } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@nextui-org/input";
import { Button, Link } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { ChangePassword } from "../api/api";
import { useMutation } from "@tanstack/react-query";

function RecoverPasswordPage() {
  const [user, setUser] = useState("");
  const buttonEnabled = Boolean(user);
  const {
    mutate: registrarse,
    isLoading,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: (data) => ChangePassword(data),
  });
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("test");
    registrarse({
      email: user,
    }).then((response) => {
      console.log(response.html);
    });
  };
  useEffect(() => {
    console.log(buttonEnabled);
  }, [buttonEnabled]);
  return (
    <div
      className={" w-screen h-screen flex flex-col justify-center items-center"}
    >
      {isSuccess ? (
        <h1 className="text-center text-blue-500  flex flex-col gap-2 text-2xl">
          Su recuperacion se ha completado satisfactoriamente!
          <br />
          Revise su correo electronico.
        </h1>
      ) : (
        <div className=" w-full h-full flex flex-col justify-center items-center">
          <form className=" min-w-[280px] sm:min-w-[382px] w-1/2 lg:w-1/3 min-h-50 border rounded flex flex-col gap-2 bg-gray-50 justify-center">
            {isError ? (
              <h1 className="text-center text-blue-500 gap-2 pt-4 ">
                Ha ocurrido un error. Intentelo de nuevo
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
                onChange={(e) => setUser(e.target.value)}
              />
              <Button
                color="primary"
                radius="md"
                size="sm"
                className="block mx-auto mt-3 mb-2"
                isDisabled={!buttonEnabled}
                isLoading={isLoading}
                onClick={submitHandler}
              >
                Recuperar Contraseña
              </Button>
            </div>
          </form>
          <div className=" min-w-[280px] sm:min-w-[382px] w-1/2 lg:w-1/3 flex flex-col sm:flex-row justify-center items-center sm:justify-between">
            <Link href="/login" className="mt-2 sm:ml-4">
              Recorde mi contraseña
            </Link>
            <Link href="/register" className="mt-2 sm:mr-4">
              No tengo cuenta
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecoverPasswordPage;
