import React from 'react'
import Layout from "../components/Layout/Layout";
import {ApolloConsumer, ApolloProvider, Query} from "@apollo/react-components";
import getUser from "../graphql/query/getUser.graphql";
import ApolloClient, {ApolloError} from "apollo-client";
import Login from "./Login";
import initApolloClient from "../lib/apollo";
import withApollo from "../lib/withApollo";
import "../assets/body.less";
import {withClientState} from "apollo-link-state";
import {InMemoryCache} from "apollo-cache-inmemory";
import {createHttpLink} from "apollo-link-http";
import fetch from "isomorphic-unfetch";
import {setContext} from "apollo-link-context";

declare interface GetUserData {
    getUser: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        phone: string;
        validated: boolean;
        company: any;
        customer: any;
    }
}


const App = ({Component, pageProps, apolloClient}: any) => {

    const onErrorHandler = (error: ApolloError) => {
        if (error.graphQLErrors &&
            error.graphQLErrors[0] &&
            error.graphQLErrors[0].extensions &&
            error.graphQLErrors[0].extensions.code === "UNAUTHENTICATED")
            return <div>your session yas expired</div>;
        return <div>error</div>
    };


    // const apolloState = withClientState({
    //     cache: new InMemoryCache(),
        // defaults: {},
        // resolvers: {},
    // });

    // const WithApollo = ({apolloClient, apolloState, ...pageProps}: { apolloClient: any, apolloState: any }) => {
    // const cache = new InMemoryCache();
    // const stateLink = withClientState({
    //     cache,
    //     resolvers: {
    //         Mutation: {
    //             updateNetworkStatus: (_, {isConnected}: { isConnected: any }, {cache}: { cache: any }) => {
    //                 const data = {
    //                     networkStatus: {
    //                         __typename: 'NetworkStatus',
    //                         isConnected
    //                     },
    //                 };
    //                 cache.writeData({data});
    //                 return null;
    //             },
    //         },
    //     }
    // });
    // const testclient = initApolloClient(stateLink);


    // const { Component, pageProps, apolloClient } = this.props;
    return (
        <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />

            {/*<ApolloConsumer>*/}
                     {/*    {client => (*/}
                     {/*        <Query<GetUserData> query={getUser} onError={onErrorHandler}>*/}
                     {/*            {({data}) => {*/}
                     {/*                if (data && data.getUser) {*/}
                     {/*                    return (*/}
                     {/*                        <Layout>*/}
                     {/*                            <Component {...pageProps} />*/}
                     {/*                        </Layout>*/}
                     {/*                    )*/}
                     {/*                }*/}
                     {/*                return (<Login/>)*/}
                     {/*            }}*/}
                     {/*        </Query>*/}
                     {/*   )}*/}
                     {/*</ApolloConsumer>*/}
        </ApolloProvider>
    );

    // return (
    //     // <ApolloProvider client={testclient}>
    //         <ApolloConsumer>
    //             {client => (
    //                 <Query<GetUserData> query={getUser} onError={onErrorHandler}>
    //                     {({data}) => {
    //                         if (data && data.getUser) {
    //                             return (
    //                                 <Layout>
    //                                     <Component {...pageProps} />
    //                                 </Layout>
    //                             )
    //                         }
    //                         return (<Login/>)
    //                     }}
    //                 </Query>
    //             )}
    //         </ApolloConsumer>
    //     // </ApolloProvider>
    // );
};

// const httpLink = createHttpLink({
//     uri: process.env.DB_LINK,
//     fetch: fetch
// });
//
// const authLink = setContext((_, {headers}) => {
//     const token = localStorage.getItem('token');
//     return {
//         headers: {
//             ...headers,
//             authorization: token ? token : "",
//         }
//     };
// });

export default withApollo(App);

// export default withApollo(({ initialState }: {initialState: any}) => {
//     return new ApolloClient({
//         ssrMode: typeof window === 'undefined', // Disables forceFetch on the server (so queries are only run once)
//
//         link: authLink.concat(httpLink),
//         connectToDevTools: true,
//         cache: new InMemoryCache().restore(initialState || {})
//     });
// })(App);