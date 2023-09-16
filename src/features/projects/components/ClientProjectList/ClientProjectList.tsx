import React from 'react';
import { useAppSelector } from '../../../../redux/Hook';
import { IProject } from '../../interface/ProjectTypes';
import { ClientProject } from '../ClientProject/ClientProject';

interface props {
  clientName: string
}

export const ClientProjectList = (props: props): JSX.Element => {
  const { clientName } = props;
  const projectList = useAppSelector((state) => {
    return state.projectReducer.projectList;
  });
  const projectListByName = projectList.filter((project) => {
    return project.customerName === clientName;
  });
  return (
    <>
      {
        projectListByName.map((project: IProject) => {
          return <ClientProject key={project.id} project={project} />;
        })
      }
    </>
  );
};
