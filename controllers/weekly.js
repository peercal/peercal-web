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
    // date = new Date('2022-02-14')
    const days = getWeekDays(date)

    const dayEvents = []
    state.allEvents.forEach(event => {
      for (let i = 0; i < days.length; ++i) {
        const day = days[i]
        if (hasEvent(day.date, event)) {
          dayEvents.push({ day, event })
        }
      }
    })

    state.weekly = {
      date,
      year: date.getFullYear(),
      weekNumber: calculateWeekNumber(date),
      days,
      dayEvents
    }

    emitter.emit('render')
  }

  emitter.on('feeds:update', () => setWeekly(state.weekly.date))

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
  emitter.on('toolbar:goto-next', () => {
    if (state.mode === MODE_WEEKLY) {
      const date = state.weekly.date
      const update = new Date(date)
      update.setDate(date.getDate() + 7)
      setWeekly(update)
    }
  })

  // TODO
  // emitter.on('weekly:select-date', (date) => {
  //   state.weekly.selected = date
  //   emitter.emit('render')
  // })

  // TODO
  function moveSelectedDay (offset) {
    console.log('moveSelectedDay', offset)
    // const { selected } = state.monthly
    // const update = new Date(selected)
    // update.setDate(selected.getDate() + offset)
    // setMonthly({
    //   year: update.getFullYear(),
    //   month: update.getMonth(),
    //   selected: update
    // })
  }

  window.addEventListener('keydown', (e) => {
    if (state.mode === MODE_WEEKLY) {
      switch (e.key) {
        case 'ArrowLeft':
          moveSelectedDay(-1)
          break
        case 'ArrowRight':
          moveSelectedDay(+1)
          break
      }
    }
  })

  setWeekly()
}
