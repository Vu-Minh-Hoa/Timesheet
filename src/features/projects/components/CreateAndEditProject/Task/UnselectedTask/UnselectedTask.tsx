import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, Table } from 'antd';
import React from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../../../../../../redux/Hook';
import { ETaskType, ITask } from '../../../../interface/ProjectTypes';
import { selectTask } from '../../../../projectReducer/ProjectReducer';

const { Panel } = Collapse;
const { Column } = Table;

export const UnselectedTaskTable = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const unselectedTaskList = useAppSelector((state) => state.projectReducer.unselectedTaskList);

  const handleSelectTask = (task: ITask): void => {
    dispatch(selectTask(task));
  };

  return (
    <Collapse
      bordered={false}
      defaultActiveKey={['1']}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive === true ? 90 : 0} />
      )}
      className="site-collapse-custom-collapse"
    >
      <Panel header={<span className='font-medium'>Select task</span>} key="1" className="site-collapse-custom-panel">
        <Table
          pagination={false}
          dataSource={unselectedTaskList}
          rowKey="id"
          scroll={{ y: 400 }}
        >
          <Column
            width="5%"
            render={task => (
              <IoAddCircleOutline
                onClick={() => handleSelectTask(task)}
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
            title="Description"
            render={task => {
              if (task.type === ETaskType.COMMON) return 'Common Task';
              return 'Other Task';
            }}
          />
        </Table>
      </Panel>
    </Collapse>
  );
};
