<template>
  <div class="homeBody">
    <Weather />
    <hr>
    <RecentGames> </RecentGames>
  </div>
</template>

<script>
import RecentGames from './deps/RecentGames.vue'
import Weather from './deps/Weather.vue'
export default {
  data () {
    return {

    }
  },
  components: {
    RecentGames,
    Weather
  }
}
</script>

<style>
hr{
  height: 2px;
  width: 80vw;
  margin-left:-5vw;
  border:0;
  background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8631827731092436) 30%, rgba(255,255,255,1) 50%, rgba(255,255,255,1) 70%, rgba(255,255,255,0) 100%);
}
.homeBody {
  margin-top:4em;
  padding: 0 15vw;
  height:calc(100vh - 4em);

  display:flex;
  flex-direction: column;
  
  justify-content: center;
}
</style>