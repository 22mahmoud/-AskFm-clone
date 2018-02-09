import React from 'react';
import { Button } from 'antd';
import { withRouter } from 'react-router-dom';

const Home = ({ history }) => (
  <div style={{ marginTop: 100 }}>
    <h3 style={{ textAlign: 'center', marginBottom: 20 }}>
      Curious? Just ask! <br />Openly or anonymously.
    </h3>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: 200,
      }}
    >
      <Button onClick={() => history.push('/signup')} style={{ marginBottom: 8 }} type="primary">
        Sign Up
      </Button>
      <Button onClick={() => history.push('/login')}>Login</Button>
    </div>
  </div>
);

export default withRouter(Home);
