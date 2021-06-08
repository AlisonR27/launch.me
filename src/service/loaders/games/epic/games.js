import { get as getPath } from '../../../database/pathDB.js'
import { save as SaveGame } from '../../../database/gameDB'

import { readdirSync } from 'fs'

function readManifests () {
  getPath({role: 'root', source: 'Epic'}).then(pathObj => {
    const manifestAbsPath = pathObj.path + '/EpicGamesLauncher/Data/Manifests'
    const folderScan = readdirSync(manifestAbsPath)
    folderScan.forEach(file => {
      if (file.endsWith('.item')) {
        let game = {}
        let epicManifest = require(manifestAbsPath)
        console.log(epicManifest)
        game.appid = null
        game.name = epicManifest['DisplayName']
        game.sizeondisk = epicManifest['InstallSize']
        game.lastupdated = null
        game.platform = 'Epic'
        game.lastPlayed = 0
        SaveGame(game)
      }
    })
  })
}

export {
  readManifests
}
