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
  weekdaysHeader,
  weekdayHeaderCell,
  monthContainer,
  weekContainer,
  dayContainer
} = require('./lib/css.js')

const toolbar = require('./components/toolbar.js')

app.use((state, emitter) => {
  function setCurrentMonth (opts) {
    state.current = opts
    state.current.monthWeeks = daysToWeeks(monthDaysFilled(opts))
  }

  // TODO set month based on todays month
  setCurrentMonth({ year: 2022, month: 1 })

  emitter.on('month:prev', () => {
    setCurrentMonth(previousMonth(state.current))
    emitter.emit('render')
  })
  emitter.on('month:next', () => {
    setCurrentMonth(nextMonth(state.current))
    emitter.emit('render')
  })
})

app.route('*', (state, emit) => {
  const { year, month, monthWeeks } = state.current

  return html`<body class=${body}>
    <div class=${calendar}>
      ${toolbar({ year, month: MONTHS[month] }, emit)}
      <div class=${weekdaysHeader}>
        ${WEEKDAYS.map(weekday => html`<div class=${weekdayHeaderCell}>${weekday}</div>`)}
      </div>
      <div class=${monthContainer}>
        ${monthWeeks.map(week => (
          html`<div class=${weekContainer}>
            ${week.map(day => {
              const { date } = day
              const cstyle = `background-color: ${date.getMonth() === month ? 'black' : '#111'}`
              return html`<div class=${dayContainer} style=${cstyle}>${date.getDate()}</div>`
            })}
          </div>`
        ))}
      </div>
    </div>
  </body>`
})

app.mount(document.body)
