/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect } from 'react';
import { Client } from '../Client/Client';
import { useAppDispatch, useAppSelector } from '../../../../redux/Hook';
import { getAllProjectAction } from '../../action/projectAction';
import { EProjectStatus } from '../../interface/ProjectTypes';
import './ClientList.less';
import { Skeleton } from 'antd';

const _ = require('lodash');
export const ClientList = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.projectReducer.isLoading);
  const filterProject = useAppSelector((state) => state.projectReducer.projectFilter);
  const projectList = useAppSelector((state) => state.projectReducer.projectList);
  const groups = _.groupBy(projectList, 'customerName');
  const clientList = Object.keys(groups);

  useEffect(() => {
    (async function () {
      switch (filterProject.status) {
        case EProjectStatus.ACTIVE:
          await dispatch(getAllProjectAction({ status: EProjectStatus.ACTIVE, search: '' }));
          break;
        case EProjectStatus.DEACTIVE:
          await dispatch(getAllProjectAction({ status: EProjectStatus.DEACTIVE, search: '' }));
          break;
        case EProjectStatus.ALL:
          await dispatch(getAllProjectAction({ status: EProjectStatus.ALL, search: '' }));
          break;
      }
    })();
  }, [filterProject.status, dispatch]);

  return (
    <div className='project-list'>
      {isLoading
        ? <Skeleton active paragraph={{ rows: 10 }} />
        : clientList.map((client) => {
          return <Client key={client} clientName={client} />;
        })
      }
    </div>
  );
};
