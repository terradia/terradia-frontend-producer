import * as React from 'react'
import {Layout as AntLayout, Avatar} from 'antd';
import Terradia from "../../public/Terradia.svg"
import CompanySelector from "../Company/CompanySelector";
import Anchor from "./Anchor";
import Logout from "../Authentication/Logout/Logout";

const { Header, Content, Sider, Footer } = AntLayout;

type LayoutProps = {
    children?: any;
    title?: string;
}

const Layout = (props: LayoutProps) => {
    return (
        <AntLayout style={{background: "white"}}>
            <Header
                style={{
                    height: '10vh',
                    background: "white",
                    padding: 0,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <Terradia
                    height={"5vh"}
                    width={"25vh"}
                    style={{
                        marginLeft: '2%',
                    }}
                />
                <div style={{
                    display: "flex",
                    alignItems: "center"
                }}>
                    <Avatar
                        size={"large"}
                        shape={"circle"}
                        alt={"profile"}
                        style={{
                            order: 2,
                            marginRight: "5%",
                            marginLeft: "5%"
                        }}
                    />
                    <div style={{
                        order: 1,
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        justifyContent: "flex-end",
                        flex: 1,
                    }}>
                        <span style={{
                            height: '18px'
                        }}>
                            Victor Heim
                        </span>
                        <CompanySelector/>
                    </div>
                </div>
            </Header>
            <AntLayout hasSider>
                <Sider width={"20%"} theme={"light"} style={{
                    display: "flex",
                    flexDirection: "column",
                    alignContent: "space-between",
                    height: "90vh"
                }}>
                    <Anchor/>
                    <Logout/>
                </Sider>
                <Content style={{
                    background: "F6F8FA",
                    padding: 24
                }}>
                    {props.children}
                </Content>
            </AntLayout>
            <Footer style={{background: "white"}}>

            </Footer>
        </AntLayout>
    )
};

export default Layout
