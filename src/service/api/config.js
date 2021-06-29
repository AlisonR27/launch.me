const axios = require('axios')

const config = {
  base_url: 'https://launchme-api.herokuapp.com/'
}

const instance = axios.create({
  baseURL: config.base_url,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
})

export default instance
