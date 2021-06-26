import React from "react";
import { Answer } from "../hooks/components/useAnswer";
import "../styles/components/answer-card.scss";

interface IProps extends Answer {
  onDeleteClick?: () => void;
  allowDeleteAnswer?: boolean;
}

export function AnswerCard(props: IProps) {
  return (
    <div id="answer-container">
      <span>{props.content}</span>
      <footer>
        <div>
          <img src={props.author.photoURL} alt="" />
          <span>{props.author.name}</span>
        </div>
        <div>
          {props.allowDeleteAnswer && (
            <button type="button" onClick={props.onDeleteClick}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 5.99988H5H21"
                  stroke="#737380"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z"
                  stroke="#737380"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}
