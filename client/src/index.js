import React from 'react';
import ReactDOM from 'react-dom';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { getMainDefinition } from 'apollo-utilities';

import { ApolloClient, InMemoryCache } from 'apollo-client-preset';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import 'antd/dist/antd.css';
import App from './containers/App';
import store from './store';
import registerServiceWorker from './registerServiceWorker';
import { login } from './actions';

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:3030/subscriptions',
  options: {
    reconnect: true,
  },
});

const httpLink = createHttpLink({
  uri: 'http://localhost:3030/graphql',
});

const isToken = localStorage.getItem('token');
if (isToken) {
  store.dispatch(login());
}

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token || null,
    },
  };
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  authLink.concat(httpLink),
);

const client = new ApolloClient({
  link,
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
