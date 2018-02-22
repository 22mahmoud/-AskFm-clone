import React from 'react';
import { Switch } from 'react-router-dom';
import { Layout } from 'antd';

import Route from '../helpers/Route';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import Feed from './Feed';
import Profile from './Profile';
import AnswerQuestion from '../containers/AnswerQuestion';
import Notifications from './Notifications';
import HeaderContent from '../components/HeaderContent';
import FooterContent from '../components/FooterContent';

const { Content, Header, Footer } = Layout;
const App = () => (
  <Layout style={{ minHeight: '100vh' }}>
    <Header
      style={{
        position: 'fixed',
        width: '100%',
        zIndex: 1000,
        background: '#2b3237',
        color: '#FF643C',
        borderBottom: '.2px solid #1c1d1e ',
      }}
    >
      <HeaderContent />
    </Header>
    <Content style={{ margin: '5em 0' }}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route privateRoute exact path="/feed" component={Feed} />
        <Route privateRoute exact path="/notifications" component={Notifications} />
        <Route privateRoute exact path="/q/:id" component={AnswerQuestion} />
        <Route privateRoute exact path="/u/:username" component={Profile} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Content>
    <Footer style={{ background: '#fff' }}>
      <FooterContent />
    </Footer>
  </Layout>
);
export default App;
