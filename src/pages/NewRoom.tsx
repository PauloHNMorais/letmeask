import React, { FormEvent } from "react";
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";

import "../styles/pages/auth.scss";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useNewRoom } from "../hooks/pages/useNewRoom";
import { Logo } from "../components/Logo";

export function NewRoom() {
  const { user } = useAuth();
  const { roomName, setRoomName, handleCreateRoom } = useNewRoom();

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire as dúvidas de sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <Logo />
          <h1>{user?.name}</h1>
          <h2>Criar uma nova sala</h2>
          <form action="" onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
            <Button type="submit">Criar nova sala</Button>
            <p>
              Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
