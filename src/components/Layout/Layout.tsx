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

export const MobileContext = React.createContext(false);

const Layout = (props: LayoutProps) => {
  const breakpoint = useContext(Breakpoint);

  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => setCollapsed(!collapsed);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const handleResize = () => {
    const tmp = window.innerWidth < 1024;
    setIsMobile(tmp);
    setCollapsed(tmp);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (
    localStorage.getItem("selectedCompany") === null ||
    localStorage.getItem("rememberCompany") === null
  ) {
    return <Redirect to={"/companySelection"} />;
  }
  return (
    <MobileContext.Provider value={isMobile}>
      <AntLayout style={{ background: "white" }}>
        <Header
          isMobile={isMobile}
          onClickOnBurger={toggle}
          collapsed={collapsed}
        />
        <AntLayout hasSider>
          <Sider
            width={"250px"}
            trigger={isMobile === true ? null : undefined}
            collapsible={true}
            collapsed={collapsed}
            onCollapse={toggle}
            theme={"light"}
            breakpoint={"md"}
            collapsedWidth={breakpoint < sm ? 0 : 80}
            className={"layout-main-sider"}
            style={{
              minHeight: "calc(100vh - 80px)",
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
              height: "calc(100vh - 80px)",
            }}
          >
            {props.children}
          </Content>
        </AntLayout>
      </AntLayout>
    </MobileContext.Provider>
  );
};

export default Layout;
