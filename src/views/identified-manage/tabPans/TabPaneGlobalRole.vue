<template>
  <div class="TabPaneGlobalRole">
    <span class="TabPaneTitle">{{currTitle!=""?currTitle:"花样年控股集团有限公司"}}</span>
    <el-button type="primary" @click="addGlobalRole()" class="AccountAddBtn">新增</el-button>
    <el-table
      :data="list"
      fit
      highlight-current-row
      style="width: 100%"
      :header-cell-style="{background:'#f3f5fa'}"
    >
      <el-table-column
        v-loading="loading"
        align="center"
        label="角色名"
        width="200px"
        element-loading-text="请给我点时间！"
      >
        <template slot-scope="{row}">
          <span>{{ row.roleName }}</span>
        </template>
      </el-table-column>

      <el-table-column width="400px" align="center" label="备注">
        <template slot-scope="{row}">
          <span>{{ row.remark }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="editGlobalRole(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="total"
      :page.sync="listQuery.pageIndex"
      :limit.sync="listQuery.pageSize"
      class="fixed"
      @pagination="getList"
    />
    <global-role-edit @flush="getList" ref="edit" />
    <global-role-add @flush="getList" ref="add" />
  </div>
</template>

<style scoped lang="scss">
.TabPaneGlobalRole /deep/ {
  padding-bottom: 97px;
  /deep/ .AccountAddBtn {
    float: right;
    margin-bottom: 10px;
  }
  .el-table th {
    background-color: #f3f5fa;
  }
  .el-table th.is-leaf {
    border-bottom: none;
    font-weight: normal;
    color: #7688a3;
  }
  .el-table--medium th, .el-table--medium td {
    padding: 0;
    img {
      vertical-align: middle;
    }
  }
  .el-table--medium th {
    height: 36px;
  }
}
.TabPaneTitle {
  margin-top: 5px;
  display: inline-block;
  font-size: 20px;
  font-family: "黑体";
}
</style>

<script>
import Pagination from "@/components/Pagination";
import { fetchRoleList } from "@/api/ruc-role";
import GlobalRoleEdit from "./dialog-box/GlobalRoleEdit.vue";
import GlobalRoleAdd from "./dialog-box/GlobalRoleAdd.vue";

export default {
  components: { GlobalRoleEdit, GlobalRoleAdd ,Pagination},
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  props: {
    type: {
      type: String,
      default: "CN"
    }
  },
  data() {
    return {
      list: null,
      total:0,
      currTitle:"",
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        type: this.type,
        sortBy: 'modifiedAt',
        isGlobal: true,
        isDescending:true
      },
      loading: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      this.currTitle = localStorage.getItem("tenantName")
      fetchRoleList(this.listQuery).then(response => {
        let globalRoles = response.data.list.filter(item => item.isGlobal == 1);
        this.list = globalRoles;
        this.total = response.data.totalCount;
        this.loading = false;
      });
    },
    editGlobalRole(row) {
      this.$refs.edit.dialogFormVisible = true;
      this.$refs.edit.form = JSON.parse(JSON.stringify(row))
    },
    addGlobalRole() {
      this.$refs.add.dialogFormVisible = true;
      this.$refs.add.form.roleName = ""
      this.$refs.add.form.remark = ""
      this.$refs.add._parentThis = this;
    }
  }
};
</script>

