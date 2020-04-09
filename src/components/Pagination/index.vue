<template>
  <div :class="{'hidden':hidden}" class="pagination-container">
    <el-pagination
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
      <el-button :disabled="firstDisabled" @click="toFirstPage" size="mini">首页</el-button>
    </el-pagination>
    <el-pagination
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      layout="slot"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
      <el-button :disabled="lastDisabled" @click="toLastPage" size="mini">尾页</el-button>
    </el-pagination>
    <div class="pagination-pageData pageEditer">共{{Math.ceil(total/limit)}}页</div>
    <div class="pagination-pageData pageEditer">每页{{limit}}条</div>
    <div class="pagination-pageData pageEditer">合计{{total}}条数据</div>
  </div>
</template>

<script>
import { scrollTo } from "@/utils/scroll-to";

export default {
  name: "Pagination",

  data() {
    return {
      totalPage: Math.ceil(this.total / this.limit),
      firstDisabled: false,
      lastDisabled: false
    };
  },
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default() {
        return [2, 20, 30, 50];
      }
    },
    layout: {
      type: String,
      // default: 'total, sizes, prev, pager, next, jumper'
      default: "slot, prev, pager, next"
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    total(val) {
      this.total = val;
      this.totalPage = Math.ceil(val / this.limit);
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit("update:page", val);
      }
    },
    pageSize: {
      get() {
        return this.limit;
      },
      set(val) {
        this.$emit("update:limit", val);
      }
    },
    isLastDisabled() {
      if (this.totalPage <= 0) {
        return true;
      }
      return this.currentPage == this.totalPage ? true : false;
    }
  },
  methods: {
    handleSizeChange: function(val) {
      let that = this;

      this.$emit("pagination", { page: this.currentPage, limit: val });
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    },
    handleCurrentChange: function(val) {
      this.firstDisabled = val == 1 ? true : false;
      this.lastDisabled = val == this.totalPage ? true : false;

      this.$emit("pagination", { page: val, limit: this.pageSize });
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    },
    toFirstPage() {
      this.currentPage = 1;
      this.handleCurrentChange();
    },
    toLastPage() {
      this.currentPage = this.totalPage;
      this.handleCurrentChange();
    }
  }
};
</script>

<style scoped lang="scss">
.pagination-container {
  background: #fff;
  padding: 32px 16px;
  width: 100%;
  text-align: center;
  /deep/ .pageEditer {
    position: relative;
    top: 7px;
    left: 5px;
  }
  .el-pagination {
    display: inline-block;
  }
  .pagination-pageData {
    display: inline-block;
    margin-right: 15px;
  }
  /deep/ .el-pager li {
    border: 1px solid #dcdcdc;
    margin: 0 2.5px;
    color: #7688a3;
    border-radius: 4px;
  }
  /deep/ .el-pager li.active {
    background-color: #1890ff;
    color: #ffffff;
  }
  /deep/ .el-pagination .btn-prev,/deep/ .el-pagination .btn-next {
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    margin: 0 2.5px;
    padding: 0 6px;
  }
}
.pagination-container.hidden {
  display: none;
}
.pagination-container.fixed {
  position: fixed;
  bottom: 0;
  right: 10px;
  width: calc(100% - 230px);
  z-index: 999;
}
.pagination-container div {
  color: #7688a3;
  font-size: 13px;
  button {
    color: #7688a3;
  }
}
</style>
