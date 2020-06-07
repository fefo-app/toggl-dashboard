import React, { useEffect } from 'react'
import StyleWrapper, { StyledEntry } from './LastDayReport.styled'
import { TimeEntry } from '../../../types'
import { ReloadButton, Spinner } from '../atoms'

export interface LastDayReportProps {
  total: string
  entries: TimeEntry[]
  loading: boolean
  onUpdate: () => void
}

export function LastDayReport({
  total = '0',
  entries = [],
  loading = false,
  onUpdate = () => {}
}: LastDayReportProps) {
  useEffect(() => {
    onUpdate()
  }, [])

  return (
    <StyleWrapper>
      <span className='title'>
        {loading ? (
          <Spinner size={24} />
        ) : (
          <ReloadButton size={24} onClick={onUpdate} />
        )}
        <h3> Último día: {total}</h3>
      </span>
      {entries.length ? (
        <ul className='entries'>
          {!!entries?.length &&
            entries.map(({ time_entry, hex_color, project, client, time }) => (
              <StyledEntry color={hex_color} key={time_entry + project}>
                <span className='entry'>
                  <span className='time'>{time}</span>
                  {time_entry}
                </span>
                <small className='client'>
                  <span className='project-dot' />
                  <span>
                    {client} - {project}
                  </span>
                </small>
              </StyledEntry>
            ))}
        </ul>
      ) : (
        <span>No data</span>
      )}
    </StyleWrapper>
  )
}
