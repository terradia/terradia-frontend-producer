import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost'
import fetch from 'isomorphic-unfetch'
import {createHttpLink} from "apollo-link-http";
import {setContext} from "apollo-link-context";

let apolloClient: any = null;

function create (initialState: any) {
    // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
    const isBrowser = typeof window !== 'undefined';

    const httpLink = createHttpLink({
        uri: process.env.DB_LINK,
        fetch: fetch
    });

    const authLink = setContext((_, {headers}) => {
        const token = localStorage.getItem('token');
        return {
            headers: {
                ...headers,
                authorization: token ? token : "",
            }
        };
    });
    return new ApolloClient({
        connectToDevTools: isBrowser,
        ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
        link: authLink.concat(httpLink),
        cache: new InMemoryCache().restore(initialState || {})
    })
}

export default function initApollo (initialState: any) {
    // Make sure to create a new client for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if (typeof window !== 'undefined') {
        return create(initialState)
    }

    // Reuse client on the client-side
    if (!apolloClient) {
        apolloClient = create(initialState)
    }

    return apolloClient
}