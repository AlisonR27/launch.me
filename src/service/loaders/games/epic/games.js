import { get as getPath } from '../../../database/pathDB.js'
import { save as SaveGame } from '../../../database/gameDB'
import { readdirSync, readFileSync } from 'fs'
var path = require('path')

export function readManifests () {
  getPath({role: 'root', platform: 'Epic'}).then(pathObj => {
    const manifestAbsPath = pathObj[0].path + '/EpicGamesLauncher/Data/Manifests'
    const folderScan = readdirSync(manifestAbsPath)
    folderScan.forEach(file => {
      if (file.endsWith('.item')) {
        let game = {}
        let epicManifest = JSON.parse(readFileSync(path.resolve(manifestAbsPath + '/' + file)))
        game.appid = null
        game.name = epicManifest['DisplayName']
        game.sizeondisk = epicManifest['InstallSize']
        game.lastupdated = null
        game.platform = 'Epic'
        game.lastPlayed = 0
        SaveGame(game)
      }
    })
  }).catch(exc => {
    console.log(exc)
  })
}
