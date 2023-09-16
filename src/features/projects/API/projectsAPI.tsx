/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { toast } from 'react-toastify';
import { axiosInstance } from '../../../axios/axios';
import { IAddNewClient, IBranch, ICurrentProject, IGetAllProject, ITimesheetStatistic, IProject, ITask, ITaskStatistic, ITeamStatistic, IUserNotPagging } from '../interface/ProjectTypes';

export const getAllProject = async ({
  status = '',
  search = ''
}: IGetAllProject): Promise<IProject[]> => {
  const res = await axiosInstance.get(
    `/api/services/app/Project/getAll?status=${status}&search=${search}`
  );
  return res.data.result;
};

export const getAllCustomer = async () => {
  const res = await axiosInstance.get('/api/services/app/Customer/GetAll');
  return res.data.result;
};

export const getProjectQuantity = async () => {
  const res = await axiosInstance.get('/api/services/app/Project/GetQuantityProject');
  return res.data.result;
};

export const inactiveProject = async (project: IProject) => {
  try {
    const res = await axiosInstance.post('/api/services/app/Project/Inactive', {
      id: project.id
    });
    return { id: project.id, data: res.data };
  } catch (error) {
    console.info(error);
    throw new Error("Can't deactive project");
  }
};

export const activeProject = async (project: IProject) => {
  try {
    const res = await axiosInstance.post('/api/services/app/Project/Active', {
      id: project.id
    });
    return { id: project.id, data: res.data };
  } catch (error) {
    console.info(error);
    throw new Error("Can't active project");
  }
};

export const deleteProject = async (projectId: number) => {
  try {
    const res = await axiosInstance.delete(`api/services/app/Project/Delete?Id=${projectId}`);
    toast.success('Delete Project Successfull');
    return res;
  } catch (error) {
    console.info(error);
    throw new Error("Can't delete project");
  }
};

export const getCurrentProject = async (
  projectId: number
): Promise<ICurrentProject> => {
  try {
    const res = await axiosInstance.get(
      `/api/services/app/Project/Get?input=${projectId}`
    );
    return res.data.result;
  } catch (error) {
    console.info(error);
    throw new Error("Can't get current project info");
  }
};

export const addProject = async (project: ICurrentProject): Promise<void> => {
  try {
    await axiosInstance.post('/api/services/app/Project/Save', project);
  } catch (error) {
    console.info(error);
    throw new Error("Can't add project");
  }
};

export const addNewCustomer = async (clientInfo: IAddNewClient): Promise<void> => {
  try {
    await axiosInstance.post('/api/services/app/Customer/Save', clientInfo);
  } catch (error) {
    console.info(error);
    throw new Error("Can't add new customer");
  }
};

export const getAllBranch = async (): Promise<IBranch[]> => {
  try {
    const res = await axiosInstance.get('/api/services/app/Branch/GetAllBranchFilter');
    return res.data.result;
  } catch (error) {
    console.info(error);
    throw new Error("Can't get all branch");
  }
};

export const getUserNotPagging = async (): Promise<IUserNotPagging[]> => {
  try {
    const res = await axiosInstance.get('/api/services/app/User/GetUserNotPagging');
    return res.data.result;
  } catch (error) {
    console.info(error);
    throw new Error("Can't get user not pagging");
  }
};

export const getAllTasks = async (): Promise<ITask[]> => {
  try {
    const res = await axiosInstance.get('/api/services/app/Task/GetAll');
    return res.data.result;
  } catch (error) {
    console.error(error);
    throw new Error("Can't get all task");
  }
};

export const getTimesheetStatisticTasks = async ({
  projectId,
  startDate,
  endDate
}: ITimesheetStatistic): Promise<ITaskStatistic[]> => {
  try {
    const response = await axiosInstance.get(
      `/api/services/app/TimeSheetProject/GetTimeSheetStatisticTasks?projectId=${projectId}&startDate=${startDate}&endDate=${endDate}`
    );
    return response.data.result;
  } catch (error) {
    console.error(error);
    throw new Error("Can't get timesheets statistice Task");
  }
};

export const getTimesheetStatisticTeams = async ({
  projectId,
  startDate,
  endDate
}: ITimesheetStatistic): Promise<ITeamStatistic[]> => {
  try {
    const response = await axiosInstance.get(
      `/api/services/app/TimeSheetProject/GetTimeSheetStatisticTeams?projectId=${projectId}&startDate=${startDate}&endDate=${endDate}`
    );
    return response.data.result;
  } catch (error) {
    console.error(error);
    throw new Error("Can't get timesheets statistice teams");
  }
};
