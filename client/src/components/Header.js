import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import { Layout } from 'antd';

const { Header: HeaderWrapper } = Layout;
const Header = () => (
  <HeaderWrapper>
    <Link to="/">
      <h1> TheQ. </h1>
    </Link>
  </HeaderWrapper>
);

export default withRouter(Header);
