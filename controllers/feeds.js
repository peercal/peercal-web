const HyperdriveWatcher = require('../lib/hyperdrive-watcher.js')
const { parseEvents } = require('../lib/ics.js')

/**
 * Handle hyperdrive feeds.
 */
module.exports = (state, emitter) => {
  state.feeds = new Map()

  function addReadableFeed (url, background, color) {
    console.log('adding feed', url)
    const watcher = HyperdriveWatcher(url, eventsFileWatcher)
    const feed = { events: [], watcher, background, color }
    state.feeds.set(url, feed)
  }

  function aggregateAllEvents () {
    let result = []
    for (const feed of state.feeds.values()) {
      const { background, color } = feed
      const events = feed.events.map(ev => {
        return { ...ev, background, color }
      })
      result = result.concat(events)
    }
    return result
  }

  function eventsFileWatcher ({ url, data }) {
    const feed = state.feeds.get(url)
    feed.events = parseEvents(data)
    state.allEvents = aggregateAllEvents()
    emitter.emit('feeds:update')
    // TODO remove later, only here for monthly to work
    emitter.emit('render')
  }

  // TODO hardcoded events for now
  // TODO configure colors when adding feeds from the ui, with sane defaults
  addReadableFeed('hyper://0aa6537ae8f41113c583d725305944f00281968b0d23051804361a3436ea4e38/events.ics', 'white', 'black')
  addReadableFeed('hyper://3fe48c75e45aae82ef90cf29027f78fa821eb35c247e7e80dae6dba5105f5909/events.ics', 'blue', 'white')
  addReadableFeed('hyper://7805b255174ccf9e6e8af13ea71bcb9ad347a817984e94e189b1d45eb9fa88d1/events.ics', 'orange', 'black')
}
