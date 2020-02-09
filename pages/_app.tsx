import React from 'react'
import {ApolloProvider} from "@apollo/react-components";
import {ApolloError} from "apollo-client";
import withApollo from "../lib/withApollo";
import "../assets/body.less";

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

    if (window) {
        return (
            <ApolloProvider client={apolloClient}>
                <Component {...pageProps} />
            </ApolloProvider>
        );
    } else {
        return (<Component {...pageProps} />)
    }


};

export default withApollo(App);