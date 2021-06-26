import React from "react";
import "../styles/components/loading.scss";

interface IProps {
  label: string;
  className?: string;
}

export function Loading(props: IProps) {
  return (
    <div className="loading-container">
      <span>{props.label}</span>
      <div className="loader"></div>
    </div>
  );
}
