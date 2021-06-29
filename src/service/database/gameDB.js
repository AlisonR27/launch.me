import db from './datastore'
const connection = db.games

function save (game) {
  get({name: game.name}).then(docs => {
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
  return new Promise((resolve, reject) => {
    connection.find({}, function (err, docs) {
      if (err) reject(err)
      resolve(docs)
    })
  })
}

export {
  getAll,
  save,
  get
}
