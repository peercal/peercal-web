const app = require('choo')()
const html = require('choo/html')
const css = require('sheetify')

const {
  WEEKDAYS,
  MONTHS,
  previousMonth,
  nextMonth,
  monthDaysFilled,
  daysToWeeks
} = require('./lib/date.js')
const {
  monthContainer,
  weekContainer,
  dayContainer
} = require('./lib/css.js')

const toolbar = require('./components/toolbar.js')
const header = require('./components/header.js')

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

const body = css`
  :host {
    height: 100%;
    margin: 0px;
    overflow: hidden;
    font-family: monospace;
    background: black;
    color: white;
    font-size: 14px;
  }
`

const calendar = css`
  :host {
    position: absolute;
    top: 30px;
    bottom: 30px;
    left: 30px;
    right: 30px;
    color: white;
  }
`

app.route('*', (state, emit) => {
  const { year, month, monthWeeks } = state.current

  return html`<body class=${body}>
    <div class=${calendar}>
      ${toolbar({ year, month: MONTHS[month] }, emit)}
      ${header({ weekdays: WEEKDAYS })}
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
