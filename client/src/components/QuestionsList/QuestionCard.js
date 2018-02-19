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
    _id, theAsker, theResponder, text, answer, updatedAt, isLiked, likesCount,
  },
}) => (
  <div style={{ background: '#fff', marginBottom: 20, padding: 15 }}>
    <div style={styles.flex}>
      <h2 style={{ paddingRight: 5 }}>{text}</h2>
      <Link to={{ pathname: '/feed' }} style={{ fontSize: 14, alignSelf: 'center' }}>
        {theAsker.username}
      </Link>
    </div>
    <div style={{ ...styles.flex, color: 'rgba(0, 0, 0, 0.7)' }}>
      <Link style={{ paddingRight: 5, color: 'rgba(0, 0, 0, 0.7)' }} to={{ pathname: '/feed' }}>
        {theResponder.username}
      </Link>
      • <p style={{ paddingLeft: 5, fontWeight: 'light' }}> about {moment(updatedAt).fromNow()} </p>
    </div>
    <p> {answer} </p>
    <LikeButton id={_id} likesCount={likesCount} isLiked={isLiked} />
  </div>
);

export default QuestionCard;
