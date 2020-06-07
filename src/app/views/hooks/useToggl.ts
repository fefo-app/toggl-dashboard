import { Reducer, useEffect, useReducer } from 'react'
import {
  deleteWeeklyReport,
  getClientsDispatcher,
  getLastDayReportDispatcher,
  getWeeklyReportDispatcher,
  initialState,
  TogglAction,
  togglReducer,
  TogglState,
  updateWeeklyReport
} from '../../store/toggl'
import { TogglClient } from '../../../services/toggle/entities'
import { WeeklyReport } from '../../types'
import { BrowserStore } from '../helpers'

export function useToggl() {
  const storedState = BrowserStore.get('ToggleApp')
  const [
    { user, clients, weeklyReports, lastDayReport },
    dispatch
  ] = useReducer<Reducer<TogglState, TogglAction>>(
    togglReducer,
    storedState || initialState
  )

  useEffect(() => {
    if (Boolean(user) && Object.keys(user).length > 0) {
      getClientsDispatcher(dispatch, user)()
    }
  }, [user])

  return {
    user,
    clients,
    weeklyReports,
    lastDayReport,
    addReport: (client: TogglClient) =>
      getWeeklyReportDispatcher(dispatch, user)(client),
    deleteReport: (clientName: string) =>
      dispatch(deleteWeeklyReport(clientName) as TogglAction),
    updateReport: (client: Partial<WeeklyReport>) =>
      dispatch(updateWeeklyReport(client) as TogglAction),
    getLastDayReport: getLastDayReportDispatcher(dispatch, user),
    dispatch
  }
}
