import React from 'react';
import { Button } from 'antd';
import { withRouter } from 'react-router-dom';
import owlCat from '../assets/images/owlcat.gif';

const Home = ({ history }) => (
  <div>
    <img alt="owl cat gif" src={owlCat} />
    <h3>
      Curious? Just ask! <br />Openly or anonymously.
    </h3>
    <div>
      <Button onClick={() => history.push('/signup')}>Sign Up</Button>
      <Button type="primary" onClick={() => history.push('/login')}>
        Login
      </Button>
    </div>
  </div>
);

export default withRouter(Home);
