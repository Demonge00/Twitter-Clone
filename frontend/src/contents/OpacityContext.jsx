import { useContext, createContext, useState } from "react";

const opacityContext = createContext();

export function ObtainOpacity() {
  const context = useContext(opacityContext);
  if (!context) {
    throw new Error("Esta funcion se usa solo con contexts.");
  }
  return context;
}

export function OpacityContext(props) {
  const [opacity, setOpacity] = useState(1);

  return <opacityContext.Provider value={{ opacity, setOpacity }} {...props} />;
}
