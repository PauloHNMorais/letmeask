import React, { ReactNode, useState } from "react";
import { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { useAnswer } from "../hooks/components/useAnswer";
import { Author, Question } from "../hooks/pages/useRoom";
import "../styles/components/question-card.scss";
import { AnswerButton, TrashButton, LikeButton } from "./ActionButton";
import { Button } from "./Button";
import { AnswerCard } from "./AnswerCard";

type RoomParams = {
  id: string;
};

interface IProps {
  id: string;
  children?: ReactNode;
  author: Author;
  content: string;
  answerCount: number;
  likeId?: string;
  likeCount: number;
  allowAnswerQuestion?: boolean;
  onAnswerConfirm?: (id: string, answer: string) => Promise<void>;
  onTrashClick?: (id: string) => void;
  onLikeClick?: (id: string) => void;
}

export function QuestionCard({
  author: { name, photoURL },
  id: questionId,
  content,
  likeCount,
  likeId,
  onTrashClick,
  onAnswerConfirm,
  onLikeClick,
  answerCount,
  allowAnswerQuestion = false,
  children,
}: IProps) {
  const [answerMode, setAnswerMode] = useState(false);
  const toggleAnswerMode = () => setAnswerMode(!answerMode);
  const [answer, setAnswer] = useState("");
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { answers } = useAnswer(roomId, questionId);

  function handleSubmitAnswer(e: FormEvent) {
    e.preventDefault();
    onAnswerConfirm?.(questionId, answer.trim());
    setAnswer("");
  }

  return (
    <div id="question-card">
      <p>{content}</p>
      <div>
        <div>
          <img src={photoURL} />
          <span>{name}</span>
        </div>
        <div className="actions">
          {!!onAnswerConfirm && (
            <AnswerButton
              answerCount={answerCount}
              onClick={toggleAnswerMode}
            />
          )}
          {!!onTrashClick && (
            <TrashButton onClick={() => onTrashClick(questionId)} />
          )}
          {!!onLikeClick && (
            <LikeButton
              likeCount={likeCount}
              hasLiked={!!likeId}
              onClick={() => onLikeClick(questionId)}
            />
          )}
        </div>
      </div>
      {answerMode && (
        <footer>
          <hr />

          {answers.length === 0 && (
            <span className="no-answers">Nenhuma resposta ainda...</span>
          )}

          {answers.map((answer) => (
            <AnswerCard {...answer} />
          ))}

          {allowAnswerQuestion && (
            <form onSubmit={handleSubmitAnswer}>
              <textarea
                rows={1}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Digite sua resposta"
              />
              <Button disabled={!answer.trim()} type="submit">
                Responder
              </Button>
            </form>
          )}
        </footer>
      )}
    </div>
  );
}
