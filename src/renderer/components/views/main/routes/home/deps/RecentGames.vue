<template>
  <div class="game-grid"> 
    <GameCard v-for="game in games" :key="game.id" :game="game">
    </GameCard>
  </div>
</template>

<script>
import GameCard from '../../../../../game-card/gameCard.vue'
import { getAll as Best } from '../../../../../../../service/database/gameDB.js'
export default {
  data () {
    return {
      games: []
    }
  },
  mounted () {
    Best().then((response) => {
      this.games = response.splice(0, 5)
    })
  },
  methods: {
  },
  components: {
    GameCard
  }
}
</script>

<style>
.game-grid{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.game-grid .game-item{
  height:300px;
  width:230px;
  border: 10px solid;
  border-image-slice: 1;
  border-width: 4px;
  border-color:transparent
}
.game-item img{
  width: 100%;
  height:100%;
  object-fit: cover;
}
.game-item:hover{
  border-image-source: linear-gradient(to bottom, #b4b4b4, #646464);
}
</style>