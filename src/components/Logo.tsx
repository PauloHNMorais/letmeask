import { useTheme } from "../hooks/useTheme";
import logoLight from "../assets/images/logo.svg";
import logoDark from "../assets/images/logo-dark.svg";

export function Logo() {
  const { theme } = useTheme();
  return <img src={theme === "light" ? logoDark : logoLight} alt="letmeask" />;
}
