import React from 'react'
//import {useApolloClient} from "@apollo/react-hooks";
import {ReactComponent as LogoutIcon} from "../../../../assets/Logout.svg"
import {Icon, Menu} from "antd";

const textStyle = {
    marginLeft: "5%",
    fontFamily: "Montserrat",
    fontWeight: 600,
    fontSize: "larger",
    color: "#BBBBBB"
};

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
        <Menu mode={"inline"}>
            <Menu.Item style={{
                display: "flex",
                alignContent: "center"
            }}>
                <Icon component={() => <LogoutIcon height={'25px'} width={'25px'}/>}/>
                <span style={textStyle}>
                    Se déconnecter
                </span>
            </Menu.Item>

        </Menu>
    )
};

export default Logout;