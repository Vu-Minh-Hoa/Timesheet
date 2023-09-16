/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Progress, Table } from 'antd';
import React from 'react';
import { v4 } from 'uuid';
import { useAppSelector } from '../../../../../redux/Hook';
import { getHour } from '../../../../../ults/RenderTime';
import type { ColumnsType } from 'antd/es/table';

interface IBillableDataType {
  billableTasks: string
  hours: string
  billableHours: string | number
}

interface INonBillableDataType {
  nonBillableTasks: string
  hours: number
}

const progressPercent = (amount: number, totalAmount: number): number | string => {
  if (amount > 0 && totalAmount > 0) return Math.floor((amount / totalAmount) * 100);
  return '';
};

const hourMinuteFormat = (minutes: number): string => {
  if (minutes === 0) return '00 : 00';
  const h = minutes / 60 | 0;
  const m = minutes % 60 | 0;
  return `${h} : ${m}`;
};

const billableColumns: ColumnsType<IBillableDataType> = [
  {
    key: v4(),
    title: 'Billable Tasks',
    dataIndex: 'billableTasks'
  },
  {
    key: v4(),
    title: 'Hours',
    dataIndex: 'hours'
  },
  {
    key: v4(),
    title: 'Billable Hours',
    dataIndex: 'billableHours',
    render: (percent: number | undefined) => (
      <Progress
        status="active"
        percent={percent}
      />
    )
  }
];

const nonBillableColumns: ColumnsType<INonBillableDataType> = [
  {
    key: v4(),
    title: 'Non-billable Tasks',
    dataIndex: 'nonBillableTasks',
    width: '40%'
  },
  {
    key: v4(),
    title: 'Hours',
    dataIndex: 'hours',
    render: (time: number) => <>{getHour(time)}</>
  }
];

export const ViewProjectTask = (): JSX.Element => {
  const taskStatistic = useAppSelector((state) => state.projectReducer.taskStatistic);

  const tblBillableDataSource = taskStatistic
    .filter((task) => task.billable)
    .map((task) => {
      const key = v4();
      const billableTasks = task.taskName;
      const hours = hourMinuteFormat(task.billableWorkingTime);
      const billableHours = progressPercent(
        task.billableWorkingTime,
        task.totalWorkingTime
      );
      return { key, billableTasks, hours, billableHours };
    });

  const tblNonBillableDataSource = taskStatistic
    .filter((task) => !task.billable)
    .map((task) => {
      const key = v4();
      const nonBillableTasks = task.taskName;
      const hours = task.totalWorkingTime - task.billableWorkingTime;
      return { key, nonBillableTasks, hours };
    });

  return (
    <div>
      <Table
        columns={billableColumns}
        dataSource={tblBillableDataSource}
        pagination={{
          defaultCurrent: 1,
          showLessItems: true,
          responsive: true,
          hideOnSinglePage: true
        }}
      />
      <Table
        columns={nonBillableColumns}
        dataSource={tblNonBillableDataSource}
        pagination={{
          defaultCurrent: 1,
          showLessItems: true,
          responsive: true,
          hideOnSinglePage: true
        }}
      />
    </div>
  );
};
