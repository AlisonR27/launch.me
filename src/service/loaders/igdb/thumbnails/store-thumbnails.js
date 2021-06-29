import Axios from 'axios'
const fs = require('fs')

function storeThumbnails (thumbnailURL, gameID) {
  return downloadImages(thumbnailURL, gameID)
}

function downloadImages (thumbnailURL, gameID) {
  let cacheFolder = process.env.CACHE_FOLDER
  var url = `https:${thumbnailURL.replace('thumb', '720p')}`
  Axios.get(url, {
    responseType: 'arraybuffer'
  }).then(response => {
    const thumbFile = `${cacheFolder}/cover_${gameID}.png`
    try {
      fs.writeFileSync(`${thumbFile}`, Buffer.from(response.data, 'binary').toString('base64'), { flag: 'wx', encoding: 'base64' })
      return thumbFile
    } catch (err) {
      if (err instanceof fs.constants.EEXISTS) {
        console.log('Cover for that game already exists.', err)
      }
    }
  }).catch(err => {
    console.log(err)
  })
}
export {
  storeThumbnails
}
