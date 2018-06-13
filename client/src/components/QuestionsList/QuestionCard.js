import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import LikeButton from './LikeButton';

const styles = {
  flex: {
    display: 'flex',
    flexDirection: 'row',
  },
};

const QuestionCard = ({
  question: {
    _id, theAsker, theResponder, text, answer, answerDate, isLiked, likesCount,
  },
}) => (
  <div style={{ background: '#fff', marginBottom: 10, padding: 15, textAlign: 'left' }}>
    <div style={styles.flex}>
      <h2 style={{ paddingRight: 5 }}>{text}</h2>
      <Link
        to={{ pathname: `/u/${theAsker.username}` }}
        style={{ fontSize: 14, alignSelf: 'center' }}
      >
        {theAsker.username}
      </Link>
    </div>
    <div style={{ ...styles.flex, color: 'rgba(0, 0, 0, 0.7)' }}>
      <Link
        style={{ paddingRight: 5, color: 'rgba(0, 0, 0, 0.7)' }}
        to={{ pathname: `/u/${theResponder.username}` }}
      >
        {theResponder.username}
      </Link>
      •
      <p style={{ paddingLeft: 5, fontWeight: 'light' }}> about {moment(answerDate).fromNow()} </p>
    </div>
    <p style={{ color: '#000' }}> {answer} </p>
    <LikeButton id={_id} likesCount={likesCount} isLiked={isLiked} />
  </div>
);

export default QuestionCard;
