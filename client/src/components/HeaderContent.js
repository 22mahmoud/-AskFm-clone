import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Icon } from 'antd';
import { connect } from 'react-redux';

const HeaderContent = ({ isAuth, history }) => {
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
      <h1 style={{ color: '#FF643C', fontWeight: 'bold' }}> TheQ. </h1>
      <div>
        <Icon
          onClick={() => history.push('/feed')}
          type="home"
          style={{ fontSize: 25, cursor: 'pointer', marginLeft: 25 }}
        />
        <Icon
          onClick={() => history.push('/notifications')}
          type="notification"
          style={{ fontSize: 25, cursor: 'pointer', marginLeft: 25 }}
        />
        <Icon
          onClick={() => history.push('/user')}
          type="user"
          style={{ fontSize: 25, cursor: 'pointer', marginLeft: 25 }}
        />
      </div>
    </div>
  );
};

export default withRouter(connect(({ user: { isAuth } }) => ({ isAuth }))(HeaderContent));
