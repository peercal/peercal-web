const app = require('choo')()
const html = require('choo/html')

const {
  WEEKDAYS,
  MONTHS,
  previousMonth,
  nextMonth,
  getMonthDays
} = require('./lib/date.js')
const {
  body,
  calendar,
  calendarHeader,
  calendarHeaderButton,
  calendarHeaderTitle,
  weekdaysHeader,
  weekdayHeaderCell,
  monthContainer,
  weekContainer,
  dayContainer
} = require('./lib/css.js')

app.use((state, emitter) => {
  const year = 2022
  const month = 2
  state.current = { year, month }

  // TODO put in a function to gather days from previous, current and next month
  const prev = previousMonth(state.current)
  const next = nextMonth(state.current)

  const prevDays = getMonthDays(prev)
  const nextDays = getMonthDays(next)

  console.log('prevDays', prevDays)
  console.log('nextDays', nextDays)

  // TODO rename property to something else, like monthDays
  state.current.days = getMonthDays(state.current)

  emitter.on('month:prev', () => {
    // TODO recalculate weeks
    const prev = previousMonth(state.current)
    state.current.month = prev.month
    state.current.year = prev.year
    emitter.emit('render')
  })
  emitter.on('month:next', () => {
    // TODO recalculate weeks
    const next = nextMonth(state.current)
    state.current.month = next.month
    state.current.year = next.year
    emitter.emit('render')
  })
})

app.route('*', (state, emit) => {
  const { year, month, days } = state.current
  const weeks = daysToWeeks(days)

  return html`<body class=${body}>
    <div class=${calendar}>
      <div class=${calendarHeader}>
        <div class=${calendarHeaderButton} onclick=${gotoPrevMonth}>${'<'}</div>
        <div class=${calendarHeaderTitle}>${MONTHS[month - 1]} ${year}</div>
        <div class=${calendarHeaderButton} onclick=${gotoNextMonth}>${'>'}</div>
      </div>
      <div class=${weekdaysHeader}>${WEEKDAYS.map(renderWeekdayCell)}</div>
      <div class=${monthContainer}>${weeks.map(renderWeek)}</div>
    </div>
  </body>`

  function gotoPrevMonth () { emit('month:prev') }
  function gotoNextMonth () { emit('month:next') }
})

function renderWeekdayCell (weekday) {
  return html`<div class=${weekdayHeaderCell}>${weekday}</div>`
}

/**
 * Split up an array of days into array of weeks.
 * We assume that the days array always is a multiple of 7.
 */
function daysToWeeks (days) {
  if (days.length % 7 !== 0) {
    console.error('days array should be a multiple of 7')
    return []
  }

  const result = []

  let currentWeek = null
  for (let i = 0; i < days.length; ++i) {
    if (i % 7 === 0) {
      // This is a monday so we start a new week.
      currentWeek = []
    }
    currentWeek.push(days[i])
    if ((i + 1) % 7 === 0) {
      // i is a Sunday, so we're done with this week.
      result.push(currentWeek)
    }
  }

  return result
}

function renderWeek (week) {
  return html`<div class=${weekContainer}>
    ${week.map(renderDay)}
  </div>`
}

function renderDay (day) {
  return html`<div class=${dayContainer}>
    ${day.day}
  </div>`
}

app.mount(document.body)
