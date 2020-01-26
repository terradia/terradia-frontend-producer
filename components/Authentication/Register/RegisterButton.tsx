import React from 'react'
import {Mutation} from "@apollo/react-components";
import RegisterModal from "./RegisterModal";
import RegisterMutation from '../../../apollo/mutation/register'

declare interface RegisterButtonProps {
}

declare interface RegisterButtonState {
    confirmLoading: boolean,
    modalLogin: boolean,
}

declare interface RegisterData {
    register: {
        firstname: string;
        lastname: string;
        password: string;
        email: string;
        phone: string;
    }
}

export default class RegisterButton extends React.Component<RegisterButtonProps, RegisterButtonState> {
    OnCompletedHandler = (data: RegisterData) => {
        console.log(data);
    };

    OnErrorHandler = (data: { message: any; }) => {
        console.log(data.message);
    };

    render() {

            return (
                <div>
                    <Mutation<RegisterData> mutation={RegisterMutation} onCompleted={(data) => {
                        this.OnCompletedHandler(data)
                    }} onError={this.OnErrorHandler}>
                        {(register) => (<RegisterModal register={register}/>)
                        }
                    </Mutation>
                </div>
            )
    }
};