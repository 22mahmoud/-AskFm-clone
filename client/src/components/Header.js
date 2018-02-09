import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import Radium from 'radium';

import { Layout } from 'antd';

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    background: '#fff',
    ':hover:': {
      opacity: 0.2,
    },
  },
};

const { Header: HeaderWrapper } = Layout;
const Header = () => (
  <HeaderWrapper style={styles.header}>
    <Link to="/" style={{ textDecoration: 'none' }}>
      <h1 style={{ color: '#000' }}> TheQ. </h1>
    </Link>
  </HeaderWrapper>
);

export default withRouter(Radium(Header));
