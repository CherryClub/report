<style lang='scss'>
html body #app .common-table-component-wrapper .el-table {
  &.thBgColor {
    --thBgColor:'';
    --thBgAlpha:'100%';
    .el-table__header-wrapper {
      .el-table__header {
        .el-table__cell {
          background-color: var(--thBgColor);
          .cell {
            color:white;
          }
        }
      }
    }
  }
  &.tripeColor {
    --tripeColor:'';
    --tripeAlpha:'100%';
    .el-table__body-wrapper {
      .el-table__body {
        .el-table__row--striped {
          .el-table__cell {
            background-color: var(--tripeColor);
          }
        }
      }
    }
  }
}
</style>
<template>
  <div class="common-table-component-wrapper">
    <el-table
      ref="table"
      border
      stripe
      v-loading="loading"
      :data="list"
      @selection-change="handleSelectionChange"
      @row-click="$emit('row-click', $event)"
      @current-change="$emit('current-change', $event)"
      :highlight-current-row="highlightCurrent"
      :row-key="$attrs.rowKey"
      :expand-row-keys="$attrs.expandRowKeys"
      :cell-style="cellStyle"
      @expand-change="$emit('expand-change', $event)"
      :style="{
        '--thBgColor':thBgRgba,
        '--tripeColor':tripeRgba,
      }"
      :class="{
        thBgColor:thBgColor,
        tripeColor:tripeColor,
      }"
    >
      <el-table-column
        v-if="selection"
        type="selection"
        width="50"
        align="center"
      />
      <template v-for="(col, index) in columnConfigList">
        <el-table-column
          :key="index"
          v-if="col.visible && !(col.isFomatted || col.isCustom)"
          :width="col.width"
          :sortable="col.sortable"
          :resizable="col.resizable"
          :show-overflow-tooltip="col.showOverflowTip"
          :type="col.type"
          :prop="col.prop"
          :label="col.langLabel"
          align="center"
          :class-name="col.className"
          :fixed="col.fixed"
        />
        <el-table-column
          :key="index"
          v-if="
            col.visible && col.isFomatted && col.formatMethod && !col.isCustom
          "
          :width="col.width"
          :sortable="col.sortable"
          :resizable="col.resizable"
          :show-overflow-tooltip="col.showOverflowTip"
          :type="col.type"
          :prop="col.prop"
          :label="col.langLabel"
          align="center"
          :class-name="col.className"
          :formatter="(row) => loopFormat(row, col.formatMethod)"
          :fixed="col.fixed"
        />
        <template v-if="col.visible && col.isCustom">
          <slot v-if="!col.customType" :col="col" :index="index"></slot>
          <el-table-column
            v-if="col.customKey === 'index' && !col.customType"
            label="序号"
            align="center"
            :key="index"
            :fixed="col.fixed"
          >
            <template slot-scope="scope">
              {{ transIndex(scope.$index) }}
            </template>
          </el-table-column>
          <template v-if="col.customType">
            <el-table-column
              :key="index"
              :width="col.width"
              :sortable="col.sortable"
              :resizable="col.resizable"
              :show-overflow-tooltip="col.showOverflowTip"
              :type="col.type"
              :label="col.langLabel"
              align="center"
              :class-name="col.className"
              :fixed="col.fixed"
            >
              <template slot-scope="scope">
                <slot
                  :name="col.customType"
                  :row="scope.row"
                  :rowIndex="scope.$index"
                  :col="col"
                  :colIndex="index"
                ></slot>
              </template>
            </el-table-column>
          </template>
        </template>
      </template>
    </el-table>
    <div
      v-if="isPagination"
      v-show="total > 0"
      :class="{ hidden: hidden }"
      class="pagination-container"
    >
      <el-pagination
        :background="background"
        :current-page="pageNum"
        :page-size="pageSize"
        :layout="layout"
        :page-sizes="pageSizes"
        :pager-count="pagerCount"
        :total="total"
        v-bind="$attrs"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { scrollTo } from "@/utils/scroll-to";
export default {
  props: {
    invokeComponent: {
      type: Vue,
      default: null,
    },
    columnConfigList: {
      type: Array,
      default: () => [],
    },
    list: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    isPagination: {
      type: Boolean,
      default: false,
    },
    total: {
      type: Number,
      default: 0,
    },
    pageNum: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    selection: {
      type: Boolean,
      default: false,
    },
    highlightCurrent: {
      type: Boolean,
      default: false,
    },
    limit: {
      type: Number,
      default: 20,
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50];
      },
    },
    // 移动端页码按钮的数量端默认值5
    pagerCount: {
      type: Number,
      default: document.body.clientWidth < 992 ? 5 : 7,
    },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper",
    },
    background: {
      type: Boolean,
      default: true,
    },
    autoScroll: {
      type: Boolean,
      default: true,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
    cellStyle: {
      type: Function,
      default: () => {
        return {};
      },
    },
    thBgColor:{
      type:String,
      default:""
    },
    thBgAlpha:{
      type:String,
      default:""
    },
    tripeColor:{
      type:String,
      default:""
    },
    tripeAlpha:{
      type:String,
      default:""
    },
  },
  computed:{
    thBgRgba(){
      if(!this.thBgColor){
        return ''
      }else{
        if(!this.thBgAlpha){
          return this.thBgColor
        }else{
          let color = this.thBgColor
          let red = +('0x'+color.slice(1,3))
          let green = +('0x'+color.slice(3,5))
          let blur = +('0x'+color.slice(5))
          let alpha = this.thBgAlpha
          return `rgba(${red},${green},${blur},${alpha})`
        }
      }
    },
    tripeRgba(){
      if(!this.tripeColor){
        return ''
      }else{
        if(!this.tripeAlpha){
          return this.tripeColor
        }else{
          let color = this.tripeColor
          let red = +('0x'+color.slice(1,3))
          let green = +('0x'+color.slice(3,5))
          let blur = +('0x'+color.slice(5))
          let alpha = this.tripeAlpha
          return `rgba(${red},${green},${blur},${alpha})`
        }
      }
    },
  },
  data() {
    return {
      tableColumns: [],
      isFlex: false,
    };
  },
  methods: {
    handleSelectionChange(val) {
      if (!this.selection) {
        return;
      }
      this.$emit("selectionChange", val);
    },
    handleStatusChange(row) {
      this.$emit("statusChange", row);
    },
    handleColumnChange(result) {
      this.tableColumns = result;
      this.$nextTick(() => {
        this.$refs.table.doLayout();
      });
    },
    loopFormat(row = {}, formatter = "") {
      let parent = this.invokeComponent;
      if (!parent || !parent[formatter]) {
        console.error(`${formatter} 未在this 上定义`);
        return "";
      }
      return parent[formatter](row);
    },
    handleSizeChange(val) {
      let page = this.pageNum * val > this.total ? 1 : this.pageNum;
      this.$emit("pagination", { pageNum: page, pageSize: val });
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    },
    handleCurrentChange(val) {
      this.$emit("pagination", { pageNum: val, pageSize: this.pageSize });
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    },
    transIndex(index) {
      if (this.isPagination) {
        return (this.pageNum - 1) * this.pageSize + index + 1;
      } else {
        return index + 1;
      }
    },
    doLayout() {
      this.$refs.table.doLayout();
    },
  },
};
</script>

<style></style>
