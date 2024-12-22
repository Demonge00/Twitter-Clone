import { useContext, createContext, useState, useEffect } from "react";

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

export function OpacitySetter() {
  const { setOpacity } = ObtainOpacity();
  useEffect(() => {
    const scrollable = document.getElementById("scroll-component");
    const handleScroll = () => {
      const maxScroll = 300;
      const scrollY = scrollable.scrollTop;
      const newOpacity = Math.max(1 - scrollY / maxScroll, 0.4);
      setOpacity(newOpacity);
    };

    scrollable.addEventListener("scroll", handleScroll);

    setOpacity(1);

    return () => {
      scrollable.removeEventListener("scroll", handleScroll);
    };
  }, []);
}
