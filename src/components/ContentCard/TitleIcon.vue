<style scoped lang="scss">
.title-icon-container {
  width: 30px;
  height: 30px;
  background: url("~@/assets/images/content-tit-icon-2.png") no-repeat;
  background-size: auto 100%;
  position: relative;
  $_0259B7: #0259b7;
  $_CCE5FF: #cce5ff;
  $_007BFF: #007bff; // opacity 14
  &.dark {
    $_0259B7_dark: #ffffff;
    $_CCE5FF_dark: #cce5ff;
    $_007BFF_dark: #000000; // opacity 14
    .big-square {
      background-color: $_0259B7_dark;
    }
    .small-square {
      background-color: $_CCE5FF_dark;
    }
    .bottom-block {
      background-color: $_007BFF_dark;
    }
  }
  .big-square {
    width: 18px;
    height: 18px;
    background-color: $_0259B7;
    position: absolute;
    top: 0;
    left: 0;
  }
  .small-square {
    width: 12px;
    height: 12px;
    background-color: $_CCE5FF;
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .bottom-block {
    width: 21px;
    height: 9px;
    background-color: $_007BFF;
    position: absolute;
    bottom: 0;
    left: 0;
    opacity: 14%;
    filter: blur(4px);
  }
}
</style>
<template>
  <div :class="{ 'title-icon-container': 1, dark: dark }">
    <!-- <div class="bottom-block"></div> -->
    <!-- <div class="small-square"></div> -->
    <!-- <div class="big-square"></div> -->
  </div>
</template>

<script>
export default {
  name: "TitleIcon",
  props: {
    dark: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
