export function formatDateTime(value: string | Date) {
  const date = new Date(value)
  const leadToTwoDigits = (part: number) => String(part).padStart(2, '0')

  const time = `${leadToTwoDigits(date.getHours())}:${leadToTwoDigits(date.getMinutes())}`
  const day = `${leadToTwoDigits(date.getDate())}.${leadToTwoDigits(date.getMonth() + 1)}.${String(date.getFullYear()).slice(-2)}`

  return `${time} ${day}`
}
