<template>
  <nav>
    <div class=""> </div>
    <div class="">
      <a :href="item.path" :key="i" v-for="(item,i) in routes">
        {{item.name}}
      </a>  
    </div>
    <div class=""> </div>
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
    this.$router.options.routes.forEach(route => {
      this.routes.push({
        name: route.name,
        path: route.path
      })
    })
  },
  methods: {

  }
}
</script>

<style>

</style>