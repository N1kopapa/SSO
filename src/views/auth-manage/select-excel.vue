<template>
  <div class="select-excel">
    <div class="app-container">
      <!-- <el-input v-model="filename" placeholder="Please enter the file name (default excel-list)" style="width:350px;" prefix-icon="el-icon-document" /> -->
      <!-- <el-button :loading="downloadLoading" style="margin-bottom:20px" type="primary" icon="el-icon-document" @click="handleDownload">
        Export Selected Items
      </el-button> -->
      <!-- <a href="https://panjiachen.github.io/vue-element-admin-site/feature/component/excel.html" target="_blank" style="margin-left:15px;">
        <el-tag type="info">Documentation</el-tag>
      </a> -->
      <el-form :inline="true">
        <el-form-item label="角色名称">
          <el-input v-model="listQuery.roleName" placeholder="角色名称" style="width:350px;" />
        </el-form-item>
        <el-form-item>
          <el-button class="select" @click="select()">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" style="padding:10px 10.5px;" @click="showPlusDialog()">新增</el-button>
        </el-form-item>
      </el-form>
      <div style="padding:10px 10px 107px;background-color:#ffffff;border-radius: 5px;min-height: calc(100vh - 126px);">
        <el-table
          ref="multipleTable"
          v-loading="listLoading"
          :data="list"
          element-loading-text="拼命加载中"
          fit
          highlight-current-row
          @selection-change="handleSelectionChange"
        >
          <el-table-column label="角色名称" width="220">
            <template slot-scope="scope">
              {{ scope.row.roleName }}
            </template>
          </el-table-column>
          <el-table-column label="备注" width="220">
            <template slot-scope="scope">
              {{ scope.row.remark }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="showEditDialog(scope.row)">编辑</el-button>
              <el-button v-if="scope.row.statu" style="color:rgb(252, 80, 80);" type="text" @click="showAbleDialog(scope.row)">点击禁用</el-button>
              <el-button v-else type="text" @click="showAbleDialog(scope.row)">点击启用</el-button>
              <el-button type="text" @click="showDelDialog(scope.row)">删除</el-button>
              <el-button type="text" @click="showUserDialog(scope.row)">usesirRole</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="listQuery.pageIndex"
          :limit.sync="listQuery.pageSize"
          class="fixed"
          @pagination="fetchData"
        />
      </div>
      <my-system-edit ref="edit" @flush="fetchData" />
      <my-system-plus ref="plus" @flush="fetchData" />
      <my-system-able ref="able" />
      <my-system-del ref="del" @flush="fetchData" />
      <usesir-role ref="user" />
    </div>
  </div>
</template>

<script>
import { fetchRoleList } from '@/api/ruc-role'
import MySystemEdit from './dialog-box/MySystemEdit.vue'
import MySystemPlus from './dialog-box/MySystemPlus.vue'
import MySystemAble from './dialog-box/MySystemAble.vue'
import MySystemDel from './dialog-box/MySystemDel.vue'

import UsesirRole from './dialog-box/UsesirRole.vue'
import Pagination from '@/components/Pagination'
import { getMyDate } from "@/utils/date";

export default {
  name: 'SelectExcel',
  components: { MySystemEdit, MySystemAble, UsesirRole, Pagination, MySystemPlus, MySystemDel },
  data() {
    return {
      list: [],
      listLoading: true,
      multipleSelection: [],
      downloadLoading: false,
      filename: '',
      total: 0,
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        type: this.type,
        sortBy: 'modifiedAt',
        isGlobal: true,
        // applicationSystemId: '',
        roleName: '',
        isDescending:true
      },
      applicationSystemId: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      fetchRoleList(this.listQuery).then(response => {
        console.log('===============角色列表================', response.data.list)
        this.total = response.data.totalCount
        this.list = response.data.list
        this.listLoading = false
      })
    },
    select() {
      this.fetchData()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleDownload() {
      if (this.multipleSelection.length) {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
          const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
          const list = this.multipleSelection
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename
          })
          this.$refs.multipleTable.clearSelection()
          this.downloadLoading = false
        })
      } else {
        this.$message({
          message: 'Please select at least one item',
          type: 'warning'
        })
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    showEditDialog(row) {
      console.log(getMyDate())
      this.$refs.edit.dialogFormVisible = true
      // this.$refs.edit.form = Object.assign(row)

      this.$refs.edit.form = JSON.parse(JSON.stringify(row))
      this.$refs.edit.form.modifiedAt = getMyDate();
      this.$refs.edit.isGlobal = true
    },
    showPlusDialog() {
      this.$refs.plus.dialogFormVisible = true
      this.$refs.plus.isGlobal = true
      this.$refs.plus.form.roleName = ""
      this.$refs.plus.form.remark = ""
      // this.$refs.plus.form.applicationSystemId=""
    },
    showAbleDialog(row) {
      this.$refs.able.dialogFormVisible = true
      this.$refs.able.form = row
      this.$refs.able.statu = row.statu
      this.$refs.able.isGlobal = true
    },
    showDelDialog(row) {
      this.$refs.del.dialogFormVisible = true
      const list = []
      list.push(row.roleId)
      this.$refs.del.roleIds = list
    },
    showUserDialog(row) {
      this.$refs.user.dialogFormVisible = true
      this.$refs.user.isGlobal = true
      this.$refs.user.listQuery.userName = ""
      
      this.$refs.user.roleName = row.roleName
      this.$refs.user.roleId = row.roleId
      console.log(row.roleName)
    }
  }
}
</script>

<style lang="scss" scoped>
.select-excel /deep/ .app-container {
  .el-form-item__label {
    color: #7688a3;
    font-weight: normal;
  }
  .el-form-item {
    margin-bottom: 10px;
    margin-top: 10px;
  }
  .select {
    background-color: #f5b442;
    color: #ffffff;
    border: 1px solid #f5b442;
    margin-left: 20px;
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
</style>
