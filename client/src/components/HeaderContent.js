import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Icon } from 'antd';
import { connect } from 'react-redux';

const HeaderContent = ({
  isAuth, user, history, location: { pathname },
}) => {
  if (!isAuth) {
    return (
      <Link to="/" style={{ textDecoration: 'none', textAlign: 'center' }}>
        <h1 style={{ color: '#FF643C', fontWeight: 'bold' }}> TheQ. </h1>
      </Link>
    );
  }

  return (
    <div
      style={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
      }}
    >
      <Link to="/" style={{ textDecoration: 'none', textAlign: 'center' }}>
        <h1 style={{ color: '#FF643C', fontWeight: 'bold' }}> TheQ. </h1>
      </Link>
      <div>
        <Icon
          onClick={() => history.push('/feed')}
          type="home"
          style={{
            fontSize: 25,
            cursor: 'pointer',
            marginLeft: 25,
            color: pathname === '/feed' || 'rgba(255,255,255,0.5)',
          }}
        />
        <Icon
          onClick={() => history.push('/notifications')}
          type="notification"
          style={{
            fontSize: 25,
            cursor: 'pointer',
            marginLeft: 25,
            color: pathname === '/notifications' || 'rgba(255,255,255,0.5)',
          }}
        />
        <Icon
          onClick={() => history.push(`/u/${user.username}`)}
          type="user"
          style={{
            fontSize: 25,
            cursor: 'pointer',
            marginLeft: 25,
            color: pathname === '/user' || 'rgba(255,255,255,0.5)',
          }}
        />
      </div>
    </div>
  );
};

export default withRouter(connect(({ user: { isAuth, user } }) => ({ isAuth, user }))(HeaderContent));
