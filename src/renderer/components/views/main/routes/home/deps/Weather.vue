<template>
  <div class="deck">
    <div class="weather">
      <div class="temperature">
        26°C
      </div>
      <div>
        Feels like: 30°C
      </div>
    </div>
    <div class="news">
      
    </div>    
  </div>
</template>

<script>
export default {

}
</script>

<style>
.deck{
  margin: 0 4px;
  width:100%;
  display: flex;
  flex-direction: row;
}
.deck .weather {
  display: flex;
  flex-direction: column;
  text-align: right;
  font-size:1.8rem
}
.temperature {
  font-size:20vh;
  line-height:20vh;
}
</style>