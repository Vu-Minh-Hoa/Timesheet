/* eslint-disable indent */
/* eslint-disable @typescript-eslint/indent */
import { EPositionType, IProjectState } from '../interface/ProjectTypes';
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  activeProjectAction,
  addNewCustomerAction,
  addProjectAction,
  getAllBranchAction,
  getAllCustomerAction,
  getAllProjectAction,
  getAllTasksAction,
  getCurrentProjectAction,
  getProjectQuantityAction,
  getTimesheetStatisticTasksAction,
  getTimesheetStatisticTeamsAction,
  getUserNotPaggingAction,
  inactiveProjectAction
} from '../action/projectAction';

const initialState: IProjectState = {
  projectList: [],
  clientList: [],
  projectQuantity: [],
  querySearch: '',
  selectedMemberList: [],
  unselectedMemberList: [],
  listBranch: [],
  taskStatistic: [],
  teamStatistic: [],
  selectedTaskList: [],
  unselectedTaskList: [],
  currentProject: {
    name: '',
    code: '',
    note: '',
    projectType: 0,
    customerId: 0,
    tasks: [],
    users: [],
    projectTargetUsers: [],
    isAllUserBelongTo: false
  },
  currentPage: 0,
  projectFilter: {
    status: 0,
    search: ''
  },
  isLoading: false
};

export const projectManagamentSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjectFilter: (state, action) => {
      state.projectFilter.status = action.payload;
    },
    setQuerySearch: (state, action) => {
      state.querySearch = action.payload;
    },
    getCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setGeneralTabData: (state, action) => {
      state.currentProject.name = action.payload.name;
      state.currentProject.code = action.payload.code;
      state.currentProject.timeStart = action.payload.timeStart;
      state.currentProject.timeEnd = action.payload.timeEnd;
      state.currentProject.note = action.payload.note;
      state.currentProject.isAllUserBelongTo = action.payload.isAllUserBelongTo;
      state.currentProject.projectType = action.payload.projectType;
      state.currentProject.customerId = action.payload.customerId;
    },
    resetCurrentProjectData: (state) => {
      state.currentProject.id = undefined;
      state.currentProject.name = '';
      state.currentProject.code = '';
      state.currentProject.timeStart = undefined;
      state.currentProject.timeEnd = undefined;
      state.currentProject.note = '';
      state.currentProject.isAllUserBelongTo = false;
      state.currentProject.projectType = 0;
      state.currentProject.customerId = 0;
      state.currentProject.users = [];
      state.currentProject.tasks = [];
      state.currentProject.isNotifyToKomu = false;
      state.currentProject.komuChannelId = '';
    },
    selectMember: (state, action) => {
      state.selectedMemberList.push(action.payload);
      state.unselectedMemberList = state.unselectedMemberList.filter(
        (member) => member.id !== action.payload.id
      );
    },
    unselectMember: (state, action) => {
      state.unselectedMemberList.push(action.payload);
      state.selectedMemberList = state.selectedMemberList.filter(
        (member) => member.id !== action.payload.id
      );
    },
    setTeamTabData: (state, action) => {
      state.currentProject.users = action.payload;
    },
    setTaskTabData: (state, action) => {
      state.currentProject.tasks = action.payload;
    },
    setSelectedMemberPositionType: (state) => {
      state.selectedMemberList = state.selectedMemberList.map((member) => {
        const matchMember = state.currentProject.users.find(
          (currentMember) => currentMember.userId === member.id
        );
        if (matchMember != null) {
          return {
            ...member,
            positionType: matchMember.type
          };
        }
        return member;
      });
    },
    setMemberPosition: (state, action) => {
      state.selectedMemberList = state.selectedMemberList.map((member) => {
        if (member.id === action.payload.id) {
          return { ...member, positionType: action.payload.positionType };
        }
        return member;
      });
    },
    setNotificationTabData: (state, action) => {
      state.currentProject.isNotifyToKomu = action.payload.isNotifyToKomu;
      state.currentProject.komuChannelId = action.payload.komuChannelId;
    },
    toggleBillableTask: (state, action) => {
      state.selectedTaskList = state.selectedTaskList.map(task =>
        task.id === action.payload
          ? { ...task, billable: !task.billable }
          : task
      );
    },
    toggleAllBillableTask: (state, action) => {
      state.selectedTaskList = state.selectedTaskList
        .map(task =>
        ({
          ...task,
          billable: action.payload
        }));
    },
    selectTask: (state, action) => {
      state.selectedTaskList.push(action.payload);
      state.unselectedTaskList = state.unselectedTaskList.filter(
        (task) => task.id !== action.payload.id
      );
    },
    unselectTask: (state, action) => {
      state.unselectedTaskList.push(action.payload);
      state.selectedTaskList = state.selectedTaskList.filter(
        (task) => task.id !== action.payload.id
      );
    },
    filterTaskInCurrentProject: (state) => {
      state.selectedTaskList = state.selectedTaskList
        .map((task) => {
          const matchTask = state.currentProject.tasks.find(
            (currentTask) => currentTask.taskId === task.id
          );
          if (matchTask == null) {
            state.unselectedTaskList.push(task);
            return {
              ...task,
              taskId: -1
            };
          }
          return {
            ...task,
            billable: matchTask.billable
          };
        })
        .filter((task) => task.taskId !== -1);
      state.unselectedTaskList = state.unselectedTaskList
        .map((task) => {
          const matchTask = state.currentProject.tasks.find(
            (currentTask) => currentTask.taskId === task.id
          );
          if (matchTask != null) {
            state.selectedTaskList.push({
              ...task,
              billable: matchTask.billable
            });
            return {
              ...task,
              taskId: -1
            };
          }
          return task;
        })
        .filter((task) => task.taskId !== -1);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCustomerAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.clientList = action.payload;
      })
      .addCase(getAllCustomerAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCustomerAction.rejected, (state) => {
        state.isLoading = false;
        toast.error('Failed getting client list');
      })
      .addCase(getAllProjectAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projectList = action.payload;
      })
      .addCase(getAllProjectAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProjectAction.rejected, (state) => {
        state.isLoading = false;
        toast.error('Failed getting client project list');
      })
      .addCase(getProjectQuantityAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projectQuantity = action.payload;
      })
      .addCase(getProjectQuantityAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProjectQuantityAction.rejected, (state) => {
        state.isLoading = false;
        toast.error('Failed getting client project list');
      })
      .addCase(getCurrentProjectAction.fulfilled, (state, action) => {
        state.currentProject = action.payload;
      })
      .addCase(getCurrentProjectAction.rejected, () => {
        toast.error('Failed to load current project data!');
      })
      .addCase(inactiveProjectAction.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('Deactive Project Successfully', {
          theme: 'colored'
        });
      })
      .addCase(inactiveProjectAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(inactiveProjectAction.rejected, (state) => {
        state.isLoading = false;
        toast.error('Failed', {
          theme: 'colored'
        });
      })
      .addCase(activeProjectAction.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('Active Project Successfully', {
          theme: 'colored'
        });
      })
      .addCase(activeProjectAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(activeProjectAction.rejected, (state) => {
        state.isLoading = false;
        toast.error('Failed', {
          theme: 'colored'
        });
      })
      .addCase(addNewCustomerAction.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('Added new client successfully');
      })
      .addCase(addNewCustomerAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewCustomerAction.rejected, (state) => {
        state.isLoading = false;
        toast.error('Failed to add new client!');
      })
      .addCase(addProjectAction.fulfilled, (state) => {
        toast.success('Add Project Successfully');
      })
      .addCase(addProjectAction.rejected, (state, action) => {
        toast.error('Failed adding project');
      })
      .addCase(getAllBranchAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listBranch = action.payload;
      })
      .addCase(getAllBranchAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllBranchAction.rejected, (state) => {
        state.isLoading = false;
        toast.error('Failed to load all branch!');
      })
      .addCase(getUserNotPaggingAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.unselectedMemberList = action.payload
          .filter((member) => member.isActive)
          .filter((member) => {
            const matchMember = state.currentProject.users.find(
              (user) => user.userId === member.id
            );
            if (matchMember != null) {
              state.selectedMemberList.push(member);
              state.unselectedMemberList.filter(
                (unselectedMember) => unselectedMember.id === member.id
              );
              return false;
            }
            return true;
          })
          .map((member) => ({
            ...member,
            positionType: EPositionType.MEMBER
          }));
      })
      .addCase(getUserNotPaggingAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserNotPaggingAction.rejected, (state) => {
        state.isLoading = false;
        toast.error('Failed to get not pagging users!');
      })
      .addCase(getAllTasksAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedTaskList = action.payload
          .filter(task => task.isDeleted === false && task.type === 0)
          .map(task => {
            return {
              ...task,
              billable: true
            };
          });
        state.unselectedTaskList = action.payload
          .filter(task => task.isDeleted === false && task.type === 1)
          .map(task => {
            return {
              ...task,
              billable: true
            };
          });
      })
      .addCase(getAllTasksAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTasksAction.rejected, (state) => {
        state.isLoading = false;
        toast.error('Failed to get all tasks!');
      })
      .addCase(getTimesheetStatisticTasksAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.taskStatistic = action.payload;
      })
      .addCase(getTimesheetStatisticTasksAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTimesheetStatisticTasksAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getTimesheetStatisticTeamsAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.teamStatistic = action.payload;
      })
      .addCase(getTimesheetStatisticTeamsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTimesheetStatisticTeamsAction.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const {
  setNotificationTabData,
  toggleBillableTask,
  toggleAllBillableTask,
  setTaskTabData,
  filterTaskInCurrentProject,
  selectTask,
  unselectTask,
  setMemberPosition,
  setTeamTabData,
  setSelectedMemberPositionType,
  setProjectFilter,
  setQuerySearch,
  getCurrentPage,
  setGeneralTabData,
  resetCurrentProjectData,
  selectMember,
  unselectMember
} = projectManagamentSlice.actions;
export default projectManagamentSlice.reducer;
