import { faFeather } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@nextui-org/input";
import { Button, Link } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { checkEmailComplex, checkPasswordComplexity } from "../utils";

function RegisterPage() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifiedPassword, setVerifiedPassword] = useState("");
  const buttonEnabled =
    user &&
    checkEmailComplex(email) &&
    checkPasswordComplexity(password, verifiedPassword).length == 0;
  useEffect(() => {
    console.log(buttonEnabled);
  }, [buttonEnabled]);
  return (
    <div
      className={
        " w-screen h-screen flex flex-col justify-center items-center text-"
      }
    >
      <form className=" min-w-[280px] sm:min-w-[382px] w-1/2 lg:w-1/3 min-h-60 border rounded flex flex-col gap-2 bg-gray-50 ">
        <FontAwesomeIcon icon={faFeather} className="text-blue-500 h-8 mt-2" />
        <div>
          <Input
            className="mb-2 ml-1 w-11/12 mx-auto"
            type="text"
            label="Usuario"
            labelPlacement="outside"
            placeholder="Inserta tu nombre de Usuario"
            color="primary"
            onChange={(e) => setUser(e.target.value)}
          />
          <Input
            className="mb-2 ml-1 w-11/12 mx-auto"
            type="email"
            label="Email"
            labelPlacement="outside"
            placeholder="Inserta tu Email"
            isInvalid={!checkEmailComplex(email) && email != ""}
            errorMessage="Entre una dirección válida de email"
            classNames={{ mainWrapper: "mt-4" }}
            color="primary"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            className="mb-2 ml-1 w-11/12 mx-auto"
            type="password"
            label="Contraseña"
            labelPlacement="outside"
            placeholder="Inserta tu Contraseña"
            isInvalid={
              checkPasswordComplexity(password, verifiedPassword).length != 0 &&
              password.length != 0
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
              checkPasswordComplexity(password, verifiedPassword).length != 0 &&
              verifiedPassword.length != 0
            }
            classNames={{ mainWrapper: "mt-4" }}
            color="primary"
            onChange={(e) => setVerifiedPassword(e.target.value)}
          />
          <ul className=" text-xs ml-5 text-red-500">
            {checkPasswordComplexity(password, verifiedPassword).length != 0 &&
            password.length != 0
              ? checkPasswordComplexity(password, verifiedPassword).map((e) => {
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
          >
            Logueate
          </Button>
        </div>
      </form>
      <div className=" min-w-[280px] sm:min-w-[382px] w-1/2 lg:w-1/3 flex flex-col justify-center items-center ">
        <Link href="/login" className="mt-2 sm:ml-4">
          Ya tengo cuenta creada!!
        </Link>
      </div>
    </div>
  );
}

export default RegisterPage;
