<template>
  <div id="app">
    <navbar />
    <router-view></router-view>
  </div>
</template>

<script>
import navbar from './components/navigation/navbar/navbar.vue'

export default {
  name: 'launchme',
  components: {
    navbar
  }
}
</script>

<style>
  /* CSS */
</style>
