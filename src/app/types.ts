export interface WeeklyReport {
  worked: number
  left: number
  client: string
  projects: string[]
  weekHours: number
}

export interface ViewWeeklyReport {
  workedHours: string
  leftHours: string
  percentageWorked: number
  client: string
  projects: string[]
  weekHours: number
}

export interface TimeEntry {
  client: string
  project: string
  hex_color: string
  time_entry: string
  time: string
}

export interface ViewLastDayReport {
  total: string
  entries: TimeEntry[]
}
