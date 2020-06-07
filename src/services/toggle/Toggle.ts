import { TogglClient, User } from './entities'
import { DateCalculator, Days } from '../../app/views/helpers/DateCalculator'
import { SummaryReportResponse } from './dto/Report/SummaryReportResponse'

export interface TogglAPI {
  getClients: () => Promise<TogglClient[]>
  getClientWeeklyReport: ({ id, wid }: TogglClient) => Promise<any>
  getLastDayReport: () => Promise<SummaryReportResponse>
}

const apiUrl = 'https://www.toggl.com/api/v8'
const apiUrlReport = 'https://toggl.com/reports/api/v2'

function getAuthHeaders(key: string, value = 'api_token') {
  const headers = new Headers()
  headers.append(
    'Authorization',
    `Basic ${Buffer.from(`${key}:${value}`).toString('base64')}`
  )
  return headers
}

export async function togglLogin(
  username: string,
  password: string
): Promise<User> {
  console.debug('Toggle.login', username)
  const response = await fetch(`${apiUrl}/me`, {
    headers: getAuthHeaders(username, password)
  })
  const payload = await response.json()
  console.log('LOGIN -', response.status, payload)
  const user = payload?.data
  return user
}

export function createTogglApiRequest({
  api_token: apiToken,
  default_wid: workspace,
  email
}: User): TogglAPI {
  return {
    getClients: async function (): Promise<TogglClient[]> {
      const response = await fetch(`${apiUrl}/clients`, {
        headers: getAuthHeaders(apiToken)
      })
      console.log('GET CLIENTS -', response.status)
      if (response.status === 200) {
        return await response.json()
      }
      throw new Error('Error getting client - ' + response.statusText)
    },

    getClientWeeklyReport: async function ({
      id,
      wid
    }: TogglClient): Promise<any> {
      const lastMonday = DateCalculator.calcLastWeekday(Days.Monday)
      const url = `${apiUrlReport}/weekly?workspace_id=${wid}&client_ids=${id}&user_agent=${email}&since=${lastMonday}"`
      console.debug('REQUEST CLIENTS WEEKLY REPORT-', url)
      const response = await fetch(url, {
        headers: getAuthHeaders(apiToken)
      })
      console.log('GET CLIENTS WEEKLY REPORT-', response.status)
      if (response.status === 200) {
        return await response.json()
      }
      console.error(response.url)
      throw new Error(
        'Error getting client weekly report - ' + response.statusText
      )
    },

    getLastDayReport: async function (): Promise<SummaryReportResponse> {
      const lastWorkday = DateCalculator.calcLastWorkday()
      const response = await fetch(
        `${apiUrlReport}/summary?workspace_id=${workspace}&user_agent=${email}&since=${lastWorkday}"&until=${lastWorkday}`,
        {
          headers: getAuthHeaders(apiToken)
        }
      )
      console.log('GET LAST DAY REPORT-', response.status)
      if (response.status === 200) {
        return await response.json()
      }
      console.error(response.url)
      throw new Error('Error getting last day report - ' + response.statusText)
    }
  }
}
