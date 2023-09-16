import { Card, Steps } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../../../redux/Hook';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  cardTitle: string
}

const steps = [
  {
    title: 'General'
  },
  {
    title: 'Team'
  },
  {
    title: 'Tasks'
  },
  {
    title: 'Notification'
  }
];
export const CreateAndEditPage = (Props: Props): JSX.Element => {
  const { cardTitle } = Props;
  const currentPage = useAppSelector((state) => state.projectReducer.currentPage);
  const stepItems = steps.map((item) => ({ key: uuidv4(), title: item.title }));

  return (
    <>
      <Card title={cardTitle}>
        <div className='create-edit-form'>
          <Steps current={currentPage} items={stepItems} />
        </div>
      </Card>
      <Outlet context={cardTitle} />
    </>
  );
};
