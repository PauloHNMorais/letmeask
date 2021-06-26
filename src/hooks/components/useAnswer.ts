import { useState } from "react";
import { useEffect } from "react";
import { database } from "../../services/firebase";
import { Author } from "../pages/useRoom";
import { useAuth } from "../useAuth";

export type Answer = {
  id: string;
  content: string;
  author: Author;
  questionId: string;
  createdAt: Date;
};

type FirebaseAnswers = Record<
  string,
  {
    id: string;
    author: Author;
    questionId: string;
    content: string;
    createdAt: Date;
  }
>;

export function useAnswer(roomId: string, questionId: string) {
  const { user } = useAuth();
  const [answers, setAnswers] = useState<Answer[]>([]);

  function sortAnswers(a: Answer, b: Answer) {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  }

  useEffect(() => {
    const questionRef = database.ref(`rooms/${roomId}/questions/${questionId}`);

    questionRef.on("value", (question) => {
      const databaseQuestion = question.val();

      if (databaseQuestion) {
        const firebaseAnswers: FirebaseAnswers = databaseQuestion.answers ?? {};
        const parsedAnswers = Object.entries(firebaseAnswers).map(
          ([key, value]) => ({
            id: key,
            content: value.content,
            author: value.author,
            questionId: value.questionId,
            createdAt: value.createdAt,
          })
        );

        setAnswers(parsedAnswers.sort(sortAnswers));
      }
    });

    return () => {
      questionRef.off("value");
    };
  }, [roomId, user?.id]);

  async function deleteAnswer(answerId: string) {
    await database
      .ref(`rooms/${roomId}/questions/${questionId}/answers/${answerId}`)
      .remove();
  }

  return {
    answers,
    deleteAnswer,
  };
}
