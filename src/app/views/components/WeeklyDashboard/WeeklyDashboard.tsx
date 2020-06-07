import { SelectClient } from '../SelectClient'
import React, { FormEvent, useEffect, useMemo } from 'react'

import { transformToViewWeeklyReport } from '../../helpers'
import { generateOnInputChange } from '../../handlers'
import { TogglClient } from '../../../../services/toggle/entities'
import { ClientWeeklyDashboard } from '../ClientWeeklyDashboard'
import StyledWrapper from './WeeklyDashboard.styled'
import { BarChart } from '@styled-icons/material'
import { WeeklyReport } from '../../../types'

interface WeeklyDashboardProps {
  clients: Record<string, TogglClient>
  reports: Record<string, WeeklyReport>
  loading: boolean
  addReport: (client: TogglClient) => void
  updateReport: (report: Partial<WeeklyReport>) => void
  deleteReport: (clientName: string) => void
}

export function WeeklyDashboard({
  clients,
  reports,
  loading,
  addReport,
  updateReport,
  deleteReport
}: WeeklyDashboardProps) {
  const clientsByName: Record<string, TogglClient> = useMemo(
    () =>
      Object.values(clients).reduce(
        (acc, client) => ({
          ...acc,
          [client.name]: client
        }),
        {}
      ),
    [clients]
  )

  const handleOnSubmit = (event: FormEvent) => {
    event.preventDefault()
    const [clientId] = Object.values(event.target).map((x) => x.value)
    const newClient = clients[clientId]
    if (newClient) {
      addReport(newClient)
    }
  }

  useEffect(() => {
    addReport(Object.values(clients)[0])
  }, [])

  // const onReload = () => dispatch(getWeeklyReports(client))

  return (
    <StyledWrapper>
      <div className='form'>
        <SelectClient
          submitLabel={
            <span>
              <BarChart size={20} />
            </span>
          }
          onSubmit={handleOnSubmit}
          clients={Object.values(clients)}
        />
      </div>
      <div className='reports'>
        {!!Object.values(reports).length &&
          Object.values(reports).map((report) => (
            <ClientWeeklyDashboard
              key={report.client}
              report={transformToViewWeeklyReport(report)}
              loading={loading}
              onDelete={() => deleteReport(report.client)}
              onReload={() =>
                addReport(clientsByName[report.client]! as TogglClient)
              }
              onChange={generateOnInputChange((newHours: string) => {
                updateReport({
                  weekHours: +newHours,
                  client: report.client
                })
              })}
            />
          ))}
      </div>
    </StyledWrapper>
  )
}
