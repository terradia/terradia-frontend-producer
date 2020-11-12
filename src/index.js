import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import fetch from "isomorphic-unfetch";
import {ApolloProvider, InMemoryCache, ApolloClient, from} from "@apollo/client"
import { onError } from "@apollo/client/link/error"
import { setContext } from "@apollo/client/link/context";
import "./index.less";
import { createUploadLink } from "apollo-upload-client";
import { notification } from "antd";

const httpLink = createUploadLink({
  //uri: "https://api.terradia.eu/graphql",
  // uri: "http://368c4db688e3.ngrok.io/graphql",
  uri: "http://localhost:8000/graphql",
  fetch: fetch,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      notification.error({
        message: message
      })
    );
  }
  if (networkError) {
    console.log(networkError.message);
    if (networkError.message === "Failed to fetch") {
      notification.error({
        message: "Failed to connect to the server, check your connectivity", // TODO translate
      });
    }
  }
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
      meLocal: (_, { id }, { getCachedKey }) => {
        return getCachedKey({
          __typename: "User",
          id: id,
        });
      },
    },
  },
});

const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
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
