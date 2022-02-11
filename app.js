const app = require('choo')()
const html = require('choo/html')

const {
  WEEKDAYS,
  MONTHS,
  previousMonth,
  nextMonth,
  monthDaysFilled,
  daysToWeeks
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
  // TODO set current month
  state.current = { year: 2022, month: 2 }
  state.current.monthDaysFilled = monthDaysFilled(state.current)

  emitter.on('month:prev', () => {
    // TODO recalculate weeks
    const prev = previousMonth(state.current)
    state.current.month = prev.month
    state.current.year = prev.year
    state.current.monthDaysFilled = monthDaysFilled(state.current)
    emitter.emit('render')
  })
  emitter.on('month:next', () => {
    // TODO recalculate weeks
    const next = nextMonth(state.current)
    state.current.month = next.month
    state.current.year = next.year
    state.current.monthDaysFilled = monthDaysFilled(state.current)
    emitter.emit('render')
  })
})

app.route('*', (state, emit) => {
  const { year, month, monthDaysFilled } = state.current
  const weeks = daysToWeeks(monthDaysFilled)

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
