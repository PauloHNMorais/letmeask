import React, { useState } from "react";
import { FormEvent } from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router";
import { database } from "../../services/firebase";
import { useAuth } from "../useAuth";

import moment from "moment";

export function useHome() {
  const { signInWithGoogle } = useAuth();
  const history = useHistory();
  const [roomCode, setRoomCode] = useState("");

  async function handleCreateRoom() {
    await signInWithGoogle();
    history.push("/rooms/new");
  }

  async function handleJoinRoom(e: FormEvent) {
    e.preventDefault();

    if (!roomCode.trim()) return;
    const roomRef = await database.ref(`rooms/${roomCode.trim()}`).get();

    if (!roomRef.exists()) {
      toast.error("Esta sala não existe");
      return;
    }

    if (roomRef.val().closedAt) {
      const time = moment(roomRef.val().closedAt).fromNow();
      toast.error(`Esta sala foi fechada ${time}`);
      return;
    }

    history.push(`/rooms/${roomCode.trim()}`);
  }

  return {
    roomCode,
    setRoomCode,
    handleCreateRoom,
    handleJoinRoom,
  };
}
