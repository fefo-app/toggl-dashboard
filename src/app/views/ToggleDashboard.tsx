import React from 'react'
import StyleWrapper from './ToggleDashboard.style'
import { Login, Logout } from './components'
import { useToggl } from './hooks'
import { WeeklyDashboard } from './containers/WeeklyDashboard'
import { LastDayReport } from './components/LastDayReport'

let counter = 0

export function ToggleDashboard() {
  const {
    user,
    clients,
    dispatch,
    getLastDayReport,
    lastDayReport,
    addReport,
    deleteReport,
    updateReport,
    weeklyReports
  } = useToggl()
  console.debug('Rendering: ', ++counter)

  return (
    <StyleWrapper>
      {Object.keys(user).length === 0 ? (
        <Login dispatch={dispatch} />
      ) : (
        <div>
          <Logout dispatch={dispatch} />
          {!!clients && Object.keys(clients).length && (
            <WeeklyDashboard
              clients={clients}
              loading={weeklyReports.loading}
              addReport={addReport}
              deleteReport={deleteReport}
              reports={weeklyReports.data}
              updateReport={updateReport}
            />
          )}
          <LastDayReport
            entries={lastDayReport?.data?.entries}
            onUpdate={getLastDayReport}
            total={lastDayReport?.data?.total}
            loading={lastDayReport.loading}
          />
        </div>
      )}
    </StyleWrapper>
  )
}
