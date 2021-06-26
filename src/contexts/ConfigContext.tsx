import { createContext, ReactNode, useEffect, useState } from "react";
import { useStickyState } from "../hooks/useStickyState";
import { firebase, auth } from "../services/firebase";

interface IConfigContext {
  theme: Theme;
  toggleTheme: () => void;
  language: Language;
  setLanguage: (language: Language) => void;
}

type Theme = "light" | "dark";
type Language = "pt-br" | "en";

export const ConfigContext = createContext({} as IConfigContext);

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useStickyState("light", "config/theme");
  const [language, setLanguage] = useStickyState("pt-br", "config/");

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  useEffect(() => {
    document.getElementsByTagName("body")[0].className = `theme-${theme}`;
  }, [theme]);

  return (
    <ConfigContext.Provider
      value={{
        theme,
        toggleTheme,
        language,
        setLanguage,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};
