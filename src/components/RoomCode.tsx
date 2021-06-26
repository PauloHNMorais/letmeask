import React from "react";
import { ReactNode } from "react";
import copyImg from "../assets/images/copy.svg";
import "../styles/components/room-code.scss";

export function RoomCode({ children }: { children: string }) {
  function copyCode() {
    navigator.clipboard.writeText(children);
  }

  return (
    <button className="room-code" onClick={copyCode} title="Copiar código">
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Sala #{children}</span>
    </button>
  );
}
