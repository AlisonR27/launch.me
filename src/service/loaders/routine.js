import { default as updateSteamGames } from '../loaders/games/steam/games'
import { readManifests as updateEpicGames } from '../loaders/games/epic/games'
import { generateAppFolders } from '../../service/general/paths/paths'

const bootRoutine = {
  generateAppFolders: generateAppFolders,
  updateSteamGames: updateSteamGames,
  updateEpicGames: updateEpicGames
}

function init () {
  Object.entries(bootRoutine).forEach(([prop, func]) => {
    try {
      console.log('Running routine function: ', prop)
      func()
    } catch (e) {
      console.log('Failed into loading the: ', prop, e)
    }
  })
}

export {
  init
}
