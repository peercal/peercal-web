const app = require('choo')()
const html = require('choo/html')

const {
  monthToString,
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
  state.current = {
    month: 1,
    year: 2022
  }

  emitter.on('month:prev', () => {
    if (state.current.month === 0) {
      state.current.month = 11
      state.current.year--
    } else {
      state.current.month--
    }
    emitter.emit('render')
  })
  emitter.on('month:next', () => {
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
  const { month, year } = state.current
  const weeks = getCurrentWeeks(month, year)

  return html`<body class=${body}>
    <div class=${calendar}>
      <div class=${calendarHeader}>
        <div class=${calendarHeaderButton} onclick=${gotoPrevMonth}>${'<'}</div>
        <div class=${calendarHeaderTitle}>${monthToString(month)} ${year}</div>
        <div class=${calendarHeaderButton} onclick=${gotoNextMonth}>${'>'}</div>
      </div>
      <div class=${weekdaysHeader}>
        <div class=${weekdayHeaderCell}>mon</div>
        <div class=${weekdayHeaderCell}>tue</div>
        <div class=${weekdayHeaderCell}>wed</div>
        <div class=${weekdayHeaderCell}>thu</div>
        <div class=${weekdayHeaderCell}>fri</div>
        <div class=${weekdayHeaderCell}>sat</div>
        <div class=${weekdayHeaderCell}>sun</div>
      </div>
      <div class=${monthContainer}>
        ${weeks.map(renderWeek)}
      </div>
    </div>
  </body>`

  function gotoPrevMonth () { emit('month:prev') }
  function gotoNextMonth () { emit('month:next') }
})

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
