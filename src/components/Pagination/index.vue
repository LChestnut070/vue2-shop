<template>
  <div class="pagination">

    <button @click="$emit('getPageNum', pageNo - 1)" :disabled="pageNo == 1">上一页</button>
    <button v-if="start_end.start > 1" @click="$emit('getPageNum', 1)">1</button>
    <button v-if="start_end.start > 2">···</button>

    <button v-for="(page, index) in start_end.end" :key="index" v-show="page >= start_end.start"
      @click="$emit('getPageNum', page)" :class="{ active: pageNo == page }">{{ page }}</button>

    <button v-if="start_end.end < pageSum - 1">···</button>
    <button v-if="start_end.end < pageSum" @click="$emit('getPageNum', pageSum)">{{ pageSum }}</button>
    <button @click="$emit('getPageNum', pageNo + 1)" :disabled="pageNo == pageSum">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: [
    'pageNo',
    'pageSize',
    // 商品总数
    'total',
    // 中间连续码数
    'continues'
  ],
  computed: {
    pageSum() {
      return Math.ceil(this.total / this.pageSize)
    },
    start_end() {
      let start = 0, end = 0;
      //规定连续页码数字5（totalPage至少5页）
      //不正常现象
      if (this.continues > this.pageSum) {
        start = 1
        end = this.pageSum
      } else {
        //正常现象
        // Math.floor: 向下取整
        start = this.pageNo - Math.floor(this.continues / 2)
        end = this.pageNo + Math.floor(this.continues / 2)
        //当前页面-2小于第一页
        if (start < 1) {
          start = 1
          end = this.continues
        }
        //当前页面+2大于总页数
        if (end > this.pageSum) {
          end = this.pageSum
          start = this.pageSum - this.continues + 1
        }
      }
      return { start, end }
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
