import React, { ChangeEventHandler, MouseEventHandler } from 'react'
import { ViewWeeklyReport } from '../../../types'
import StyleWrapper from './ClientWeeklyDashboard.styled'
import { HourglassEmpty, HourglassFull } from '@styled-icons/material'
import { InputRange, Spinner, Pill, ReloadButton, TrashButton } from '../atoms'

interface ClientWeeklyDashboardProps {
  report: ViewWeeklyReport
  onChange: ChangeEventHandler
  onReload: MouseEventHandler
  onDelete: MouseEventHandler
  loading: boolean
}

export function ClientWeeklyDashboard({
  report,
  onChange,
  onDelete,
  onReload,
  loading
}: ClientWeeklyDashboardProps) {
  const hours = report.weekHours || '35'

  return (
    !!Object.keys(report) && (
      <StyleWrapper {...report}>
        <div className='weekly-hours'>
          <InputRange value={hours} onChange={onChange} min={1} max={40} />
          &nbsp; {hours} &nbsp;
        </div>
        <div className='progress'>
          <span />
        </div>
        <div className='worked'>
          <small>{report.workedHours}</small>
          <div>{report.percentageWorked}%</div>
        </div>
        <div className='menu'>
          {loading ? (
            <Spinner size={24} />
          ) : (
            <ReloadButton size={24} onClick={onReload} />
          )}{' '}
          <TrashButton onClick={onDelete} size={24} />
        </div>
        <div className='projects'>
          <h3>{report.client}</h3>

          <div className='left-time'>
            <div>
              {report.leftHours.includes('-') ? (
                <HourglassFull
                  style={{
                    color: 'darkorange'
                  }}
                  size={20}
                />
              ) : (
                <HourglassEmpty
                  style={{
                    color: 'LightGreen'
                  }}
                  size={20}
                />
              )}
            </div>
            <div className='left-hours'>{report.leftHours}</div>
          </div>
          <ul>
            {!!report.projects &&
              report.projects.map((project) => (
                <li className='project' key={project}>
                  <Pill>{project}</Pill>
                </li>
              ))}
          </ul>
        </div>
      </StyleWrapper>
    )
  )
}
