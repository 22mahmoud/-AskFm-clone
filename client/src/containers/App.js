import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Radium from 'radium';

import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import Header from '../components/Header';
import Footer from '../components/Footer';
import bg from '../assets/images/bg.png';

const styles = {
  content: {
    display: 'flex',
    justifyContent: 'center',

    color: '#fff',
    background: `url(${bg}) no-repeat bottom, #2b3237`,
    backgroundSize: '1400px',
  },
};

const { Content } = Layout;
const App = () => (
  <Layout style={{ height: '100vh' }}>
    <Header />
    <Content style={styles.content}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Content>
    <Footer />
  </Layout>
);
export default Radium(App);
