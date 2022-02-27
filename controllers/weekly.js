const {
  calculateWeekNumber,
  getWeekDays
} = require('../lib/date.js')
const { hasEvent } = require('../lib/ics.js')
const { MODE_WEEKLY } = require('../modes.js')

/**
 * Handle montly
 */
module.exports = (state, emitter) => {
  state.weekly = {}

  function setWeekly (date = new Date()) {
    const days = getWeekDays(date)

    const events = []
    state.allEvents.forEach(event => {
      for (let i = 0; i < days.length; ++i) {
        const day = days[i]
        if (hasEvent(day.date, event)) {
          events.push({ day, event })
        }
      }
    })

    state.weekly = {
      date,
      year: date.getFullYear(),
      weekNumber: calculateWeekNumber(date),
      days,
      events
    }

    emitter.emit('render')
  }

  emitter.on('feeds:update', () => setWeekly(state.weekly.date))

  emitter.on('touch:longpress:week', (date) => {
    setWeekly(date)
    emitter.emit('pushState', '/weekly')
  })

  emitter.on('swipe:right', () => {
    if (state.mode === MODE_WEEKLY) {
      const date = state.weekly.date
      const update = new Date(date)
      update.setDate(date.getDate() - 7)
      setWeekly(update)
    }
  })
  emitter.on('toolbar:goto-previous', () => {
    if (state.mode === MODE_WEEKLY) {
      const date = state.weekly.date
      const update = new Date(date)
      update.setDate(date.getDate() - 7)
      setWeekly(update)
    }
  })

  emitter.on('toolbar:goto-home', () => {
    if (state.mode === MODE_WEEKLY) {
      setWeekly()
    }
  })

  emitter.on('swipe:left', () => {
    if (state.mode === MODE_WEEKLY) {
      const date = state.weekly.date
      const update = new Date(date)
      update.setDate(date.getDate() + 7)
      setWeekly(update)
    }
  })
  emitter.on('toolbar:goto-next', () => {
    if (state.mode === MODE_WEEKLY) {
      const date = state.weekly.date
      const update = new Date(date)
      update.setDate(date.getDate() + 7)
      setWeekly(update)
    }
  })

  setWeekly()
}
