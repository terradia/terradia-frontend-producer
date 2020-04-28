import * as React from 'react';
import { Layout as AntLayout } from 'antd';
import Header from './Header';
import Logout from '../Authentication/Logout/Logout';
import Sidebar from './Sidebar';
import '../../index.less';
import { useContext } from 'react';
import Breakpoint, { sm, md } from '../Context/Breakpoint';
import SummarySidebar from './SummarySidebar';

const { Content, Sider } = AntLayout;

type LayoutProps = {
  children?: any;
  title?: string;
};

const Layout = (props: LayoutProps) => {
  const breakpoint = useContext(Breakpoint);

  return (
    <AntLayout style={{ background: 'white' }}>
      <Header/>
      <AntLayout hasSider>
        <Sider width={'155px'} theme={'light'}
               breakpoint={'md'}
               collapsedWidth={breakpoint < sm ? 0 : 80}
               style={{
                 minHeight: '90vh',
                 maxHeight: '100vh',
                 position: 'sticky',
                 top: 0,
                 left: 0,
               }}
        >
          <Sidebar/>
          <Logout isMenu/>
        </Sider>
        <Content style={{
          background: 'F6F8FA',
          padding: 24,
        }}>
          {props.children}
        </Content>
        {
          breakpoint > md &&
          <Sider theme={'light'}
                 style={{
                   minHeight: '90vh',
                 }}
          >
            <SummarySidebar/>
          </Sider>
        }
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
