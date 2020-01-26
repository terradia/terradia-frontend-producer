import React from 'react'
//import {useApolloClient} from "@apollo/react-hooks";
import LogoutIcon from "../../../public/Logout.svg"

const Logout = (/*props: LogoutProps*/) => {
    /*const client = useApolloClient();

    const onLogoutHandler = () => {
        localStorage.removeItem('token');
        if (props.visible) {
            props.visible(false);
        }
        client.resetStore();
        return null;
    };*/

    return (
        <LogoutIcon>
            Se déconnecter
        </LogoutIcon>
    )
}

export default Logout;