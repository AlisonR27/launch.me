<template>
  <div>
    <div class="settings-menu">
      <div class="setting-block" :key="index" v-for="(setting,index) in settings">
        <label :for="index">
          {{setting.label}}
        </label>
        <input :class="setting.isValid ? 'valid' : 'invalid' " type="text" :name="index" @blur=verifyFolder v-model="setting.value">   
      </div>
    </div>
    <ul>
      <li v-bind:key="path._id" v-for="path in paths">
        {{path.path}} | {{path._id}}
      </li>
    </ul>
  </div>
</template>

<script>
import {default as readGames} from '../../../../service/loaders/games/steam/steamFolders'
import { getAll, save } from '../../../../service/database/pathDB.js'
import { default as updateGames } from '../../../../service/loaders/games/steam/games'
import { verifyFolder } from '../../../../service/general/paths/paths'
import { readManifests as updateEpic } from '../../../../service/loaders/games/epic/games'

export default {
  data () {
    return {
      settings: {
        steamPath: {
          label: 'Insert steam path:',
          value: 'C:/Program Files (x86)/Steam',
          fn: this.loadSteam,
          isValid: false
        },
        epicPath: {
          label: 'Insert Epic Games path:',
          value: 'C:/ProgramData/Epic',
          fn: this.loadEpic,
          isValid: false
        }
      },
      paths: []
    }
  },
  mounted () {
    getAll().then((docs) => {
      this.paths = docs
    })
    Object.entries(this.settings).forEach(setting => {
      if (setting[0].substring('Path') !== -1) {
        verifyFolder(setting[1].value).then(response => {
          if (response === 200) {
            this.settings[setting[0]].isValid = true
          } else {
            this.settings[setting[0]].isValid = false
          }
        })
      }
    })
  },
  methods: {
    verifyFolder: function (e) {
      if (e.target.name.substring('Path') !== -1) {
        this.settings[e.target.name].fn(e)
      }
    },
    loadSteam: function (e) {
      this.checkFolder(e)
      readGames(e.target.value)
      updateGames()
    },
    loadEpic: function (e) {
      this.checkFolder(e)
      if (this.settings[e.target.name].isValid) save({ role: 'root', platform: 'Epic', path: e.target.value })
      try {
        updateEpic()
      } catch (exc) {
        console.log(exc)
      }
    },
    checkFolder: function (e) {
      verifyFolder(e.target.value).then(response => {
        if (response === 200) {
          this.settings[e.target.name].isValid = true
        }
      }).catch(err => {
        console.log(err)
        this.settings[e.target.name].isValid = false
      })
    }
  },
  computed: {
  }
}
</script>

<style>
html,body{
  margin:0;
}
.settings-menu{
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
}
.setting-block{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width:100%;
}
.setting-block label{
  max-width:100%;
  margin: 10px 15px 5px 15px;
}
.setting-block input {
  display: block;
  width:100%;
  margin: 10px 15px;
  margin-top:0;
  padding: 5px 10px;
}
.invalid{
  border-color:brown;
}
.valid{
  border-color: lime;
}
</style>