<template>
  <div v-if="isOpen" class="modal-backdrop">
    <div class="modal">
      <span class="close-btn" @click="closeModal">
        &#10005;
      </span>
      <div class="modal-header">
        <div class="gameinfo">
          <h2>{{game.name}}</h2>
          <small>{{game.platform}}</small>
        </div>
        <div class="background-image">
          <img :src="false" alt="" class="modal-background">
        </div>
      </div>
      <div class="modal-body">
        <ul class="link-list">
          <li v-for="item in game.menu" :key="item.id">
            <a class="" @click="item.command">
              {{item.label}}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
  },
  computed: {
    isOpen () {
      return this.$store.state.isGameModalOpened
    },
    game () {
      const game = this.$store.state.currentGame
      console.log(game)
      const items = [{
        command: function () {
          console.log(game.shortcut)
          window.location.href = game.shortcut
        },
        label: 'Open Game'
      }, {
        command: '#uiui',
        label: 'Go to Twitch'
      }, {
        command: '#uiui',
        label: 'Go to Twitch'
      }]
      game.menu = items
      return game
    }
  },
  methods: {
    closeModal () {
      this.$store.commit('toggleGameModal')
    }
  }
}
</script>

<style lang="scss">
  .modal{
    width:40vw;
    height:800px;
    top: 8em;
    left: 0;
    right:0;
    padding: 0 20px;
    position: absolute;
    margin: auto;
    background:#606060;
    z-index: 10;
    text-align:center;
    .modal-header{
      width: 100%;
      position: relative;

      .gameinfo {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        text-align: left;
        z-index:11;
        position: absolute;
        margin-top:-20px;
        font-weight:bold;
        width: 100%;
        height: 100%;
      }

      .background-image{
        margin: 0 -20px;
        width:calc(100% + 40px);
        height:150px;
        overflow:hidden;
        img {
          margin-left:-5px;
          height:101%;
          width:101%;
          filter: brightness(0.4) blur(3px) ;
          object-fit:cover;
        }
      }
    }
    .modal-body{
      display: flex;
      flex-direction: column;
      text-align: center;
    }
  }
  .modal-backdrop{
    content: '';
    width: 100vw;
    height:100vh;
    top:0;
    left:0;
    position: absolute;
    background-color: rgba(40,40,40,.9);
    backdrop-filter: blur(3px);
    z-index: 2;
    
    .close-btn{
      z-index: 15;
      display:inline;
      width:1em;
      right:15px;
      top:15px;
      cursor:pointer;
      position: absolute;
      filter:blur(0 0 3px rgba(255,255,255,.3))
    }
  }
  .link-list{
    list-style: none;
    padding:0;
    li a {
      display: block;
      width: 100%;
      padding:20px 0;
      text-align: center;
      text-decoration: none;
      &:hover {
          box-shadow: inset 0 0 40px 0px rgba(255, 255, 255, 0.90);
      }
    }
  }
  .link-list li {
    position: relative;
    width:100%;
  }
</style>