import * as React from "react";
import { Layout as AntLayout } from "antd";
import Header from "./Header";
import Sidebar from "./Sidebar/Sidebar";
import "../../assets/Style/Layout/layout.less";
import { useContext, useState } from "react";
import Breakpoint, { sm } from "../Context/Breakpoint";
import { Redirect } from "react-router";
import { useEffect } from "react";

const { Content, Sider } = AntLayout;

type LayoutProps = {
  children?: any;
  title?: string;
};

const Layout = (props: LayoutProps) => {
  const breakpoint = useContext(Breakpoint);

  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => setCollapsed(!collapsed);

  const [width, setWidth] = useState(window.innerWidth);
  const isMobile = width < 1024;
  useEffect(() => {
    setWidth(window.innerWidth);
  });
  // this hook is only run one time (at construction) because of the second parameter
  useEffect(() => {
    setCollapsed(isMobile);
  }, []);

  if (
    localStorage.getItem("selectedCompany") === null ||
    localStorage.getItem("rememberCompany") === null
  ) {
    return <Redirect to={"/companySelection"} />;
  }
  return (
    <AntLayout style={{ background: "white" }}>
      <Header
        isMobile={isMobile}
        onClickOnBurger={toggle}
        collapsed={collapsed}
      />
      <AntLayout hasSider>
        <Sider
          width={isMobile ? "100%" : "250px"}
          trigger={isMobile === true ? null : undefined}
          collapsible={true}
          collapsed={collapsed}
          onCollapse={toggle}
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
          <Sidebar
            isMobile={isMobile}
            onClickOnElement={toggle}
            collapsed={collapsed}
          />
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
