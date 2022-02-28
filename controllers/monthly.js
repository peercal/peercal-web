const {
  previousMonth,
  nextMonth,
  monthDaysFilled,
  daysToWeeks
} = require('../lib/date.js')
const { filterEventsFromDate } = require('../lib/ics.js')

/**
 * Handle monthly
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

  emitter.on('monthly:swipe:right', () => setMonthly(previousMonth(state.monthly)))
  emitter.on('monthly:toolbar:goto-previous', () => setMonthly(previousMonth(state.monthly)))
  emitter.on('monthly:toolbar:goto-home', () => setToday())
  emitter.on('monthly:toolbar:goto-next', () => setMonthly(nextMonth(state.monthly)))
  emitter.on('monthly:swipe:left', () => setMonthly(nextMonth(state.monthly)))

  emitter.on('monthly:select-date', (date) => {
    state.monthly.selected = new Date(date)
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
    if (state.route === '/') {
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
