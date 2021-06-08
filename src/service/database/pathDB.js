import db from './datastore'
const connection = db.paths

// function DatabaseException (message) {
//   this.message = message
//   this.name = 'DatabaseException'
// }

// function NoRecordsException(message) {
//   this.message = message
//   this.name = 'NoRecordsException'
// }

export function save (path) {
  // This will try to find some record with the same path to prevent duplicates
  get({path: path.path}).then(docs => {
    if (docs.length > 0) return false
    // Inserting Down Below
    else {
      return new Promise((resolve, reject) => {
        connection.insert(path, function (err, newDoc) {
          if (err) reject(err)
          resolve(newDoc)
        })
      })
    }
  })
}

export function get (obj) {
  return new Promise((resolve, reject) => {
    connection.find(obj, function (err, docs) {
      if (err) reject(err)
      resolve(docs)
    })
  })
}

export function getAll () {
  return new Promise((resolve, reject) => {
    connection.find({}, function (err, docs) {
      if (err) reject(err)
      resolve(docs)
    })
  })
}
