import React from 'react';

const QuestionCard = ({ question }) => (
  <div>
    <h2 style={{ color: '#fff' }}>
      {question.text} <span style={{ fontSize: 14 }}> {question.theAsker.username} </span>{' '}
    </h2>
    <p> {question.theResponder.username} </p>
    <p> {question.answer} </p>
  </div>
);

export default QuestionCard;
