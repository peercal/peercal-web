const app = require('choo')()
const html = require('choo/html')

const {
  WEEKDAYS,
  MONTHS,
  getCurrentWeeks
} = require('./date.js')
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
} = require('./css.js')

app.use((state, emitter) => {
  const month = 1
  const year = 2022
  const weeks = getCurrentWeeks(month, year)
  state.current = { weeks, month, year }

  emitter.on('month:prev', () => {
    // TODO recalculate weeks
    if (state.current.month === 0) {
      state.current.month = 11
      state.current.year--
    } else {
      state.current.month--
    }
    emitter.emit('render')
  })
  emitter.on('month:next', () => {
    // TODO recalculate weeks
    if (state.current.month === 11) {
      state.current.month = 0
      state.current.year++
    } else {
      state.current.month++
    }
    emitter.emit('render')
  })
})

app.route('*', (state, emit) => {
  const { weeks, month, year } = state.current

  return html`<body class=${body}>
    <div class=${calendar}>
      <div class=${calendarHeader}>
        <div class=${calendarHeaderButton} onclick=${gotoPrevMonth}>${'<'}</div>
        <div class=${calendarHeaderTitle}>${MONTHS[month]} ${year}</div>
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
