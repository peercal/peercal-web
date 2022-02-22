const {
  previousMonth,
  nextMonth,
  monthDaysFilled,
  daysToWeeks
} = require('../lib/date.js')
const { filterEventsFromDate } = require('../lib/ics.js')
const { MODE_MONTHLY } = require('../modes.js')

/**
 * Handle montly
 */
module.exports = (state, emitter) => {
  state.monthly = {}

  function setMonthly (monthly) {
    const { allEvents } = state
    state.monthly = monthly
    const days = monthDaysFilled(monthly).map(day => {
      const events = filterEventsFromDate(allEvents, day.date)
      return { ...day, events }
    })
    state.monthly.weeks = daysToWeeks(days)
    emitter.emit('render')
  }

  function setToday () {
    const today = new Date()
    setMonthly({
      year: today.getFullYear(),
      month: today.getMonth(),
      selected: today
    })
  }

  emitter.on('feeds:update', () => setMonthly(state.monthly))

  emitter.on('toolbar:goto-previous', () => {
    if (state.mode === MODE_MONTHLY) {
      setMonthly(previousMonth(state.monthly))
    }
  })
  emitter.on('toolbar:goto-home', () => {
    if (state.mode === MODE_MONTHLY) {
      setToday()
    }
  })
  emitter.on('toolbar:goto-next', () => {
    if (state.mode === MODE_MONTHLY) {
      setMonthly(nextMonth(state.monthly))
    }
  })

  emitter.on('monthly:select-date', (date) => {
    state.monthly.selected = date
    emitter.emit('render')
  })

  function moveSelectedDay (offset) {
    const { selected } = state.monthly
    const update = new Date(selected)
    update.setDate(selected.getDate() + offset)
    setMonthly({
      year: update.getFullYear(),
      month: update.getMonth(),
      selected: update
    })
  }

  window.addEventListener('keydown', (e) => {
    if (state.mode === MODE_MONTHLY) {
      switch (e.key) {
        case 'ArrowLeft':
          moveSelectedDay(-1)
          break
        case 'ArrowRight':
          moveSelectedDay(+1)
          break
        case 'ArrowUp':
          moveSelectedDay(-7)
          break
        case 'ArrowDown':
          moveSelectedDay(+7)
          break
      }
    }
  })

  setToday()
}
