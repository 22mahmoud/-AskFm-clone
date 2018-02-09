import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';

import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';

const { Header, Content } = Layout;
const App = () => (
  <Layout style={{ height: '100vh' }}>
    <Header>Header</Header>
    <Content>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    </Content>
  </Layout>
);
export default App;
