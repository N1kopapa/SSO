<template>
  <div class="user-manage">
    <div class="app-container">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-top: 10px;">
        <el-form-item label="用户名称">
          <el-input v-model="formInline.userName" placeholder="用户名称"></el-input>
        </el-form-item>
        <el-form-item label="用户状态" style="margin-left:20px;">
          <el-select v-model="formInline.status" placeholder="请选择" value-key="dictionaryItemName">
            <el-option
              v-for="state in stateList"
              :key="state.dictionaryItemId"
              :label="state.dictionaryItemName"
              :value="state"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button class="select" @click="select(formInline)">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" style="padding:10px 10.5px;" @click="addUser()">新增</el-button>
        </el-form-item>
      </el-form>
      <div style="padding:10px;background-color:#ffffff;border-radius:5px;padding-bottom:107px;min-height: calc(100vh - 126px);">
        <el-row>
          <el-col>
            <el-tag color="transparent" class="appSys">{{currTitle!=""?currTitle:"花样年控股集团有限公司"}}</el-tag>
            <el-button type="primary" style="float:right;" @click="synchronizationAD()">同步AD信息</el-button>
          </el-col>
        </el-row>
        <el-table :data="list" fit highlight-current-row style="width: 100%;margin-top:10px;">
          <el-table-column
            v-loading="loading"
            align="center"
            label="头像"
            width="65"
            element-loading-text="请给我点时间！"
          >
            <template slot-scope="scope">
              <el-image :src="scope.row.headPortrait" style="width: 28px;height: 28px;vertical-align: middle;">
                <div slot="error">
                  <img src="../../assets/temporary/2.jpg" width="28px" height="28px">
                </div>
              </el-image>
            </template>
          </el-table-column>

          <el-table-column width="120px" align="center" label="用户名">
            <template slot-scope="{row}">
              <span>{{ row.userName }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="真实姓名" width="120">
            <template slot-scope="{row}">
              <span>{{ row.actualName }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="移动电话" width="140">
            <template slot-scope="{row}">
              <span>{{ row.mobilePhone }}</span>
            </template>
          </el-table-column>

          <el-table-column width="140px" min-width="300px" label="出生日期">
            <template slot-scope="{row}">
              <span>{{ row.birthDay==null?null:row.birthDay.substr(0,10) }}</span>
            </template>
          </el-table-column>

          <el-table-column width="110px" align="center" label="启用/禁用">
            <template slot-scope="{row}">
              <span v-if="row.isDisabled">禁用</span>
              <span v-else>启用</span>
            </template>
          </el-table-column>

          <el-table-column width="110px" align="center" label="用户状态">
            <template slot-scope="{row}">
              <span>{{row.statusName}}</span>
            </template>
          </el-table-column>

          <!-- <el-table-column width="120px" label="来源">
            <template slot-scope="{row}">
              <span>{{ row.createdBy }}</span>
            </template>
          </el-table-column> -->

          <!-- <el-table-column align="center" label="岗位" width="95">
            <template>
              <span>岗位</span>
            </template>
          </el-table-column> -->

          <!-- <el-table-column class-name="status-col" label="备注" width="110">
            <template slot-scope="{row}">
              <span>{{ row.remark }}</span>
            </template>
          </el-table-column> -->
      <el-table-column class-name="status-col" label="操作" min-width="120">
        <template slot-scope="{row}">
          <el-button type="text" @click="checkDetail(row)">查看</el-button>
          <el-button v-if="!row.isDisabled" style="color:rgb(252, 80, 80);" type="text" @click="start(row)">点击禁用</el-button>
          <el-button v-else type="text" @click="start(row)">点击启用</el-button>
          <!-- <el-button type="text" @click="stop()">禁用</el-button> -->
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
      <add-user ref="addU" @flush="fetchData"/>
      <enable-user ref="enable" />
      <observation-user ref="observation" />
    </div>
  </div>
</template>

<script>
import { fetchUserList } from "@/api/user-manage.js";
import { fetchDicItemList } from '@/api/dictionary'
import { postIndexInfo } from '@/api/index-info'
import AddUser from './dialog-box/AddUser.vue'
import Pagination from '@/components/Pagination'
import EnableUser from './dialog-box/EnableUser.vue'
import ObservationUser from './dialog-box/ObservationUser.vue'
import { getUserOrg } from "@/api/user_org"

export default {
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
  components: { AddUser, Pagination, EnableUser, ObservationUser },
  props: {
    type: {
      type: String,
      default: "CN"
    }
  },
  data() {
    return {
      currTitle:"",
      list: null,
      tenantId:"",
      total:0,
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        type: this.type,
        sortBy: 'modifiedAt',
        isDescending:true,
        userName: '',
        status: ''
      },
      loading: false,
      formInline: {
        userName: '',
        status: null
      },
      stateQuery: {
        dictionaryId: '2aca0fac-6e5b-11e5-b18d-005056c00008'
      },
      stateList: []
    };
  },
  created() {
    delete this.listQuery.status
    this.fetchData()
    this.fetchDicItemData()
    this.listQuery.status = null
  },
  methods: {
    fetchData() {
      this.loading = true
      this.currTitle = localStorage.getItem("tenantName")
      this.tenantId = localStorage.getItem("tenantId")
      fetchUserList(this.listQuery).then(response => {
        this.total = response.data.totalCount
        this.list = response.data.list
        console.log(this.list)
        this.loading = false
      })
    },
    fetchDicItemData() {
      fetchDicItemList(this.stateQuery).then(response => {
        this.stateList = response.data.list
        // this.formInline.status = this.stateList[0]
      })
    },
    addUser() {
      this.$refs.addU.dialogFormVisible = true
      this.$refs.addU.initFormForAddUser()
      
      this.$refs.addU.form.tenantId = this.tenantId
    },
    select(query) {
      this.listQuery.userName = query.userName
      if (query.status && query.status.dictionaryItemId && 
          query.status.dictionaryItemId.length == this.stateQuery.dictionaryId.length){
        this.listQuery.status = query.status.dictionaryItemId
      }
      else{
        delete query.status
      }
      console.log(query)
      this.fetchData()
      query.status = null

    },
    // 同步AD信息
    synchronizationAD() {
      postIndexInfo().then(response => {
        if (response.status === 0) {
          this.$message({
          showClose: true,
          message: "同步成功",
          type: "success"
        });
        } else {
         this.$message({
          showClose: true,
          message: "同步失败",
          type: "fail"
        });
        }
        
      })
    },
    start(row) {
      this.$refs.enable.dialogFormVisible = true
      this.$refs.enable.user = row
    },
    checkDetail(row) {
      let userOrgQuery = {
        userId:""
      }
      userOrgQuery.userId = row.userId
      getUserOrg(userOrgQuery).then(response=>{
        this.$refs.observation.dialogFormVisible = true
        this.$refs.observation.form = row
        this.$refs.observation.organize = response.data[0].deptName
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.user-manage /deep/ .app-container {
  .el-form-item__label {
    color: #7688a3;
    font-weight: normal;
  }
  .el-form-item {
    margin-bottom: 10px;
  }
  .select {
    background-color: #f5b442;
    color: #ffffff;
    border: 1px solid #f5b442;
    margin-left: 20px;
  }
  .appSys {
    border:none;
    color:#333333;
    font-size:16px;
    font-weight: bold;
    float: left;
    line-height: 38px;
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
