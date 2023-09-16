import { Checkbox, Table } from 'antd';
import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../../../../../../redux/Hook';
import { ITask } from '../../../../interface/ProjectTypes';
import { toggleAllBillableTask, toggleBillableTask, unselectTask } from '../../../../projectReducer/ProjectReducer';
import './SelectedTask.less';
const { Column } = Table;

export const SelectedTaskTable = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const selectedTaskList = useAppSelector((state) => state.projectReducer.selectedTaskList);
  const [checkAll, setCheckAll] = useState(false);

  const handleRemove = (task: ITask): void => {
    dispatch(unselectTask(task));
  };

  const handleBillable = (taskId: number): void => {
    dispatch(toggleBillableTask(taskId));
    setCheckAll(false);
  };

  const handleBillableAll = (): void => {
    dispatch(toggleAllBillableTask(!checkAll));
    setCheckAll(!checkAll);
  };

  return (
    <Table
      pagination={false}
      dataSource={selectedTaskList}
      rowKey="id"
      scroll={{ y: 400 }}
    >
      <Column
        width="5%"
        render={task => (
          <IoClose
            onClick={() => handleRemove(task)}
            size={26}
            style={{ cursor: 'pointer' }}
          />
        )}
      />
      <Column
        title="Tasks"
        render={task => <span>{task.name}</span>}
        width="60%"
      />
      <Column
        title={
          <div className="flex flex-col-reverse">
            <Checkbox onChange={handleBillableAll} checked={checkAll} />
            <span>Billable</span>
          </div>
        }
        render={task => (
          <Checkbox
            onChange={() => handleBillable(task.id)}
            checked={task.billable}
          />
        )}
      />
    </Table>
  );
};
