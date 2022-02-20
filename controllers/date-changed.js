/**
 * Re-render if the day has changed.
 */
module.exports = (state, emitter) => {
  let lastDate = new Date()
  // Re-render if the day has changed.
  setInterval(() => {
    const date = new Date()
    if (date.getDate() !== lastDate.getDate()) {
      lastDate = date
      emitter.emit('render')
    }
  }, 60 * 1000)
}
