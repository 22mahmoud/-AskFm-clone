import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Icon, Badge, Menu, Dropdown } from 'antd';
import { connect } from 'react-redux';
import { logOut } from '../actions';

function handleMenuClick({ e, history, logOut: logout }) {
  const { key } = e;

  switch (key) {
    case '0':
      history.push('/settings');
      break;
    case '1':
      logout();
      history.push('/');
      break;
    default:
      break;
  }
}

const HeaderContent = ({
  isAuth, user, history, location: { pathname }, logOut,
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
        <Badge
          count={10}
          onClick={() => history.push('/notifications')}
          style={{
            cursor: 'pointer',
            backgroundColor: '#fff',
            color: '#999',
            boxShadow: '0 0 0 1px #d9d9d9 inset',
          }}
        >
          <Icon
            onClick={() => history.push('/notifications')}
            type="notification"
            style={{
              fontSize: 25,
              cursor: 'pointer',
              marginLeft: 25,
              color: pathname === '/notifications' ? '#FF643C' : 'rgba(255,255,255,0.5)',
            }}
          />
        </Badge>
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
        <Dropdown
          overlay={
            <Menu onClick={e => handleMenuClick({ e, history, logOut })}>
              <Menu.Item key="0">Settings</Menu.Item>
              <Menu.Item key="1">logout</Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <a href="#">
            <Icon
              type="setting"
              style={{
                fontSize: 25,
                cursor: 'pointer',
                marginLeft: 25,
              }}
            />
            <Icon
              type="down"
              style={{
                fontSize: 10,
                cursor: 'pointer',
              }}
            />
          </a>
        </Dropdown>
      </div>
    </div>
  );
};

const HC = withRouter(connect(({ user: { isAuth, user } }) => ({ isAuth, user }), { logOut })(HeaderContent));
export default HC;
