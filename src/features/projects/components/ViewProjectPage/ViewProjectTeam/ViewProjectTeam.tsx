import { Progress, Table } from 'antd';
import { ColumnsType } from 'antd/es/table/Table';
import React from 'react';
import { v4 } from 'uuid';

import { useAppSelector } from '../../../../../redux/Hook';
import { getHour } from '../../../../../ults/RenderTime';

interface DataType {
  name: string
  hours: number
  billableHours: string | number
}

const columns: ColumnsType<DataType> = [
  {
    key: v4(),
    title: 'Name',
    dataIndex: 'name',
    width: '40%'
  },
  {
    key: v4(),
    title: 'Hours',
    dataIndex: 'hours',
    render: time => <>{getHour(time)}</>
  },
  {
    key: v4(),
    title: 'Billable Hours',
    dataIndex: 'billableHours',
    render: percent => (
      <Progress
        status="active"
        percent={percent}
      />
    )
  }
];

const progressPercent = (amount: number, totalAmount: number): number | string => {
  if (amount > 0 && totalAmount > 0) return Math.floor((amount / totalAmount) * 100);
  return '';
};

export const ViewProjectTeam = (): JSX.Element => {
  const teamStatistic = useAppSelector((state) => state.projectReducer.teamStatistic);
  const tblDataSource = teamStatistic
    .map(member => {
      const key = v4();
      const name = member.userName;
      const hours = member.billableWorkingTime;
      const billableHours = progressPercent(
        member.billableWorkingTime,
        member.totalWorkingTime
      );
      return { key, name, hours, billableHours };
    });

  return (
    <Table
      columns={columns}
      dataSource={tblDataSource}
      pagination={{
        defaultCurrent: 1,
        showLessItems: true,
        responsive: true,
        hideOnSinglePage: true
      }}
    />
  );
};
