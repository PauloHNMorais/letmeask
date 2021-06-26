import { useContext } from "react";
import { ConfigContext } from "../contexts/ConfigContext";

export const useTheme = () => {
  const { theme, toggleTheme } = useContext(ConfigContext);
  return {
    theme,
    toggleTheme,
  };
};
