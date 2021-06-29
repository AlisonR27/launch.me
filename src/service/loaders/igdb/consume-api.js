import { save as storeGame } from '../../database/gameDB'
import {default as API} from '../../api/config'
import { storeThumbnails } from './thumbnails/store-thumbnails'

const processGame = (gameName, gameData) => {
  const game = gameData
  API.post('game', {
    GameName: gameName
  }).then((response) => {
    Object.entries(response.data[0]).forEach(prop => {
      Object.assign(game, response.data[0])
    })
    const storedCoverURL = storeThumbnails(game.cover.url, game.id)
    game.cover.url = storedCoverURL
    storeGame(game)
    return game
  })
}

export {
  processGame
}
