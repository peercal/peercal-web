const { hasEvent } = require('../lib/ics.js')

/**
 * Handle daily
 */
module.exports = (state, emitter) => {
  state.daily = {}

  function setDaily (date = new Date()) {
    date = new Date('2022-02-20')
    const events = []
    state.allEvents.forEach(event => {
      if (hasEvent(date, event)) {
        events.push(event)
      }
    })

    state.daily = {
      date,
      year: date.getFullYear(),
      events
    }

    emitter.emit('render')
  }

  emitter.on('feeds:update', () => setDaily(state.daily.date))

  emitter.on('daily:swipe:right', () => {
    const date = state.daily.date
    const update = new Date(date)
    update.setDate(date.getDate() - 1)
    setDaily(update)
  })
  emitter.on('daily:toolbar:goto-previous', () => {
    const date = state.daily.date
    const update = new Date(date)
    update.setDate(date.getDate() - 1)
    setDaily(update)
  })
  emitter.on('daily:toolbar:goto-home', () => setDaily())

  emitter.on('daily:swipe:left', () => {
    const date = state.daily.date
    const update = new Date(date)
    update.setDate(date.getDate() + 1)
    setDaily(update)
  })
  emitter.on('daily:toolbar:goto-next', () => {
    const date = state.daily.date
    const update = new Date(date)
    update.setDate(date.getDate() + 1)
    setDaily(update)
  })

  setDaily()
}
