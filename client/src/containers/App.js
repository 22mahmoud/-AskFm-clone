import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';

import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import HeaderContent from '../components/HeaderContent';
import FooterContent from '../components/FooterContent';

const { Content, Header, Footer } = Layout;
const App = () => (
  <Layout style={{ height: '100vh' }}>
    <Header
      style={{
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <HeaderContent />
    </Header>
    <Content style={{ background: '#fff' }}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Content>
    <Footer>
      <FooterContent />
    </Footer>
  </Layout>
);
export default App;
