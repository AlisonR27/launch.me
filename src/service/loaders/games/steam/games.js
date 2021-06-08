import { get as getPath } from '../../../database/pathDB.js'
import { readFileSync, readdirSync } from 'fs'
import { save as SaveGame } from '../../../database/gameDB'
// var _ = require('lodash')
const gameInfos = ['appid', 'name', 'SizeOnDisk', 'LastUpdated', 'platform', 'lastPlayed']

export default function updateGames () {
  getPath({ source: 'Steam' }).then(paths => {
    try {
      paths.forEach(pathObj => {
        const folderScan = readdirSync(pathObj.path + '/steamapps/')
        folderScan.forEach(file => {
          if (file.endsWith('.acf')) {
            let game = {}
            let fileRead = readFileSync(pathObj.path + '/steamapps/' + file).toString()
            gameInfos.forEach(info => {
              const res = `"${info}"\\s*"(.*)"`

              const p = fileRead.match(new RegExp(res, 'g'))

              if (!p) return '?'

              let j = p[0].match(new RegExp(res))

              game[info.toLowerCase()] = j[1]
            })
            game['platform'] = 'Steam'

            game['shortcut'] = 'steam://rungameid/' + game.appid

            const added = SaveGame(game)

            return added
          }
        })
      })
    } catch (exc) {
      console.log(exc)
    }
  })
}
