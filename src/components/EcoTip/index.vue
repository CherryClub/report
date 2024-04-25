
<style scoped lang='scss'>
  .eco-tip-container {
    width: 360px;
    height: 122px;
    background: #eaf7ff;
    border-radius: 10px;
    .eco-tip-padding {
      position: relative;
      width: 100%;
      height: 100%;
      padding: 19px 32px 10px;
      box-sizing: border-box;
      &>* {
        box-sizing: content-box;
      }
      .label {
        height: 33px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 24px;
        color: #6A6A6A;
        line-height: 33px;
        // text-align: right;
        font-style: normal;
      }
      .value {
        margin-top: 8px;
        height: 50px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 600;
        font-size: 36px;
        color: #217ffa;
        line-height: 50px;
        // text-align: right;
        font-style: normal;
      }
      .icon-wrapper {
        position: absolute;
        right: 32px;
        top: 19px;
        width: 80px;
        height: 80px;
        .icon {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
<template>
  <div class="eco-tip-container">
    <div class="eco-tip-padding">
      <div class="label">{{label}}</div>
      <div class="value">{{value}}</div>
      <div class="icon-wrapper"><el-image class="icon" :src="icon" /></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EcoTip',
  props:{
    label: {
      type: String,
      default: ''
    },
    value: {
      type: [String,Number],
      default: ''
    },
    icon: {
      type: String,
      default: ''
    }
  },
}
</script>
