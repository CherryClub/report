<style scoped lang="scss">
.content-card-container {
  padding-top: 25px;
  padding-bottom: 32px;
  margin-bottom: 16px;
  background: #fff;
  box-shadow: 0px 8px 16px 0px rgba(184, 192, 209, 0.6);
  .content-card-title {
    padding-left: 37px;
    display: flex;
    align-items: center;
    height: 46px;
    line-height: 46px;
    // .title-icon {

    // }
    .title-text {
      font-family: SourceHanSansSC, SourceHanSansSC;
      // margin-left: 19px;
      font-size: 32px;
      font-weight: bold;
      color: #3d3d3d;
      font-weight: 500;

      padding-bottom: 5px;
      background-repeat: no-repeat;
      width: -webkit-fill-available;
      background-image: url("~@/assets/images/content-tit-line-1.png");
      background-position-y: bottom;
    }
  }
  .content-card-content {
    overflow-x: hidden;
    margin-top: 25px;
    margin-left: 50px;
    margin-right: 50px;
  }

  &.dark {
    background: #4c5368;
    color: #ffffff;
    .content-card-title {
      .title-text {
        color: #ffffff;
      }
    }
  }
}
</style>
<template>
  <div :class="{ 'content-card-container': 1, dark: dark || isThemeDark }">
    <div class="content-card-title">
      <div class="title-icon"><title-icon :dark="dark || isThemeDark" /></div>
      <div class="title-text">{{ title }}</div>
    </div>
    <div class="content-card-content"><slot></slot></div>
  </div>
</template>

<script>
import TitleIcon from "./TitleIcon";
export default {
  name: "ContentCard",
  inject: ["getTheme"],
  components: {
    TitleIcon,
  },
  props: {
    title: {
      type: String,
      default: "标题",
    },
    dark: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isThemeDark() {
      return this.getTheme() === "dark";
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
