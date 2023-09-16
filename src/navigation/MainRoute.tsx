import React from 'react';
import { ProjectRoute } from '../features/projects/ProjectRoute';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Home } from '../features/home/components/Home';
export const MainRoute = (): JSX.Element => {
  return (
    <Routes>
      <Route path='*' element={<Navigate to={'home'} />} />
      <Route path='/home' element={<Home />} />
      <Route path='/projects/*' element={<ProjectRoute />} />
    </Routes>
  );
};
