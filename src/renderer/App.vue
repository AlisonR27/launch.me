<template>
  <div id="app">
    <navbar />
    <router-view></router-view>
  </div>
</template>

<script>
import { init } from '../service/loaders/routine'
import navbar from './components/navigation/navbar/navbar.vue'

export default {
  name: 'launchme',
  components: {
    navbar
  },
  beforeCreate () {
    init()
  },
  methods: {
  }
}
window.addEventListener('keydown', e => {
  const navbar = document.querySelector('.navbar')
  if (e.key === 'ArrowDown') {
    navbar.classList.toggle('show')
  }
})
</script>

<style>
@font-face{
  font-family: "Raleway";
  src:url(../fonts/Raleway.ttf);
}
  /* CSS */
  body * {
    font-family: 'Raleway';
    color:white !important;
    font-feature-settings: 'pnum' on, 'lnum' on;
    font-weight:bold;
  }
  input {
    color:black !important;
  }
  #app{
    height:100%;
    width: 100%;
  }
</style>
