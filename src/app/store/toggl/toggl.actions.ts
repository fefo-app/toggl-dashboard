import {
  createTogglApiRequest,
  TogglClient,
  togglLogin,
  User
} from '../../../services/toggle'
import { Dispatch } from 'react'
import {
  GetClientsAction,
  LoginAction,
  SetWeeklyReportAction,
  TogglAction,
  TogglActions,
  TogglPayload
} from './toggl.actionTypes'
import { SummaryReportResponse } from '../../../services/toggle/dto/Report/SummaryReportResponse'
import {
  transformTogglWeeklyReport,
  transformToViewLastDayReport
} from '../../views/helpers'
import { WeeklyReportResponse } from '../../../services/toggle/dto/Report/WeeklyReportResponse'

const actionCreator = (type: TogglActions) => (payload?: TogglPayload) => ({
  type,
  payload
})

const login = actionCreator(TogglActions.LOGIN)
const getClients = actionCreator(TogglActions.GET_CLIENTS)
const getLastDayReport = actionCreator(TogglActions.GET_LAST_DAY_REPORT)
const setLastDayReport = actionCreator(TogglActions.SET_LAST_DAY_REPORT)
const getWeeklyReport = actionCreator(TogglActions.GET_WEEKLY_REPORT)

export const logout = actionCreator(TogglActions.LOGOUT)
export const initApi = actionCreator(TogglActions.INIT_API)

export const loginDispatcher = (dispatch: Dispatch<TogglAction>) => (
  username: string,
  password: string
) => {
  togglLogin(username, password)
    .then((data) => {
      dispatch(login(data) as LoginAction)
    })
    .catch((err) => {
      console.error(err.toString())
    })
}

export const getClientsDispatcher = (
  dispatch: Dispatch<TogglAction>,
  user: User
) => () => {
  createTogglApiRequest(user)
    .getClients()
    .then((json) => {
      dispatch(getClients(json) as GetClientsAction)
    })
    .catch((err) => {
      dispatch(<TogglAction>getClients([]))
      console.error(err.toString())
    })
}

export const getLastDayReportDispatcher = (
  dispatch: Dispatch<TogglAction>,
  user: User
) => () => {
  createTogglApiRequest(user)
    .getLastDayReport()
    .then((json: SummaryReportResponse) => {
      dispatch(
        setLastDayReport(
          transformToViewLastDayReport(json)
        ) as TogglAction
      )
    })
    .catch((err) => {
      console.error(err.toString())
    })
  dispatch(getLastDayReport() as TogglAction)
}

export const getWeeklyReportDispatcher = (
  dispatch: Dispatch<TogglAction>,
  user: User
) => (client: TogglClient) => {
  createTogglApiRequest(user)
    .getClientWeeklyReport(client)
    .then((json: WeeklyReportResponse) => {
      dispatch(
        setWeeklyReport(
          transformTogglWeeklyReport(json)
        ) as SetWeeklyReportAction
      )
    })
    .catch((err) => {
      console.error(err.toString())
    })
  dispatch(getWeeklyReport() as TogglAction)
}

export const setWeeklyReport = actionCreator(TogglActions.SET_WEEKLY_REPORT)

export const updateWeeklyReport = actionCreator(
  TogglActions.UPDATE_WEEKLY_REPORT
)
export const deleteWeeklyReport = actionCreator(
  TogglActions.DELETE_WEEKLY_REPORT
)
