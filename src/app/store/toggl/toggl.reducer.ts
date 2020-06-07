import {
  GetClientsPayload,
  LoginPayload,
  TogglAction,
  TogglActions,
  UpdateWeeklyReportPayload
} from './toggl.actionTypes'
import { BrowserStore } from '../../views/helpers'
import { TogglClient, User } from '../../../services/toggle'
import { TimeEntry, ViewLastDayReport, WeeklyReport } from '../../types'

const reduceEntriesToRecord = <T>(entries: [string, T][]): Record<string, T> =>
  entries.reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {})

export interface TogglState {
  user: User
  clients: Record<string, TogglClient>
  weeklyReports: {
    data: Record<string, WeeklyReport>
    loading: boolean
  }
  lastDayReport: {
    data: ViewLastDayReport
    loading: boolean
  }
}

export const initialState: TogglState = {
  user: {} as User,
  clients: {} as Record<string, TogglClient>,
  weeklyReports: {
    data: {},
    loading: false
  },
  lastDayReport: {
    loading: false,
    data: {
      total: '0',
      entries: [] as TimeEntry[]
    }
  }
}

function reducer(state = initialState, action: TogglAction): TogglState {
  switch (action.type) {
    case TogglActions.LOGIN: {
      const user = action.payload as LoginPayload
      return {
        ...state,
        user
      }
    }
    case TogglActions.LOGOUT: {
      return initialState
    }
    case TogglActions.GET_CLIENTS: {
      const clients = action.payload as GetClientsPayload
      return {
        ...state,
        clients: clients.reduce(
          (acc, client) => ({ ...acc, [client.id]: client }),
          {} as Record<string, TogglClient>
        )
      }
    }
    case TogglActions.SET_WEEKLY_REPORT: {
      const { client } = action.payload as WeeklyReport
      const stateClient = state.weeklyReports.data[client] as WeeklyReport

      if (stateClient) {
        return {
          ...state,
          weeklyReports: {
            loading: false,
            data: {
              ...state.weeklyReports.data,
              [client]: {
                ...(action.payload as WeeklyReport),
                weekHours: stateClient.weekHours
              }
            }
          }
        }
      } else {
        return {
          ...state,
          weeklyReports: {
            loading: false,
            data: {
              ...state.weeklyReports.data,
              [client]: action.payload as WeeklyReport
            }
          }
        }
      }
    }
    case TogglActions.UPDATE_WEEKLY_REPORT: {
      const { client, weekHours } = action.payload as UpdateWeeklyReportPayload
      if (client) {
        const stateClient = state.weeklyReports.data[client] as WeeklyReport
        return {
          ...state,
          weeklyReports: {
            loading: false,
            data: {
              ...state.weeklyReports.data,
              [client]: {
                ...stateClient,
                weekHours: weekHours!
              }
            }
          }
        }
      } else {
        return state
      }
    }
    case TogglActions.DELETE_WEEKLY_REPORT:
      return {
        ...state,
        weeklyReports: {
          loading: false,
          data: reduceEntriesToRecord(
            Object.entries(state.weeklyReports.data).filter(
              ([k]) => k !== action.payload
            )
          )
        }
      }
    case TogglActions.GET_WEEKLY_REPORT:
      return {
        ...state,
        weeklyReports: {
          ...state.weeklyReports,
          loading: true
        }
      }
    case TogglActions.GET_LAST_DAY_REPORT:
      return {
        ...state,
        lastDayReport: {
          ...state.lastDayReport,
          loading: true
        }
      }
    case TogglActions.SET_LAST_DAY_REPORT:
      return {
        ...state,
        lastDayReport: {
          data: action.payload as ViewLastDayReport,
          loading: false
        }
      }
    default:
      return state
  }
}

export function togglReducer(state: TogglState, action: TogglAction) {
  const newState = reducer(state, action)
  console.debug('ACTION', action.type, action.payload)

  BrowserStore.set('ToggleApp', newState)
  return newState
}
