import { DateTime } from 'luxon'

export function formatTimestamp(dateTime: DateTime | string | Date, timezone: string = 'Pacific/Auckland'): string {
  let dt: DateTime
  
  if (typeof dateTime === 'string') {
    dt = DateTime.fromISO(dateTime)
  } else if (dateTime instanceof Date) {
    dt = DateTime.fromJSDate(dateTime)
  } else {
    dt = dateTime
  }

  if (!dt.isValid) {
    return 'invalid date'
  }

  return dt.setZone(timezone).toLocaleString(DateTime.DATETIME_MED)
}

export function formatDateLong(date: string | Date): string {
  const dt = typeof date === 'string' ? DateTime.fromISO(date) : DateTime.fromJSDate(date)
  return dt.toLocaleString({ weekday: 'long', month: 'long', day: 'numeric' })
}
