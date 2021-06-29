<template>
  <!--  -->
  <a @click="openModal()" class="game-item">
    <img :src="coverURL(game)" alt="">
  </a>
</template>

<script>
export default {
  props: {
    game: {
      type: Object
    }
  },
  methods: {
    coverURL: function (game) {
      try {
        const url = 'https://' + game.cover.url
        return url
      } catch (e) {
        console.log(e)
      }
    },
    openModal: function () {
      this.$store.dispatch('openGameModal', this.game)
    }
  }
}
</script>

<style>

</style>