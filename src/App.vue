<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: "App",
  data(){return {}},
};
</script>
<style lang="scss">

html {
  width: 1920px;
  transform-origin: 0 0;
  overflow-x: hidden;
  body {
    #app {
    } 
  }
}
* {
  margin: 0;
  padding: 0;
  box-sizing: content-box;
}
</style>
<style scoped lang="scss">

</style>
