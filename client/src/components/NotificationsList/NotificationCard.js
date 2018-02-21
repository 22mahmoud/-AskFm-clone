import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import AnswerQuestion from '../AnswerQuestion';

const NotificationCard = ({
  id, username, createdAt, userId, text,
}) => (
  <div style={{ cursor: 'pointer', borderBottom: '1px solid #b2b2bb', marginBottom: 15 }}>
    <Link to={{ pathname: `/q/${id}` }} style={{ color: '#000' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          alignContent: 'center',
        }}
      >
        <h3 style={{ marginRight: 10, color: '#FF643C' }}>{username}</h3>
        <p>
          asked you: <span style={{ fontWeight: 'bold' }}> "{text}" </span>
        </p>
      </div>
      <p style={{ color: 'rgba(0, 0, 0, .5)' }}> {moment(createdAt).fromNow()} </p>
    </Link>
  </div>
);

export default NotificationCard;
