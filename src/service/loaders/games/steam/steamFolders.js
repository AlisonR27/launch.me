import {save as savePath} from '../../../database/pathDB'
const { readFileSync, readdirSync } = require('fs')
// var _ = require('lodash')
// const fs = require('fs')
let steamInstallFolder = []
let steamAppsFolder = []

function DirectoryNotFoundException (message) {
  this.message = message
  this.name = 'DirectoryNotFoundException'
}

const readingLibraryFunction = function () {
  const libraryFile = readFileSync(steamAppsFolder + '/libraryfolders.vdf').toString()
  let folders = libraryFile.match(/.*"\d{1,2}".*/g)
  for (let path of folders) {
    let aPath = path.match(/"(\d)"(?:\s*)"(.*)"/)
    if (aPath) {
      const path = {
        path: aPath[2].replace(/\\\\/g, '/'),
        platform: 'Steam',
        role: 'game'
      }
      savePath(path)
    }
  }
}

const readingLibrary = function () {
  readingLibraryFunction()
}

function recursiveAsyncReadLine (path) {
  try {
    let folderScan = readdirSync(path.replace(/\\/g, '/'))
    for (const file of folderScan) {
      if (file.toString() === 'steamapps') {
        steamInstallFolder = path.replace(/\\/g, '/')
        steamAppsFolder = steamInstallFolder + '/steamapps'
        readingLibrary()
      }
    }
  } catch (exc) {
    throw new DirectoryNotFoundException('Diretório da Steam não encontrado, tente novamente!')
  }
}

const readGames = (pathx) => {
  recursiveAsyncReadLine(pathx)
}

export default readGames
