import React from 'react';
import { Button } from 'antd';
import { withRouter } from 'react-router-dom';
import Radium from 'radium';
import owlCat from '../assets/images/owlcat.gif';

const styles = {
  container: {
    alignSelf: 'center',
    textAlign: 'center',
  },
  h3: {
    textAlign: 'center',
    color: '#fff',
  },
  space: {
    marginBottom: '10px',
  },
  catGif: {
    marginBottom: '10px',
    width: '50px',
  },
};

const Home = ({ history }) => (
  <div style={styles.container}>
    <img alt="owl cat gif" src={owlCat} style={styles.catGif} />
    <h3 style={styles.h3}>
      Curious? Just ask! <br />Openly or anonymously.
    </h3>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Button style={styles.space} onClick={() => history.push('/signup')}>
        Sign Up
      </Button>
      <Button type="primary" onClick={() => history.push('/login')}>
        Login
      </Button>
    </div>
  </div>
);

export default withRouter(Radium(Home));
