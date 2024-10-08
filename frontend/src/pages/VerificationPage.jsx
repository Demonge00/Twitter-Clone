import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { ValidateUser } from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

function VerificationPage() {
  const navigate = useNavigate();
  const params = useParams();
  const { mutate: registrarse, isSuccess } = useMutation({
    mutationFn: (data) => ValidateUser(data),
  });
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      registrarse({
        url: params.userSecret,
      });
    }
  }, [isSuccess, navigate, params.userSecret, registrarse]);
  return (
    <div
      className={
        " w-screen h-screen flex flex-col justify-center items-center text-"
      }
    >
      {isSuccess ? (
        <h1 className="text-center text-blue-500  flex flex-col gap-2 text-2xl">
          Se ha registrado correctamente!
          <br />
        </h1>
      ) : (
        <h1 className="text-center text-blue-500 gap-2 pt-4 ">
          Ha ocurrido un error. Intentelo de nuevo
        </h1>
      )}
    </div>
  );
}

export default VerificationPage;
