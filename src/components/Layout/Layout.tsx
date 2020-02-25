import * as React from 'react';
import {Layout as AntLayout} from 'antd';
import Header from "./Header";
import Logout from "../Authentication/Logout/Logout";
import Sidebar from "./Sidebar";
import "../../index.less";

const {Content, Sider} = AntLayout;

type LayoutProps = {
    children?: any;
    title?: string;
}

const Layout = (props: LayoutProps) => {
    return (
        <AntLayout style={{background: "white"}}>
            <Header/>
            <AntLayout hasSider>
                <Sider width={"20%"} theme={"light"}
                       collapsible
                       style={{
                           height: "90vh"
                       }}

                >
                    <Sidebar/>
                    <Logout isMenu/>
                </Sider>
                <Content style={{
                    background: "F6F8FA",
                    padding: 24
                }}>
                    {props.children}
                </Content>
            </AntLayout>
        </AntLayout>
    )
};

export default Layout
