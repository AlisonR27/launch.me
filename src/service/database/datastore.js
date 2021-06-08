import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'

const dbFactory = file =>
  new Datastore({
    filename: `${path.join(remote.app.getPath('userData'))}/data/${file}`,
    autoload: true
  })

const db = {
  users: dbFactory('users.db'),
  config: dbFactory('config.db'),
  games: dbFactory('games.db'),
  paths: dbFactory('paths.db')
}

export default db
