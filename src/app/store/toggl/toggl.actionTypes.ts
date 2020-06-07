import { TogglClient, User } from '../../../services/toggle/entities'
import { ViewLastDayReport, WeeklyReport } from '../../types'

export enum TogglActions {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  INIT_API = 'INIT_API',
  GET_CLIENTS = 'GET_CLIENTS',
  GET_WEEKLY_REPORT = 'GET_WEEKLY_REPORT',
  SET_WEEKLY_REPORT = 'SET_WEEKLY_REPORT',
  UPDATE_WEEKLY_REPORT = 'UPDATE_WEEKLY_REPORT',
  DELETE_WEEKLY_REPORT = 'DELETE_WEEKLY_REPORT',
  GET_LAST_DAY_REPORT = 'GET_LAST_DAY_REPORT',
  SET_LAST_DAY_REPORT = 'SET_LAST_DAY_REPORT'
}

export interface TogglAction {
  type: TogglActions
  payload: TogglPayload
}

export type TogglPayload =
  | LoginPayload
  | GetClientsPayload
  | InitApiPayload
  | GetWeeklyReportPayload
  | UpdateWeeklyReportPayload
  | DeleteWeeklyReportPayload
  | SetLastDayReportPayload

export type LoginPayload = User
export type InitApiPayload = User
export type GetClientsPayload = TogglClient[]
export type SetLastDayReportPayload = ViewLastDayReport
export type GetWeeklyReportPayload = WeeklyReport
export type UpdateWeeklyReportPayload = Partial<WeeklyReport>
export type DeleteWeeklyReportPayload = string

export interface LoginAction {
  type: TogglActions.LOGIN
  payload: LoginPayload
}

export interface InitApiAction {
  type: TogglActions.INIT_API
  payload: InitApiPayload
}

export interface LogoutAction {
  type: TogglActions.LOGOUT
}

export interface GetClientsAction {
  type: TogglActions.GET_CLIENTS
  payload: GetClientsPayload
}

export interface SetWeeklyReportAction {
  type: TogglActions.SET_WEEKLY_REPORT
  payload: GetWeeklyReportPayload
}
