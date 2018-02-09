import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-client-preset";
import { ApolloProvider } from "react-apollo";

import App from "./containers/App";
import registerServiceWorker from "./registerServiceWorker";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:3030/graphql" }),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
registerServiceWorker();
