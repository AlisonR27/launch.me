<template>
<div>
  <NormalCard/>
  <router-view></router-view>
</div>
</template>

<script>
import NormalCard from '../../modals/normalModal.vue'

export default {
  name: 'Main',
  data () {
    return {

    }
  },
  components: {
    NormalCard
  }
}
</script>

<style>

</style>