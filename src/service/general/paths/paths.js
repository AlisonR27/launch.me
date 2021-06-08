const fs = require('fs')

function DirectoryNotFoundException (message) {
  this.message = message
  this.name = 'DirectoryNotFoundException'
}

function verifyFolder (path) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(path)) return resolve(200)
    else reject(new DirectoryNotFoundException('Not found'))
  })
}

export {
  verifyFolder
}
