import { faFeather } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { checkPasswordComplexity } from "../utils";
import { useMutation } from "@tanstack/react-query";
import { ChangePasswordResult } from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

function NewPasswordPage() {
  const navigate = useNavigate();
  const params = useParams();
  const [password, setPassword] = useState("");
  const [verifiedPassword, setVerifiedPassword] = useState("");
  const buttonEnabled =
    checkPasswordComplexity(password, verifiedPassword).length == 0;

  const {
    mutate: registrarse,
    isLoading,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: (data) => ChangePasswordResult(data),
  });
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("test");
    registrarse({
      url: params.passwordSecret,
      body: { password: password },
    }).then((response) => {
      console.log(response.html);
    });
  };
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [isSuccess, navigate]);
  return (
    <div
      className={
        " w-screen h-screen flex flex-col justify-center items-center text-"
      }
    >
      {isSuccess ? (
        <h1 className="text-center text-blue-500  flex flex-col gap-2 text-2xl">
          Ha cambiado su contraseña correctamente!
          <br />
        </h1>
      ) : (
        <div className="w-1/2 lg:w-1/3 flex flex-col justify-center items-center">
          <form className=" min-w-[280px] sm:min-w-[382px] w-full min-h-60 border rounded flex flex-col gap-2 bg-gray-50">
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
                className=" ml-1 w-11/12 mx-auto"
                type="password"
                label="Nueva Contraseña"
                labelPlacement="outside"
                placeholder="Inserta tu Contraseña"
                isInvalid={
                  checkPasswordComplexity(password, verifiedPassword).length !=
                    0 && password.length != 0
                }
                color="primary"
                classNames={{ mainWrapper: "mt-4" }}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                className="mb-2 ml-1 w-11/12 mx-auto"
                type="password"
                label="Verificar contraseña"
                labelPlacement="outside"
                placeholder="Verifica tu contraseña"
                isInvalid={
                  checkPasswordComplexity(password, verifiedPassword).length !=
                    0 && verifiedPassword.length != 0
                }
                classNames={{ mainWrapper: "mt-4" }}
                color="primary"
                onChange={(e) => setVerifiedPassword(e.target.value)}
              />
              <ul className=" text-xs ml-5 text-red-500">
                {checkPasswordComplexity(password, verifiedPassword).length !=
                  0 && password.length != 0
                  ? checkPasswordComplexity(password, verifiedPassword).map(
                      (e) => {
                        return <li key={e}>{e}</li>;
                      }
                    )
                  : null}
              </ul>
              <Button
                color="primary"
                radius="md"
                size="sm"
                className="block mx-auto mt-3 mb-2"
                isDisabled={!buttonEnabled}
                isLoading={isLoading}
                onClick={submitHandler}
              >
                Cambiar contraseña
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default NewPasswordPage;
