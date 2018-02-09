import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Layout } from 'antd';

const { Footer: FooterWrapper } = Layout;

const Footer = () => (
  <FooterWrapper
    style={{
      textAlign: 'center',
      background: '#fff',
      flexDirection: 'row',
      display: 'flex',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
    }}
  >
    <Link to="/" style={{ textDecoration: 'none', color: '#000' }}>
      About ASKfm
    </Link>
    <Link to="/" style={{ textDecoration: 'none', color: '#000' }}>
      Safety center
    </Link>
    <Link to="/" style={{ textDecoration: 'none', color: '#000' }}>
      Help
    </Link>
    <Link to="/" style={{ textDecoration: 'none', color: '#000' }}>
      Community Guidelines
    </Link>
    <Link to="/" style={{ textDecoration: 'none', color: '#000' }}>
      Terms of use
    </Link>
    <Link to="/" style={{ textDecoration: 'none', color: '#000' }}>
      Privacy policy
    </Link>
    <Link to="/" style={{ textDecoration: 'none', color: '#000' }}>
      Cookies policy
    </Link>
    <Link to="/" style={{ textDecoration: 'none', color: '#000' }}>
      Advertising
    </Link>
  </FooterWrapper>
);

export default withRouter(Footer);
