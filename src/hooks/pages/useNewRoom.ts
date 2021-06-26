import React from "react";
import { FormEvent } from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { database } from "../../services/firebase";
import { useAuth } from "../useAuth";

export function useNewRoom() {
  const [roomName, setRoomName] = useState("");
  const { user } = useAuth();
  const history = useHistory();

  async function handleCreateRoom(e: FormEvent) {
    e.preventDefault();

    if (!roomName.trim()) return;

    const roomRef = database.ref("rooms");
    const firebaseRoom = await roomRef.push({
      title: roomName.trim(),
      authorId: user?.id,
    });

    history.push(`/admin/rooms/${firebaseRoom.key}`);
  }

  return {
    roomName,
    setRoomName,
    handleCreateRoom,
  };
}
