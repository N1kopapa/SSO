<template>
  <div class="merge-header">
    <div class="app-container">
      <el-form :inline="true">
        <el-form-item label="所属系统">
          <el-select v-model="applicationSystemId">
            <!-- <el-option label="请选择" /> -->
            <el-option
              v-for="system in systemList"
              :key="system.applicationSystemId"
              :label="system.applicationSystemName"
              :value="system.applicationSystemId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="角色名称" style="margin-left:20px;">
          <el-input v-model="listQuery.roleName" placeholder="角色名称" style="width:250px;" />
        </el-form-item>
        <el-form-item>
          <el-button class="select" @click="select()">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" style="padding:10px 10.5px;" @click="showPlusDialog()">新增</el-button>
        </el-form-item>
      </el-form>
      <!-- <el-button :loading="downloadLoading" style="margin-bottom:20px" type="primary" icon="el-icon-document" @click="handleDownload">Export</el-button> -->
      <div style="padding:10px 10px 107px;background-color:#ffffff;border-radius: 5px;min-height: calc(100vh - 126px);">
        <el-table
          ref="multipleTable"
          v-loading="listLoading"
          :data="list"
          element-loading-text="Loading"
          fit
          highlight-current-row
        >
          <el-table-column label="所属系统" width="220">
            <template slot-scope="scope"> 
              {{ scope.row.applicationSystemName }}
            </template>
          </el-table-column>
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
      <my-system-edit ref="edit" @flush="fetchData"/>
      <my-system-plus ref="plus" @flush="fetchData"/>
      <my-system-able ref="able" />
      <my-system-del ref="del" @flush="fetchData"/>
      <usesir-role ref="user" />
    </div>
  </div>
</template>

<script>
import { fetchRoleList } from '@/api/ruc-role'
import { parseTime } from '@/utils'
import { fetchApplicationSystem } from '@/api/application-system'
import MySystemEdit from './dialog-box/MySystemEdit.vue'
import MySystemPlus from './dialog-box/MySystemPlus.vue'
import MySystemAble from './dialog-box/MySystemAble.vue'
import MySystemDel from './dialog-box/MySystemDel.vue'
import UsesirRole from './dialog-box/UsesirRole.vue'
import Pagination from '@/components/Pagination'
import { getMyDate } from "@/utils/date";
export default {
  name: 'MergeHeader',
  components: { MySystemEdit, MySystemAble, UsesirRole, Pagination, MySystemPlus, MySystemDel },
  data() {
    return {
      list: null,
      listLoading: true,
      downloadLoading: false,
      total: 0,
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        type: this.type,
        sortBy: 'modifiedAt',
        isGlobal: false,
        // applicationSystemId: '',
        roleName: '',
        isDescending:true
      },
      appQuery: {
        isMyAPP: true,
        tenantId: ''
      },
      applicationSystemId: '',
      systemList: []
    }
  },
  created() {
    this.fetchData()
    this.fetchOrg()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      if (this.applicationSystemId !== '') {
        this.listQuery.applicationSystemId = this.applicationSystemId
      }
      fetchRoleList(this.listQuery).then(response => {
        this.total = response.data.totalCount
        this.list = response.data.list
        this.listLoading = false
      })
    },
    fetchOrg() {
      this.appQuery.tenantId = localStorage.getItem('tenantId')
      fetchApplicationSystem(this.appQuery).then(response => {
        this.systemList = response.data.list
      })
    },
    select() {
      this.fetchData()
    },
    handleDownload() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const multiHeader = [['Id', 'Main Information', '', '', 'Date']]
          const header = ['', 'Title', 'Author', 'Readings', '']
          const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
          const list = this.list
          const data = this.formatJson(filterVal, list)
          const merges = ['A1:A2', 'B1:D1', 'E1:E2']
          excel.export_json_to_excel({
            multiHeader,
            header,
            merges,
            data
          })
          this.downloadLoading = false
        })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    showEditDialog(row) {
      this.$refs.edit.dialogFormVisible = true
      this.$refs.edit.form = JSON.parse(JSON.stringify(row))
      this.$refs.edit.form.modifiedAt = getMyDate();
    },
    showPlusDialog() {
      this.$refs.plus.dialogFormVisible = true
      this.$refs.plus.form.roleName = ""
      this.$refs.plus.form.remark = ""
      this.$refs.plus.form.applicationSystemId=""
      // this.$refs.edit.form = Object.assign(row)
    },
    showAbleDialog(row) {
      this.$refs.able.dialogFormVisible = true
      this.$refs.able.form = row
      this.$refs.able.statu = row.statu
    },
    showDelDialog(row) {
      this.$refs.del.dialogFormVisible = true
      const list = []
      list.push(row.roleId)
      this.$refs.del.roleIds = list
    },
    showUserDialog(row) {
      this.$refs.user.dialogFormVisible = true
      this.$refs.user.listQuery.userName = ""
      this.$refs.user.isGlobal = false
      this.$refs.user.roleName = row.roleName
      this.$refs.user.roleId = row.roleId
      console.log(row.roleName)
    }
  }
}
</script>

<style lang="scss" scoped>
.merge-header /deep/ .app-container {
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
