import React from 'react';
import { withRouter, Link } from 'react-router-dom';

const HeaderContent = () => (
  <Link to="/" style={{ textDecoration: 'none' }}>
    <h1> TheQ. </h1>
  </Link>
);

export default withRouter(HeaderContent);
