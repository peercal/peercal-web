const {
  calculateWeekNumber,
  getWeekDays
} = require('../lib/date.js')
const { hasEvent } = require('../lib/ics.js')

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

  emitter.on('weekly:swipe:right', () => {
    const date = state.weekly.date
    const update = new Date(date)
    update.setDate(date.getDate() - 7)
    setWeekly(update)
  })
  emitter.on('weekly:toolbar:goto-previous', () => {
    const date = state.weekly.date
    const update = new Date(date)
    update.setDate(date.getDate() - 7)
    setWeekly(update)
  })
  emitter.on('weekly:toolbar:goto-home', () => setWeekly())

  emitter.on('weekly:swipe:left', () => {
    const date = state.weekly.date
    const update = new Date(date)
    update.setDate(date.getDate() + 7)
    setWeekly(update)
  })
  emitter.on('weekly:toolbar:goto-next', () => {
    const date = state.weekly.date
    const update = new Date(date)
    update.setDate(date.getDate() + 7)
    setWeekly(update)
  })

  setWeekly()
}
