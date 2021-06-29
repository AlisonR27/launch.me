import { get as getPath } from '../../../database/pathDB.js'
import { get } from '../../../database/gameDB'
import { processGame as SaveGame } from '../../igdb/consume-api'
import { readdirSync, readFileSync } from 'fs'
import { ExistingGameException } from '../../../general/exceptions/exceptions.js'
var path = require('path')

export function readManifests () {
  getPath({role: 'root', platform: 'Epic'}).then(pathObj => {
    const manifestAbsPath = pathObj[0].path + '/EpicGamesLauncher/Data/Manifests'
    const folderScan = readdirSync(manifestAbsPath)
    folderScan.forEach(file => {
      if (file.endsWith('.item')) {
        let game = {}
        let epicManifest = JSON.parse(readFileSync(path.resolve(manifestAbsPath + '/' + file)))
        const gameName = epicManifest['DisplayName'].replace(/[^\w\s]/gi, '')
        const gamePlatform = 'Epic'
        get({name: gameName}).then(response => {
          if (response.length > 0) {
            throw new ExistingGameException(gameName + ' is Already at your database')
          } else {
            game.name = gameName
            game.platform = gamePlatform
            SaveGame(gameName, game)
          }
        })
      }
    })
  }).catch(exc => {
    console.log(exc)
  })
}
