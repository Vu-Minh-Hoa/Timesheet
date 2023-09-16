// Enum section

export enum EProjectStatus {
  ACTIVE = 0,
  DEACTIVE = 1,
  ALL = ''
}

export enum EProjectType {
  TSM = 'TSM',
  FF = 'FF',
  NB = 'NB',
  ODC = 'ODC'
}

export enum ECreateProjectType {
  TIME_MATERIAL,
  FIXED_FEE,
  NON_BILLABLE,
  ODC,
  PRODUCT,
  TRAINING
}

export enum EMemberType {
  STAFF,
  INTERSHIP,
  COLLABORATOR,
}

export enum EPositionType {
  MEMBER,
  PROJECT_MANAGER,
  SHADOW,
  DEACTIVE
}

export enum EMemberLevel {
  INTERN_0,
  INTERN_1,
  INTERN_2,
  PREFRESHER,
  FRESHERMINUS,
  FRESHER,
  FRESHERPLUS,
  JUNIORMINUS,
  JUNIOR,
  JUNIORPLUS,
  MIDDLEMINUS,
  MIDDLE,
  MIDDLEPLUS,
  SENIORMINUS,
  SENIOR,
  SENIORPLUS
}

export enum ETaskType {
  COMMON,
  OTHERS
}

export enum ETimeUnit {
  WEEK = 'Week',
  MONTH = 'Month',
  QUARTER = 'Quarter',
  YEAR = 'Year',
  ALL_TIME = 'All Time',
  CUSTOM_TIME = 'Custom Time'
}

// Interface section

export interface IProjectState {
  projectList: IProject[]
  clientList: IClient[]
  projectQuantity: IProjectQuantity[]
  projectFilter: IGetAllProject
  listBranch: IBranch[]
  selectedTaskList: ITask[]
  taskStatistic: ITaskStatistic[]
  teamStatistic: ITeamStatistic[]
  unselectedTaskList: ITask[]
  selectedMemberList: IUserNotPagging[]
  unselectedMemberList: IUserNotPagging[]
  currentProject: ICurrentProject
  currentPage: number
  querySearch: string
  isLoading: boolean
}

export interface IProject {
  customerName: string
  name: string
  code: string
  status: number
  pms: []
  activeMember: number
  projectType: number
  timeStart: string
  timeEnd: string
  id: number
}

export interface ICurrentProject {
  name: string
  code: string
  status?: EProjectStatus
  timeStart?: Date
  timeEnd?: Date
  note: string
  projectType: ECreateProjectType
  customerId: number
  tasks: ITask[]
  users: IUser[]
  projectTargetUsers: IProjectTargetUser[]
  komuChannelId?: string
  isNotifyToKomu?: boolean
  isAllUserBelongTo: boolean
  id?: number
}

export interface IGetAllProject {
  status: string | number
  search: string
}

export interface IClient {
  id: number
  name: string
}

export interface IAddNewClient {
  name: string
  code: string
  address?: string
}

export interface IProjectQuantity {
  status: number
  quantity: number
}

export interface IProjectTargetUser {
  userId: number
  roleName: string
  id: number
}

export interface ITask {
  taskId: number
  id: number
  billable: boolean
  name?: string
  type?: number
  isDeleted?: boolean
}

export interface IUser {
  userId: number
  type: number
  id: number
}

export interface IUserNotPagging {
  id: number
  name: string
  emailAddress: string
  isActive: boolean
  type: EMemberType
  jobTitle: string | null
  level: number
  userCode: string | null
  avatarPath: string
  avatarFullPath: string
  branch: number
  branchColor: string | null
  branchDisplayName: string | null
  branchId: number | null
  positionType?: EPositionType
}

export interface IBranch {
  id: number
  name: string
  displayName: string
}

export interface ITaskStatistic {
  taskId: number
  taskName: string
  totalWorkingTime: number
  billableWorkingTime: number
  billable: boolean
}

export interface ITeamStatistic {
  userId: number
  userName: string
  projectUserType: number
  totalWorkingTime: number
  billableWorkingTime: number
}

export interface ITimesheetStatistic {
  projectId: number
  startDate: string
  endDate: string
}
