import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { database } from "../../services/firebase";
import { useAuth } from "../useAuth";

export type Author = {
  id: string;
  name: string;
  photoURL: string;
};

export type Question = {
  id: string;
  author: Author;
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  createdAt: Date;
  likeCount: number;
  likeId: string | undefined;
  answerCount: number;
};

type FirebaseQuestions = Record<
  string,
  {
    id: string;
    author: Author;
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    createdAt: Date;
    likes: Record<
      string,
      {
        authorId: string;
      }
    >;
    answers: Record<
      string,
      {
        author: Author;
        questionId: string;
        content: string;
        createdAt: Date;
      }
    >;
  }
>;

export function useRoom(roomId: string) {
  const { user } = useAuth();
  const [roomTitle, setRoomTitle] = useState("");
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isRoomOpen, setIsRoomOpen] = useState(true);
  const [authorId, setAuthorId] = useState("");

  function sortQuestions(a: Question, b: Question) {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  }

  useEffect(() => {
    setLoadingQuestions(true);
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on("value", (room) => {
      const databaseRoom = room.val();

      if (databaseRoom.closedAt) {
        setIsRoomOpen(false);
      }

      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => ({
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isAnswered,
          isAnswered: value.isAnswered,
          createdAt: value.createdAt,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(
            ([key, like]) => like.authorId === user?.id
          )?.[0],
          answerCount: Object.values(value.answers ?? {}).length,
        })
      );
      setRoomTitle(databaseRoom.title);
      setAuthorId(databaseRoom.authorId);
      setQuestions(parsedQuestions.sort(sortQuestions));
      setLoadingQuestions(false);
    });

    return () => {
      roomRef.off("value");
    };
  }, [roomId, user?.id]);

  async function sendQuestion(question: string) {
    if (!question.trim()) return;

    if (!user) {
      toast.error("Você precisa estar logado");
    }

    const questionObj = {
      content: question,
      author: {
        id: user?.id,
        name: user?.name,
        photoURL: user?.photoURL,
      },
      isHighlighted: false,
      isAnswered: false,
      createdAt: new Date().toISOString(),
    };
    await database.ref(`rooms/${roomId}/questions`).push(questionObj);
  }

  async function likeQuestion(questionId: string, likeId?: string) {
    if (likeId) {
      await database
        .ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`)
        .remove();
    } else {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
        authorId: user?.id,
      });
    }
  }

  async function deleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que deseja excluir esta pergunta?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function endRoom() {
    await database.ref(`rooms/${roomId}`).update({
      closedAt: new Date(),
    });
  }

  function onCloseRoom(callback: () => void) {
    return callback();
  }

  async function answerQuestion(questionId: string, answer: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}/answers`).push({
      content: answer,
      author: {
        id: user?.id,
        name: user?.name,
        photoURL: user?.photoURL,
      },
      createdAt: new Date(),
      questionId,
    });
  }

  return {
    roomTitle,
    sendQuestion,
    loadingQuestions,
    questions,
    likeQuestion,
    deleteQuestion,
    endRoom,
    onCloseRoom,
    isRoomOpen,
    answerQuestion,
    authorId,
  };
}
