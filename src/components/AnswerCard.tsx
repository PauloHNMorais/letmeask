import React from "react";
import { Answer } from "../hooks/components/useAnswer";
import "../styles/components/answer-card.scss";

export function AnswerCard(props: Answer) {
  return (
    <div id="answer-container">
      <span>{props.content}</span>
      <footer>
        <img src={props.author.photoURL} alt="" />
        <span>{props.author.name}</span>
      </footer>
    </div>
  );
}
