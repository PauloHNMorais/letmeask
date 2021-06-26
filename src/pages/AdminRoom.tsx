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
import {
  LikeButton,
  TrashButton,
  AnswerButton,
} from "../components/ActionButton";
import { ThemeButton } from "../components/ThemeButton";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const [question, setQuestion] = useState("");
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const {
    sendQuestion,
    questions,
    loadingQuestions,
    roomTitle,
    deleteQuestion,
    endRoom,
    answerQuestion,
    likeQuestion,
  } = useRoom(roomId);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await sendQuestion(question);
    setQuestion("");
  }

  async function handleEndRoom() {
    if (window.confirm("Tem certeza que deseja encerrar a sala?")) {
      await endRoom();
      history.push("/");
    }
  }

  async function handleAnswerClick(id: string) {}

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode>{roomId}</RoomCode>
            <Button mode="outlined" onClick={handleEndRoom}>
              Encerrar sala
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

        {questions.map((question) => (
          <QuestionCard
            key={question.id}
            author={question.author}
            content={question.content}
            answerCount={question.answerCount}
            id={question.id}
            likeCount={question.likeCount}
            likeId={question.likeId}
            onAnswerConfirm={answerQuestion}
            onLikeClick={() => likeQuestion(question.id, question.likeId)}
            allowAnswerQuestion
          >
            <AnswerButton answerCount={question.answerCount} />
            <TrashButton onClick={() => deleteQuestion(question.id)} />
          </QuestionCard>
        ))}

        {!questions.length && !loadingQuestions && (
          <div className="no-questions">
            <svg
              width="150"
              height="150"
              viewBox="0 0 150 150"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle opacity="0.1" cx="75" cy="75" r="75" fill="#835AFD" />
              <path
                d="M9 29.7229V62.7836V65.145C9 67.7534 11.1145 69.868 13.7229 69.868H44.4221L57.0363 81.5118C57.883 82.2934 59.2331 81.5235 58.9917 80.3968L56.2295 67.5065H64.4946C67.103 67.5065 69.2175 65.392 69.2175 62.7836V29.7229C69.2175 27.1145 67.103 25 64.4946 25H13.7229C11.1145 25 9 27.1145 9 29.7229Z"
                fill="#835AFD"
              />
              <path
                d="M149.218 57.7229V90.7836V93.145C149.218 95.7534 147.103 97.868 144.495 97.868H113.795L101.181 109.512C100.335 110.293 98.9844 109.524 99.2259 108.397L101.988 95.5065H93.7229C91.1145 95.5065 89 93.392 89 90.7836V57.7229C89 55.1145 91.1145 53 93.7229 53H144.495C147.103 53 149.218 55.1145 149.218 57.7229Z"
                fill="#E559F9"
              />
              <path
                d="M42 101.41V118.281V119.486C42 120.817 43.0886 121.896 44.4314 121.896H60.2353L66.7291 127.838C67.1649 128.237 67.86 127.844 67.7357 127.269L66.3137 120.691H70.5686C71.9114 120.691 73 119.612 73 118.281V101.41C73 100.079 71.9114 99 70.5686 99H44.4314C43.0886 99 42 100.079 42 101.41Z"
                fill="#D67EE2"
              />
              <circle cx="25.5" cy="46.5" r="3.5" fill="#FEFEFE" />
              <circle cx="38.5" cy="46.5" r="3.5" fill="#FEFEFE" />
              <circle cx="51.5" cy="46.5" r="3.5" fill="#FEFEFE" />
            </svg>

            <h3>Nenhuma pergunta por aqui...</h3>
            <span>
              Envie o código desta sala para seus amigos e comece a responder
              perguntas!
            </span>
          </div>
        )}

        {loadingQuestions && <Loading label="Buscando perguntas" />}
      </main>
    </div>
  );
}
