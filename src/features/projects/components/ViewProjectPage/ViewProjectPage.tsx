import { Divider, Tabs } from 'antd';
import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ViewProjectHeader } from './ViewProjectHeader/ViewProjectHeader';
import './ViewProjectPage.less';

const tabItems = [
  {
    key: 'task',
    label: 'Task'
  },
  {
    key: 'team',
    label: 'Team'
  }
];

export const ViewProjectPage = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTabs = location.pathname.split('/', 5);
  const [currentTab, setCurrentTab] = useState(currentTabs[4]);
  const handleOnTabClick = (key: string): void => {
    setCurrentTab(key);
    navigate(key);
  };
  return (
    <>
      <ViewProjectHeader />
      <Divider />
      <Tabs
        activeKey={currentTab}
        onTabClick={handleOnTabClick}
        items={tabItems}
      />
      <div style={{ padding: '20px 40px' }}>
        <Outlet />
      </div>
    </>
  );
};
