import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';

import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import Header from '../components/Header';
import Footer from '../components/Footer';

const { Content } = Layout;
const App = () => (
  <Layout style={{ height: '100vh' }}>
    <Header />
    <Content
      style={{
        display: 'flex',
        justifyContent: 'center',
        // alignItems: 'center',
      }}
    >
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Content>
    <Footer />
  </Layout>
);
export default App;
