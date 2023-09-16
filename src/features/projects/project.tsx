import React, { useEffect } from 'react';
import { useAppDispatch } from '../../redux/Hook';
import { ProjectHeader } from './components/ProjectHeader/ProjectHeader';
import { ProjectMainContent } from './components/ProjectMainContent/ProjectMainContent';
import { resetCurrentProjectData } from './projectReducer/ProjectReducer';

export const ProjectManagament = (): JSX.Element => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(resetCurrentProjectData());
  }, []);
  return (
    <div className='project-container'>
      <ProjectHeader />
      <ProjectMainContent />
    </div>
  );
};
