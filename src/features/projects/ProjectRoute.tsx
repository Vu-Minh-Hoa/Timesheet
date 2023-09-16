/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Navigate, Route, Routes } from 'react-router-dom';
import React from 'react';
import { ProjectManagament } from './Project';
import { GeneralPage } from './components/CreateAndEditProject/General/GeneralPage';
import { TeamPage } from './components/CreateAndEditProject/Team/TeamPage';
import { TaskPage } from './components/CreateAndEditProject/Task/TaskPage';
import { NotificationPage } from './components/CreateAndEditProject/Notification/NotificationPage';
import { CreateAndEditPage } from './components/CreateAndEditProject/CreateAndEditePage';
import { ViewProjectPage } from './components/ViewProjectPage/ViewProjectPage';
import { ViewProjectTask } from './components/ViewProjectPage/ViewProjectTask/ViewProjectTask';
import { ViewProjectTeam } from './components/ViewProjectPage/ViewProjectTeam/ViewProjectTeam';

export const ProjectRoute = () => {
  return (
    <Routes>
      <Route index element={<ProjectManagament />} />
      <Route path="create" element={<CreateAndEditPage cardTitle='Create New Project' />}>
        <Route index element={<Navigate to={'general'} />} />
        <Route path="general" element={<GeneralPage />} />
        <Route path="team" element={<TeamPage />} />
        <Route path="task" element={<TaskPage />} />
        <Route path="notification" element={<NotificationPage />} />
      </Route>
      <Route path="edit/:projectId" element={<CreateAndEditPage cardTitle='View Project' />}>
        <Route index element={<Navigate to={'general'} />} />
        <Route path="general" element={<GeneralPage />} />
        <Route path="team" element={<TeamPage />} />
        <Route path="task" element={<TaskPage />} />
        <Route path="notification" element={<NotificationPage />} />
      </Route>
      <Route path="view/:projectId" element={<ViewProjectPage />} >
        <Route index element={<Navigate to={'task'} />} />
        <Route path="task" element={<ViewProjectTask />} />
        <Route path="team" element={<ViewProjectTeam />} />
      </Route>
    </Routes>
  );
};
