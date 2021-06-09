import db from './datastore'
const connection = db.games

function NoRecordsException (message) {
  this.message = message
  this.name = 'NoRecordsException'
}

function save (game) {
  get({name: game.name}).then(docs => {
    console.log(docs)
    if (docs.length < 1) {
      return new Promise((resolve, reject) => {
        connection.insert(game, function (err, newDoc) {
          if (err) reject(err)
          resolve(newDoc)
        })
      })
    }
  })
}

function get (game) {
  return new Promise((resolve, reject) => {
    connection.find(game, function (err, docs) {
      if (err) reject(err)
      resolve(docs)
    })
  })
}

function getAll () {
  connection.find({}, (exc, docs) => {
    // if (exc) throw new DatabaseException(exc)
    if (docs.length < 1) throw new NoRecordsException('Not even a single game was found.')
    return docs
  })
}

export {
  getAll,
  save,
  get
}
