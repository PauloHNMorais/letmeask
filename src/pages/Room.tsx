import React, { FormEvent } from "react";
import logoImg from "../assets/images/logo.svg";
import { useRoom } from "../hooks/pages/useRoom";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import "../styles/pages/room.scss";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Loading } from "../components/Loading";
import { QuestionCard } from "../components/QuestionCard";
import { useHistory, useParams } from "react-router-dom";
import { LikeButton, TrashButton } from "../components/ActionButton";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { ThemeButton } from "../components/ThemeButton";

type RoomParams = {
  id: string;
};

export function Room() {
  const [question, setQuestion] = useState("");
  const { user } = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const {
    sendQuestion,
    isRoomOpen,
    questions,
    loadingQuestions,
    roomTitle,
    likeQuestion,
    authorId,
    answerQuestion,
  } = useRoom(roomId);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await sendQuestion(question);
    setQuestion("");
  }

  async function handleExitRoom() {
    if (window.confirm("Tem certeza que deseja sair da sala?")) {
      history.push("/");
    }
  }

  useEffect(() => {
    if (!isRoomOpen) {
      toast.success("Sala encerrada");
      history.push("/");
    }
  }, [isRoomOpen]);

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode>{roomId}</RoomCode>
            <Button mode="outlined" onClick={handleExitRoom}>
              Sair da sala
            </Button>
            <ThemeButton />
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>{roomTitle}</h1>
          {!!questions.length && (
            <span>
              {questions.length}{" "}
              {questions.length > 1 ? "perguntas" : "pergunta"}
            </span>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="O que você quer perguntar?"
          />
          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.photoURL} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta, <button>faça seu login.</button>
              </span>
            )}
            <Button type="submit" disabled={!user}>
              Enviar pergunta
            </Button>
          </div>
        </form>

        {questions.map((question) => (
          <QuestionCard
            {...question}
            key={question.id}
            onLikeClick={() => likeQuestion(question.id, question.likeId)}
            onAnswerConfirm={answerQuestion}
            allowAnswerQuestion={
              authorId === user?.id || question.author.id === user?.id
            }
            isAnswered={question.isAnswered}
          >
            <LikeButton
              likeCount={question.likeCount}
              hasLiked={!!question.likeId}
              onClick={() => likeQuestion(question.id, question.likeId)}
            />
          </QuestionCard>
        ))}

        {loadingQuestions && <Loading label="Buscando perguntas" />}
      </main>
    </div>
  );
}
