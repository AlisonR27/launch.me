import path from 'path'

const fs = require('fs')

function DirectoryNotFoundException (message) {
  this.message = message
  this.name = 'DirectoryNotFoundException'
}

function generateAppFolders () {
  const url = path.join(process.env.APPDATA, '/launchme/cache')
  if (!fs.existsSync(url)) {
    fs.mkdirSync(url, {recursive: true}).then(() => {
      console.log('Pasta de dados do aplicativo criada.')
    }).catch(err => {
      console.log('Falha ao criar pasta da aplicação.', err)
    })
  } else {
    process.env.CACHE_FOLDER = path.join(process.env.APPDATA, '/launchme/cache')
  }
}

function verifyFolder (path) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(path)) return resolve(200)
    else reject(new DirectoryNotFoundException('Not found'))
  })
}

export {
  verifyFolder,
  generateAppFolders
}
