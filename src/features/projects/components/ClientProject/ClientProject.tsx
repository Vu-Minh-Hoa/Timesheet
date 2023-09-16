/* eslint-disable no-void */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable indent */
import { Button, Dropdown, List, Menu, Tag } from 'antd';
import { CheckOutlined, CloseOutlined, DeleteFilled, DownOutlined, EditOutlined, EyeFilled } from '@ant-design/icons';
import React from 'react';
import moment from 'moment';
import { IProject, EProjectType, EProjectStatus } from '../../interface/ProjectTypes';
import './ClientProject.less';
import Swal from 'sweetalert2';
import { activeProjectAction, deleteProjectAction, getCurrentProjectAction, inactiveProjectAction } from '../../action/projectAction';
import { useAppDispatch } from '../../../../redux/Hook';
import { useNavigate } from 'react-router-dom';

interface props {
  project: IProject
}

const handleProjectType = (projectType: number) => {
  switch (projectType) {
    case 0:
      return EProjectType.FF;
    case 1:
      return EProjectType.NB;
    case 2:
      return EProjectType.ODC;
    case 3:
      return EProjectType.TSM;
    default:
      return '';
  }
};

export const ClientProject = (props: props): JSX.Element => {
  const { project } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const projectDuration = `${moment(project.timeStart).format('DD/MM/YYYY')} 
    ${project.timeEnd !== '' ? `- ${moment(project.timeEnd).format('DD/MM/YYYY')}` : ''
    }`;

  const handleEditProject = async (projectId: number): Promise<void> => {
    await dispatch(getCurrentProjectAction(projectId));
    navigate(`edit/${projectId}`, { state: projectId });
  };

  const handleViewProject = async (projectId: number): Promise<void> => {
    await dispatch(getCurrentProjectAction(projectId));
    navigate(`view/${projectId}`, { state: projectId });
  };

  const handleProjectStatus = (project: IProject) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `${project.status !== EProjectStatus.ACTIVE ? 'Activate' : 'Deactivate'
        } project: '${project.name}'?`,
      showCancelButton: true,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        project.status !== EProjectStatus.ACTIVE
          ? dispatch(activeProjectAction(project))
          : dispatch(inactiveProjectAction(project));
      }
    });
  };

  const handleDelete = (project: IProject) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Delete project: '${project.name}'?`,
      showCancelButton: true,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProjectAction(project.id));
      }
    });
  };

  return (
    <>
      <List.Item>
        <div className='project-info'>
          <span>{project.name}</span>
          <Tag className='project-members'>{project.pms.join(', ')}</Tag>
          <Tag className='project-activeMember'>{project.activeMember} members</Tag>
          {handleProjectType(project.projectType) !== ''
            ? <Tag className='project-projectType'>{handleProjectType(project.projectType)}</Tag>
            : ''}
          <Tag className='project-duration'> {projectDuration}</Tag>
        </div>
        <div className='project-action-container'>
          {project.status === 0
            ? <Tag className="project-status-active">Active</Tag>
            : <Tag className="project-status-inactive">Inactive</Tag>}
          <Dropdown trigger={['click']} getPopupContainer={(triggerNode: HTMLElement) => triggerNode.parentNode as HTMLElement}
            overlay={
              <Menu >
                <Menu.Item key='1' onClick={() => void handleEditProject(project.id)} icon={<EditOutlined />} >Edit</Menu.Item>
                <Menu.Item key='2' icon={<EyeFilled />} onClick={() => void handleViewProject(project.id)} >View</Menu.Item>
                {project.status === EProjectStatus.DEACTIVE
                  ? (
                    <Menu.Item key='3' icon={<CheckOutlined />} onClick={() => handleProjectStatus(project)} >Active</Menu.Item>)
                  : (
                    <Menu.Item key='3' icon={<CloseOutlined />} onClick={() => handleProjectStatus(project)} >Deactive</Menu.Item>)}
                <Menu.Item key='4' icon={<DeleteFilled />} onClick={() => handleDelete(project)} >Delete</Menu.Item>
              </Menu>
            }
          >
            <Button className='project-action-btn'>Actions <DownOutlined className='project-action-icon' /></Button>
          </Dropdown>
        </div>
      </List.Item>
    </>
  );
};
