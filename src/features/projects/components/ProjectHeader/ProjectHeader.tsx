/* eslint-disable indent */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Divider, Button, Select, Input } from 'antd';
import { AiOutlineSearch } from 'react-icons/ai';
import React, { useEffect } from 'react';
import './ProjectHeader.less';
import { useAppDispatch, useAppSelector } from '../../../../redux/Hook';
import { getAllProjectAction, getProjectQuantityAction } from '../../action/projectAction';
import { EProjectStatus } from '../../interface/ProjectTypes';
import { resetCurrentProjectData, setProjectFilter } from '../../projectReducer/ProjectReducer';
import { useNavigate } from 'react-router-dom';

export const ProjectHeader = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const filter = useAppSelector((state) => state.projectReducer.projectFilter);
  const handleChange = (value: string): void => {
    dispatch(setProjectFilter(value));
  };

  useEffect(() => {
    void (async function () {
      await dispatch(
        getProjectQuantityAction()
      );
    })();
  }, []);

  const quantityProject = useAppSelector(
    (state) => {
      return state.projectReducer.projectQuantity;
    }
  );

  const handleAddingProject = () => {
    dispatch(resetCurrentProjectData());
    navigate('/projects/create');
  };

  const activeProjectQuantity = quantityProject[EProjectStatus.ACTIVE]?.quantity;
  const deactiveProjectQuantity = quantityProject[EProjectStatus.DEACTIVE]?.quantity;
  const allProjectQuantity = activeProjectQuantity + deactiveProjectQuantity;

  const getProjectStatusByFilter = (status: string | number, search: string) => {
    switch (status) {
      case EProjectStatus.ACTIVE:
        return { status: EProjectStatus.ACTIVE, search };
      case EProjectStatus.DEACTIVE:
        return { status: EProjectStatus.DEACTIVE, search };
      case EProjectStatus.ALL:
        return { status: '', search };
      default:
        return { status: EProjectStatus.ACTIVE, search };
    }
  };

  const onSearch = async (value: string): Promise<void> => {
    await dispatch(
      getAllProjectAction(getProjectStatusByFilter(filter.status, value))
    );
  };
  return (
    <div>
      <h1 className='project-header-title'>
        Manage Projects
      </h1>
      <Divider />
      <div className='manage-project-action__container'>
        <Button size='large' type="primary" onClick={handleAddingProject}> + New Project </Button>
        <Select
          defaultValue='Active Projects'
          onChange={handleChange}
          size='large'
          options={[
            {
              value: EProjectStatus.ACTIVE,
              label: `Active Projects (${activeProjectQuantity})`
            },
            {
              value: EProjectStatus.DEACTIVE,
              label: `Deactive Projects (${deactiveProjectQuantity})`
            },
            {
              value: EProjectStatus.ALL,
              label: `All Projects (${allProjectQuantity})`
            }
          ]}
        />
        <Input.Search
          placeholder="Enter your username"
          prefix={<AiOutlineSearch className="site-form-item-icon" />}
          onSearch={value => {
            void onSearch(value);
          }}
          size='large'
          allowClear
        />
      </div>
    </div>
  );
};
