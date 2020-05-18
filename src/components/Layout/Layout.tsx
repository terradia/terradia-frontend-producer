import * as React from "react";
import { Layout as AntLayout } from "antd";
import Header from "./Header";
import Sidebar from "./Sidebar/Sidebar";
import "../../assets/Style/Layout/layout.less";
import { useContext } from "react";
import Breakpoint, { sm } from "../Context/Breakpoint";
import { Redirect } from "react-router";

const { Content, Sider } = AntLayout;

type LayoutProps = {
  children?: any;
  title?: string;
};

const Layout = (props: LayoutProps) => {
  const breakpoint = useContext(Breakpoint);

  if (
    localStorage.getItem("selectedCompany") === null ||
    localStorage.getItem("rememberCompany") === null
  ) {
    return <Redirect to={"/companySelection"} />;
  }
  return (
    <AntLayout style={{ background: "white" }}>
      <Header />
      <AntLayout hasSider>
        <Sider
          width={"250px"}
          theme={"light"}
          breakpoint={"md"}
          collapsedWidth={breakpoint < sm ? 0 : 80}
          style={{
            minHeight: "100vh",
            maxHeight: "100vh",
            position: "sticky",
            top: 0,
            left: 0,
          }}
        >
          <Sidebar />
        </Sider>
        <Content
          style={{
            background: "F6F8FA",
            padding: 24,
          }}
        >
          {props.children}
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
