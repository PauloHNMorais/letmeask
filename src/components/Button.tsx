import React, { ButtonHTMLAttributes } from "react";
import "../styles/components/button.scss";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  mode?: "contained" | "outlined";
}

export function Button({
  children,
  mode = "contained",
  disabled,
  ...rest
}: IProps) {
  return (
    <button
      className={`button ${mode}`}
      disabled={disabled || rest.loading}
      {...rest}
    >
      {children}
      {rest.loading && <div className="loading"></div>}
    </button>
  );
}
