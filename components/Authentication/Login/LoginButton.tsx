import React from 'react'
import {Mutation} from "@apollo/react-components";
import LoginModal from "./LoginModal";
import ApolloClient from "apollo-boost";
import LoginMutation from "../../../apollo/mutation/login"

declare interface LoginData {
    login: {
        token: string;
        userId: string;
    }
}

declare interface GetUserData {
    getUser: {
        firstName: string;
        lastName: string;
    }
}

declare interface LoginButtonProps {
    client: ApolloClient<object>;
}

declare interface LoginButtonState {
    confirmLoading: boolean,
    modalLogin: boolean,
}

export default class LoginButton extends React.Component<LoginButtonProps, LoginButtonState> {
    OnCompletedHandler = (client: ApolloClient<object>, data: LoginData) => {
        localStorage.setItem('token', data.login.token);
        client.resetStore();
    };

    OnErrorHandler = (data: { message: any; }) => {
        console.log(data.message);
    };

    render() {
        const {client} = this.props;

        return (
            <div>
                <Mutation<LoginData> mutation={LoginMutation} onCompleted={(data) => {
                    this.OnCompletedHandler(client, data)
                }} onError={this.OnErrorHandler}>
                    {(login) => (<LoginModal login={login}/>)}
                </Mutation>
            </div>
        )
    }
};