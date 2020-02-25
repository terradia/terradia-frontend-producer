import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


import {ApolloClient, InMemoryCache} from 'apollo-boost'
import fetch from 'isomorphic-unfetch'
import {createHttpLink} from "apollo-link-http";
import {setContext} from "apollo-link-context";
import {ApolloProvider} from "@apollo/react-common";

const httpLink = createHttpLink({
    uri: "http://localhost:8000/graphql",
    fetch: fetch
});

const authLink = setContext((_, {headers}) => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token ? token : "",
        }
    }
});

const cache = new InMemoryCache({
    cacheRedirects: {
        query: {
            meLocal: (_, {id}, {getChachedKey}) => {
                console.log(id);
                return getChachedKey({
                    __typename: "User", id: id
                })
            }
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: cache,
    connectToDevTools: true
});


ReactDOM.render(<ApolloProvider client={client}><App/> </ApolloProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
