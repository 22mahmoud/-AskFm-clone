import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import 'antd/dist/antd.css';

import App from './containers/App';
import store from './store';
import registerServiceWorker from './registerServiceWorker';
import { login } from './actions';

const token = localStorage.getItem('token');
if (token) {
  store.dispatch(login());
}

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:3030/graphql' }),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.querySelector('#root'),
);
registerServiceWorker();
