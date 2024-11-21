import { faFeather } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@nextui-org/input";
import { Button, Link } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { checkEmailComplex, checkPasswordComplexity } from "../utils";
import { useMutation } from "@tanstack/react-query";
import { RegisterUser } from "../api/api";
import { useUserDetails } from "../contents/UserContext";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();
  const { userInfo } = useUserDetails();
  const [userInformation, setUserInformation] = useState({
    user: "",
    email: "",
    password: "",
    verifiedPassword: "",
  });
  const buttonEnabled =
    userInformation.user &&
    checkEmailComplex(userInformation.email) &&
    checkPasswordComplexity(
      userInformation.password,
      userInformation.verifiedPassword
    ).length == 0;

  const {
    mutate: registrarse,
    isLoading,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: (data) => RegisterUser(data),
  });
  const submitHandler = (e) => {
    e.preventDefault();
    registrarse({
      name: userInformation.user,
      email: userInformation.email,
      password: userInformation.password,
    });
  };
  useEffect(() => {
    if (userInfo.accessToken) {
      navigate("/home");
    }
  }, [navigate, userInfo.accessToken]);
  return (
    <div
      className={
        " w-screen h-screen flex flex-col justify-center items-center text-"
      }
    >
      {isSuccess ? (
        <h1 className="text-center text-blue-500  flex flex-col gap-2 text-2xl">
          Su registro se ha completado satisfactoriamente!
          <br />
          Revise su correo electronico.
        </h1>
      ) : (
        <div className="w-1/2 lg:w-1/3 flex flex-col justify-center items-center">
          <form className=" min-w-[280px] sm:min-w-[382px] w-full min-h-60 border rounded flex flex-col gap-2 bg-gray-50">
            {isError ? (
              <h1 className="text-center text-blue-500 gap-2 pt-4 ">
                Ha ocurrido un error con el registro. Intentelo de nuevo
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
                label="Usuario"
                labelPlacement="outside"
                placeholder="Inserta tu nombre de Usuario"
                color="primary"
                onChange={(e) =>
                  setUserInformation({
                    ...userInformation,
                    user: e.target.value,
                  })
                }
              />
              <Input
                className="mb-2 ml-1 w-11/12 mx-auto"
                type="email"
                label="Email"
                labelPlacement="outside"
                placeholder="Inserta tu Email"
                isInvalid={
                  !checkEmailComplex(userInformation.email) &&
                  userInformation.email != ""
                }
                errorMessage="Entre una dirección válida de email"
                classNames={{ mainWrapper: "mt-4" }}
                color="primary"
                onChange={(e) =>
                  setUserInformation({
                    ...userInformation,
                    email: e.target.value,
                  })
                }
              />
              <Input
                className="mb-2 ml-1 w-11/12 mx-auto"
                type="password"
                label="Contraseña"
                labelPlacement="outside"
                placeholder="Inserta tu Contraseña"
                isInvalid={
                  checkPasswordComplexity(
                    userInformation.password,
                    userInformation.verifiedPassword
                  ).length != 0 && userInformation.password.length != 0
                }
                color="primary"
                classNames={{ mainWrapper: "mt-4" }}
                onChange={(e) =>
                  setUserInformation({
                    ...userInformation,
                    password: e.target.value,
                  })
                }
              />
              <Input
                className="mb-2 ml-1 w-11/12 mx-auto"
                type="password"
                label="Verificar contraseña"
                labelPlacement="outside"
                placeholder="Verifica tu contraseña"
                isInvalid={
                  checkPasswordComplexity(
                    userInformation.password,
                    userInformation.verifiedPassword
                  ).length != 0 && userInformation.verifiedPassword.length != 0
                }
                classNames={{ mainWrapper: "mt-4" }}
                color="primary"
                onChange={(e) =>
                  setUserInformation({
                    ...userInformation,
                    verifiedPassword: e.target.value,
                  })
                }
              />
              <ul className=" text-xs ml-5 text-red-500">
                {checkPasswordComplexity(
                  userInformation.password,
                  userInformation.verifiedPassword
                ).length != 0 && userInformation.password.length != 0
                  ? checkPasswordComplexity(
                      userInformation.password,
                      userInformation.verifiedPassword
                    ).map((e) => {
                      return <li key={e}>{e}</li>;
                    })
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
                Registrate!
              </Button>
            </div>
          </form>
          <div className=" min-w-[280px] sm:min-w-[382px] w-1/2 lg:w-1/3 flex flex-col justify-center items-center ">
            <Link href="/login" className="mt-2 sm:ml-4">
              Ya tengo cuenta creada!!
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegisterPage;
