import React, { useState, useEffect } from 'react';
import './DashboardLayout.less';
import { HeaderNavBar } from '../components/headerNavBar/HeaderNavBar';
import { SidebarNavBar } from '../components/sidebar/SidebarNavBar';
import { Layout } from 'antd';
import '../assets/css-variable/dark-theme.less';
import { useAppDispatch } from '../redux/Hook';
import { getCurrentUserInfoAction } from '../features/authen/action/LoginAction';
import { MainRoute } from '../navigation/MainRoute';

const { Header, Sider, Content } = Layout;

export const DashboardLayout = (): JSX.Element => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getCurrentUserInfoAction());
  }, []);

  return (
    <>
      {
        <Layout className={isDarkMode ? 'layout dark-theme' : 'layout'}>
          <Header className='header_container' >
            <HeaderNavBar handleChangeTheme={setIsDarkMode} />
          </Header>
          <Layout className='container'>
            <Sider className='sidebar_container'>
              <SidebarNavBar />
            </Sider>
            <Layout>
              <Content className='content_container'>
                <MainRoute />
              </Content>
            </Layout>
          </Layout>
        </Layout>
      }
    </>
  );
};
