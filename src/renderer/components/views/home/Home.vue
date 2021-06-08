<template>
  <div>
    <Weather/>
    <hr>
    <div>
      <p> Hello World! </p>
    </div>
  </div>
</template>

<script>

import Weather from './deps/Weather.vue'
import RecentGames from './deps/RecentGames.vue'

export default {
  data () {
    return {

    }
  },
  components: {
    Weather,
    RecentGames
  }
}
</script>

<style>

</style>