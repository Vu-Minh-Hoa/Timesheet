/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable react/react-in-jsx-scope */
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { store } from '../redux/Store';
import { GeneralPage } from '../features/projects/components/CreateAndEditProject/General/GeneralPage';
import { TaskPage } from '../features/projects/components/CreateAndEditProject/Task/TaskPage';
import { TeamPage } from '../features/projects/components/CreateAndEditProject/Team/TeamPage';
import { CreateAndEditPage } from '../features/projects/components/CreateAndEditProject/CreateAndEditePage';

global.matchMedia = global.matchMedia || function () {
  return {
    addListener: jest.fn(),
    removeListener: jest.fn()
  };
};

jest.mock('../axios/axios', () => {
  const instance = {
    create: jest.fn()
  };
  return jest.fn(() => instance);
});

describe('Validate Genaral', () => {
  test('not navigate page team when did not enter enough fields', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/projects/create/general']}>
          <Routes>
            <Route path='/projects/create' element={<CreateAndEditPage cardTitle='create' />}>
              <Route path='general' element={<GeneralPage />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const btnNext = screen.getByRole('nextPageBtn', { name: 'nextPageBtn' });
    const projectName = screen.getByTestId('projectName');
    const projectCode = screen.getByTestId('projectCode');
    await act(async () => {
      await fireEvent.change(projectName, {
        target: { value: 'Alphabet' }
      });
      await fireEvent.change(projectCode, {
        target: { value: 'ParentCompanyOfGoogle' }
      });
      await fireEvent.click(btnNext);
    });
    await waitFor(() => {
      expect(btnNext).toHaveTextContent('Next');
    });
  });
});

describe('Validate Team', () => {
  test('not navigate page task when team empty', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/projects/create/team']}>
          <Routes>
            <Route path='/projects/create' element={<CreateAndEditPage cardTitle='create' />}>
              <Route path='team' element={<TeamPage />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const btnNext = screen.getByRole('nextPageBtn', { name: 'nextPageBtn' });
    await fireEvent.click(btnNext);
    await waitFor(() => {
      expect(store.getState().projectReducer.selectedMemberList).toEqual([]);
      expect(btnNext).toHaveTextContent('Next');
    });
  });
});

describe('Validate Task', () => {
  test('not navigate page notification when task empty', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/projects/create/task']}>
          <Routes>
            <Route path='/projects/create' element={<CreateAndEditPage cardTitle='create ' />}>
              <Route path='task' element={<TaskPage />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const btnNext = screen.getByRole('nextPageBtn', { name: 'nextPageBtn' });
    await fireEvent.click(btnNext);
    await waitFor(() => {
      expect(store.getState().projectReducer.selectedTaskList).toEqual([]);
    });
  });
});
