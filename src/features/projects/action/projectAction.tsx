import { createAsyncThunk } from '@reduxjs/toolkit';
import { activeProject, addNewCustomer, addProject, deleteProject, getAllBranch, getAllCustomer, getAllProject, getAllTasks, getCurrentProject, getProjectQuantity, getTimesheetStatisticTasks, getTimesheetStatisticTeams, getUserNotPagging, inactiveProject } from '../api/projectsAPI';
import { IAddNewClient, ICurrentProject, IGetAllProject, ITimesheetStatistic, IProject } from '../interface/ProjectTypes';

export const getAllCustomerAction = createAsyncThunk(
  'customer/getAll', async () => {
    const res = await getAllCustomer();
    return res;
  }
);

export const getAllProjectAction = createAsyncThunk(
  'project/getAll', async ({ status, search }: IGetAllProject) => {
    const res = await getAllProject({ status, search });
    return res;
  }
);

export const getProjectQuantityAction = createAsyncThunk(
  'project/quantity', async () => {
    const res = await getProjectQuantity();
    return res;
  }
);

export const deleteProjectAction = createAsyncThunk(
  'project/delete',
  async (projectId: number) => {
    const res = await deleteProject(projectId);
    return res;
  }
);

export const inactiveProjectAction = createAsyncThunk(
  'project/inactive',
  async (project: IProject) => {
    const res = await inactiveProject(project);
    return res;
  }
);

export const activeProjectAction = createAsyncThunk(
  'project/active',
  async (project: IProject) => {
    const res = await activeProject(project);
    return res;
  }
);

export const getCurrentProjectAction = createAsyncThunk(
  'project/details',
  async (projectId: number) => {
    const res = await getCurrentProject(projectId);
    return res;
  }
);

export const addProjectAction = createAsyncThunk(
  'project/add',
  async (project: ICurrentProject) => {
    await addProject(project);
  }
);

export const addNewCustomerAction = createAsyncThunk(
  'customer/addNew',
  async (clientInfo: IAddNewClient, thunkAPI) => {
    await addNewCustomer(clientInfo);
    await thunkAPI.dispatch(getAllCustomerAction());
  }
);

export const getAllBranchAction = createAsyncThunk(
  'branch/getAll',
  async () => {
    const res = await getAllBranch();
    return res;
  }
);

export const getUserNotPaggingAction = createAsyncThunk(
  'user/notPagging',
  async () => {
    const res = await getUserNotPagging();
    return res;
  }
);

export const getAllTasksAction = createAsyncThunk(
  'task/getAll',
  async () => {
    const res = await getAllTasks();
    return res;
  }
);

export const getTimesheetStatisticTasksAction = createAsyncThunk(
  'timeSheetsStatisticTask/getData',
  async ({ projectId, startDate, endDate }: ITimesheetStatistic) => {
    const res = await getTimesheetStatisticTasks({ projectId, startDate, endDate });
    return res;
  }
);

export const getTimesheetStatisticTeamsAction = createAsyncThunk(
  'timeSheetsStatisticTeams/getData',
  async ({ projectId, startDate, endDate }: ITimesheetStatistic) => {
    const res = await getTimesheetStatisticTeams({ projectId, startDate, endDate });
    return res;
  }
);
