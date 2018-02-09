import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Layout } from 'antd';

const { Header: HeaderWrapper } = Layout;

const Header = () => (
  <HeaderWrapper
    style={{
      color: '#ee4c22',
      textAlign: 'center',
      background: '#fff',
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    <Link to="/" style={{ textDecoration: 'none' }}>
      <h1 style={{ color: '#C6304A' }}> AskMe </h1>;
    </Link>
  </HeaderWrapper>
);

export default withRouter(Header);
