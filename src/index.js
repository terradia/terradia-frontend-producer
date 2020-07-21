import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import fetch from "isomorphic-unfetch";
import { setContext } from "apollo-link-context";
import { ApolloProvider } from "@apollo/react-common";
import "./index.less";
import { createUploadLink } from "apollo-upload-client";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import i18n from "./i18n";

const httpLink = createUploadLink({
  // uri: "https://api.terradia.eu/graphql",
  uri: "http://localhost:8000/graphql",
  fetch: fetch,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    },
  };
});

const cache = new InMemoryCache({
  cacheRedirects: {
    query: {
      meLocal: (_, { id }, { getChachedKey }) => {
        return getChachedKey({
          __typename: "User",
          id: id,
        });
      },
    },
  },
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: cache,
  connectToDevTools: true,
});

ReactDOM.render(
    //<Suspense fallback="Loading...">
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>,
    //</Suspense>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
