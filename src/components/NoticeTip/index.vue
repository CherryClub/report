<template>
  <div :class="{
    'notice-tip-container':1,
    inline:inline
  }">
    <div class="sign"><slot></slot></div>
    <div class="tip">{{content}}</div>
  </div>
</template>

<script>
export default {
  name:'NoticeTipComponent',
  props:{
    inline:{
      type:Boolean,
      default:true,
    },
    content:{
      type:String,
      default:'',
    },
  },
}
</script>

<style scoped lang='scss'>
.notice-tip-container {
  position: relative;
  &.inline {
    display: inline-block;
    vertical-align: middle;
  }
  .sign {
    &:hover+.tip {
      display: block;
    }
  }
  .tip {
    display: none;
    position: absolute;
    top: 0;
    left: 100%;
    border: 1px solid #ccc;
    color:#ccc;
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    padding:.5em 1.5em;
    width: 200px;
    background: white;
    overflow: hidden;
    z-index: 999;
  }
}
</style>