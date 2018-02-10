import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import { StyleRoot } from 'radium';

import 'antd/dist/antd.css';

import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:3030/graphql' }),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <StyleRoot>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </StyleRoot>,
  document.getElementById('root'),
);
registerServiceWorker();
