import { useContext } from "react";
import { ConfigContext } from "../contexts/ConfigContext";

export const useLanguage = () => {
  const { language, setLanguage } = useContext(ConfigContext);
  return {
    language,
    setLanguage,
  };
};
