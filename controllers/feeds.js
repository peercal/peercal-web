const { parseEvents } = require('../lib/ics.js')
const HyperdriveWatcher = require('./hyperdrive-watcher.js')

/**
 * Handle hyperdrive feeds.
 */
module.exports = ({ feeds, swarmOpts }) => {
  return (state, emitter) => {
    state.feeds = new Map()

    function addReadOnlyFeed ({ url, background, color }) {
      console.log('Adding read only feed', url)
      const watcher = HyperdriveWatcher({ url, onFeedUpdate, swarmOpts })
      const feed = { events: [], watcher, background, color, readOnly: true }
      state.feeds.set(url, feed)
    }

    function aggregateAllEvents () {
      let result = []
      for (const feed of state.feeds.values()) {
        result = result.concat(feed.events)
      }
      return result
    }

    function onFeedUpdate ({ url, data }) {
      const feed = state.feeds.get(url)
      const { background, color, readOnly } = feed
      feed.events = parseEvents(data, { url, background, color, readOnly })
      state.allEvents = aggregateAllEvents()
      emitter.emit('feeds:update')
    }

    feeds.forEach(addReadOnlyFeed)
  }
}
