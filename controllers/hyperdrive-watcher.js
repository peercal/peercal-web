const path = require('path')
path.posix = path // work-around for https://github.com/andrewosh/mountable-hypertrie/pull/5

const Hyperdrive = require('hyperdrive')
const hyperswarm = require('hyperswarm-web')
const idbStorage = require('random-access-idb')
const ram = require('random-access-memory')
const pump = require('pump')

// TODO move to config.js
const DEFAULT_SWARM_OPTS = {
  bootstrap: ['wss://hyperswarm.linkping.org']
}

module.exports = (url, onUpdate) => {
  const swarm = hyperswarm(DEFAULT_SWARM_OPTS)
  const [key, file = 'events.ics'] = url.split('hyper://').filter(Boolean)[0].split('/')
  const drive = new Hyperdrive(createStorage(url), key)

  function readFile () {
    drive.readFile(file, 'utf-8', (err, data) => {
      if (err) {
        console.error('drive.readFile() error', err.message)
      } else {
        onUpdate({ url, data })
      }
    })
  }

  drive.once('ready', () => {
    console.log('DRIVE ready', url)
    swarm.join(drive.discoveryKey)
    drive.watch('/')

    drive.on('update', () => {
      console.log('DRIVE update - reading file', url)
      readFile()
    })

    readFile()
  })

  swarm.on('connection', (socket, info) => {
    const peer = info.peer
    pump(socket, drive.replicate(info.client), socket, (err) => {
      if (err) console.log('hyperdrive: pump ERROR', err.message)
    })
    socket.on('error', (err) => {
      console.log('hyperdrive: stream ERROR for peer', peer.host, err.message)
    })
  })

  // TODO return an object that can shut down the drive and the swarm
  return {}
}

function createStorage (url) {
  try {
    return idbStorage(url)
  } catch (e) {
    console.error('random-access-idb failed, falling back to ram', e)
    return ram
  }
}
