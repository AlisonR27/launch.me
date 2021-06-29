<template>
  <nav class="navbar">
    <div class=""> </div>
    <div class="navbar-nav">
      <router-link class="nav-link" :class="$route.name == item.name ? 'active' : ''" :to="item.name" :key="i" v-for="(item,i) in routes">
        {{item.name}}
      </router-link>  
    </div>
    <div class="">
      <router-link to="Settings">
        Settings
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      routes: []
    }
  },
  mounted () {
    this.$router.options.routes.filter(item => item.name === 'Land').forEach(route => {
      route.children.forEach(item => {
        this.routes.push({
          name: item.name,
          path: item.path
        })
      })
    })
  },
  methods: {
  }
}
</script>

<style>
.navbar {
  display:flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 20px 0;
  width: 100%;

  position: absolute;
}
.navbar.show {
  top:0;
}
.navbar:not(.show){
  top:-6em;
}
.nav-link {
  text-decoration: none;
  padding:10px 20px;
}
.nav-link:not(:first-of-type){
  margin-left:5px;
}
.nav-link:hover, .nav-link.active {
  border-bottom: 2px solid white;
}
</style>