export interface ILoginForm {
  username: string
  password: string
  isRemember: boolean
}

export interface IUserInformation {
  name: string
  surname: string
  userName: string
  emailAddress: string
  allowedLeaveDay: number
  type: number
  level: number
  sex: number
  branch: number
  avatarPath: string
  avatarFullPath: string
  morningWorking: string
  morningStartAt: string
  morningEndAt: string
  afternoonWorking: string
  afternoonStartAt: string
  afternoonEndAt: string
  isWorkingTimeDefault: boolean
  branchId: number
  id: number
}

export interface IAuthen {
  accessToken: string | null
  userInfo: IUserInformation
  isError: boolean
  isLoading: boolean
}
