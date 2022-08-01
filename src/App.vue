<template>
  <div id="app">
<!--    <img src="./assets/logo.png">-->
    <router-view/>

  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  width: 800px;
  margin: 50px auto 0;
}
h2, h3, p {
  margin: 10px 0;
}
div, ul li, p {
  line-height: 26px;
}
</style>
