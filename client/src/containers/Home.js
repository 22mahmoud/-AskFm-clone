import React from 'react';
import { Button, Row, Col } from 'antd';
import { withRouter } from 'react-router-dom';

const Home = ({ history }) => (
  <React.Fragment>
    <Row type="flex" justify="center">
      <Col xs={22} sm={20} md={18} lg={12} xl={12}>
        <h3 style={{ textAlign: 'center', color: '#fff' }}>
          Curious? Just ask! <br />Openly or anonymously.
        </h3>
      </Col>
    </Row>

    <Row type="flex" justify="center">
      <Col xs={18} sm={16} md={8} lg={6} xl={6}>
        <Button style={{ width: '100%', marginBottom: 10 }} onClick={() => history.push('/signup')}>
          Sign Up
        </Button>
        <Button style={{ width: '100%' }} type="primary" onClick={() => history.push('/login')}>
          Login
        </Button>
      </Col>
    </Row>
  </React.Fragment>
);

export default withRouter(Home);
