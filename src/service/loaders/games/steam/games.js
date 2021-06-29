import { get as getPath } from '../../../database/pathDB.js'
import { get } from '../../../database/gameDB'
import { readFileSync, readdirSync } from 'fs'
import { processGame as SaveGame } from '../../igdb/consume-api'
import { ExistingGameException } from '../../../general/exceptions/exceptions.js'
// var _ = require('lodash')

export default function updateGames () {
  getPath({ platform: 'Steam', role: 'game' }).then(paths => {
    try {
      paths.forEach(pathObj => {
        const folderScan = readdirSync(pathObj.path + '/steamapps/')
        folderScan.forEach(file => {
          if (file.endsWith('.acf')) {
            let game = {}
            let gameName = ''
            let fileRead = readFileSync(pathObj.path + '/steamapps/' + file).toString()
            let res = `"name"\\s*"(.*)"`
            let p = fileRead.match(new RegExp(res, 'g'))
            if (!p) return '?'
            let j = p[0].match(new RegExp(res))
            gameName = j[1]
            res = `"appid"\\s*"(.*)"`
            p = fileRead.match(new RegExp(res, 'g'))
            if (!p) return '?'
            j = p[0].match(new RegExp(res))
            let appid = j[1]
            game['platform'] = 'Steam'
            game['shortcut'] = 'steam://rungameid/' + appid
            get({name: gameName}).then(response => {
              if (response.length > 0) {
                throw new ExistingGameException(gameName + ' is Already at your database')
              } else {
                const added = SaveGame(gameName, game)
                return added
              }
            })
          }
        })
      })
    } catch (exc) {
      console.log(exc)
    }
  })
}
