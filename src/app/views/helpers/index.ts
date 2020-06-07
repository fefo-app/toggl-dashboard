export * from "./store";
export * from "./transformTogglWeeklyReport";
export * from "./transformToViewLastDayReport";
export * from "./transformToViewWeeklyReport";
export * from "./DateCalculator"
export * from "./fromMsToHumanTime"
export * from "./fromProjectResponseToProjectAndClient"


export function log(msg: string) {
  console.debug(`%c[${(new Date()).toISOString()}]: ${msg}`, 'font-weight: bold; color: purple')
}
