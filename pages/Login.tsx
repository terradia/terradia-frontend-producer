import '../assets/loginPage.less';
import Terradia from "../public/WhiteLogo.svg"

import React from "react";
import {Divider, Icon} from "antd";
// import withApollo from "../lib/apollo";
import getUserQuery from '../graphql/query/getUser.graphql'
import ApolloClient, {ApolloError} from "apollo-client";
import {useApolloClient, useQuery} from "@apollo/react-hooks";
import LoginForm from "../components/Authentication/Login/LoginForm";

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

declare interface LoginData {
    login: {
        token: string;
        userId: string;
    }
}


const Login = () => {
    const onErrorHandler = (error: ApolloError) => {
        if (error.graphQLErrors &&
            error.graphQLErrors[0] &&
            error.graphQLErrors[0].extensions &&
            error.graphQLErrors[0].extensions.code === "UNAUTHENTICATED")
            return <div>your session yas expired</div>;
        return <div>error</div>
    };

    const OnCompletedHandler = (client: ApolloClient<object>, data: LoginData) => {
        localStorage.setItem('token', data.login.token);
        client.resetStore();
    };

    const OnLoginErrorHandler = (data: { message: any; }) => {
        console.log('data', data);
        console.log(data.message);
    };

    const client = useApolloClient();

    const {loading, error, data} = useQuery(getUserQuery, {
        variables: {language: 'english'},
    });

    return (
        <div className={'loginPage'}>
            <div className={"left"}>
                <Terradia
                    className={'logo'}
                />
                <Divider className={'login-divier'}/>
                <p className={"description"}> L’application qui facilite l’accès aux producteurs</p>
            </div>
            <div className={'right'}>
                <div className={'inputBox'}>
                    {
                        loading && <Icon type={"loading"}/>
                    }
                    {
                        !loading && <LoginForm client={client} data={data}/>
                    }

                </div>
            </div>
        </div>
    )
};

export default Login;
// export default withApollo(Login);