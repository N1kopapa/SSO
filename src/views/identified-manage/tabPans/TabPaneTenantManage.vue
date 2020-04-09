<template>
  <div class="TabPaneTenantManage">
    <el-form :inline="true">
      <el-form-item label="租户名称">
        <el-input placeholder="租户名称" v-model="tenantQuery.tenantName" style="width:250px;" />
      </el-form-item>
      <el-form-item>
        <el-button @click="getList()" class="select">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-plus" style="padding:10px 10.5px;" @click="addTenant()">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" fit highlight-current-row style="width: 100%;padding-bottom:107px;">
      <el-table-column
        v-loading="loading"
        width="210"
        element-loading-text="请给我点时间！"
        label="租户名称"
      >
        <template slot-scope="{row}">
          <span>{{ row.tenantName }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" label="登录账号">
        <template slot-scope="{row}">
          <span>{{ row.loginAccount }}</span>
        </template>
      </el-table-column>

      <el-table-column width="140px" label="租户类型">
          <template slot-scope="{row}">
            <span>{{ row.tenantTypeName }}</span>
          </template>
      </el-table-column>

      <el-table-column width="90px" label="联系人">
        <template slot-scope="{row}">
          <span>{{ row.contactPerson }}</span>
        </template>
      </el-table-column>
      <el-table-column width="120px" label="联系电话">
        <template slot-scope="{row}">
          <span>{{ row.contactPhone }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="240px" label="联系地址">
        <template slot-scope="{row}">
          <span>{{ row.addressId }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="checkTenant(scope.row)">查看</el-button>
          <el-button type="text" @click="editTenant(scope.row)">编辑</el-button>
          <el-button type="text" @click="delTenant(scope.row)">删除</el-button>
          <el-button type="text" @click="setManager(scope.row)">设置管理员</el-button>
        </template>
      </el-table-column>
    </el-table>
          <pagination
        :total="total"
        :page.sync="tenantQuery.pageIndex"
        :limit.sync="tenantQuery.pageSize"
        class="fixed"
        @pagination="getList"
      />
    <el-dialog title="提示" align="center" :visible.sync="dialogConfirmVisible" width="30%">
      <div class="el-icon-warning warning">确认删除信息？</div>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button type="primary" @click="delTenantConfirm()">确 定</el-button>
        <el-button @click="dialogConfirmVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <tenant-edit ref="edit" @flush="getList"/>
    <tenant-check ref="check" />
    <tenant-add ref="add" />
    <add-user ref="adduser" />
  </div>
</template>

<script>
import { fetchRoleList } from "@/api/ruc-role";
import TenantEdit from "./dialog-box/TenantEdit.vue";
import TenantCheck from "./dialog-box/TenantCheck.vue";
import TenantAdd from "./dialog-box/TenantAdd.vue";
import AddUser from "../dialog-box/AddUser.vue";
import Pagination from "@/components/Pagination";

import { fetchTenantList, delTenant } from "@/api/tenant";

export default {
  components: { TenantEdit, TenantCheck, TenantAdd, AddUser,Pagination },
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
      dialogConfirmVisible: false,
      item:null,
      list: null,
      listQuery: {
        page: 1,
        limit: 5,
        type: this.type,
        sortBy: 'updateAt',
      },
      total:0,
      tenantQuery: {
        pageIndex: 1,
        pageSize: 10,
        sortBy: 'modifiedAt',
        isDescending: true,
        tenantName: "",
        loginAccount: "",
        tenantType: "00000000-0000-0000-0000-000000000000",
        startDate: "1900-11-1",
        endDate: "2021-11-1",
        legalPerson: "",
        groupId: "00000000-0000-0000-0000-000000000000"
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

      fetchTenantList(this.tenantQuery).then(response => {
        this.list = response.data.list;
        this.total = response.data.totalCount;
        this.$refs.tenants.list = response.data.list;
        
      });
    },
    addTenant() {
      this.$refs.add.dialogFormVisible = true;
      this.$refs.add._parentThis = this;
    },
    checkTenant(row) {
      this.$refs.check.dialogFormVisible = true;
      this.$refs.check.form = Object.assign(row);
      // this.$refs.check.form = JSON.parse(JSON.stringify(row))
    },
    editTenant(row) {
      this.$refs.edit.dialogFormVisible = true;
      // this.$refs.edit.form = Object.assign(row);
      this.$refs.edit.form = JSON.parse(JSON.stringify(row))
    },
    delTenant(row) {
      this.dialogConfirmVisible = true;
      this.item = row;
    },
    delTenantConfirm() {
        let row = this.item;
        let tenants = [];
        tenants.push(row.tenantId);
        delTenant(tenants).then(response => {
          this.getList();
          this.$message({
            showClose: true,
            message: "删除成功",
            type: "success"
          });
        });
        this.item = null;
        this.dialogConfirmVisible = false;
        // this.$refs.add.dialogFormVisible = true
      },

    // 调用用户新增的对话框即可。传入一个参数--管理员参数。。
    setManager(row) {
      this.$refs.adduser.dialogFormVisible = true;
      this.$refs.adduser.showUserType = false;
      this.$refs.adduser.currentTitle = "设置管理员";

      this.$refs.adduser.initFormForAddUser()

      this.$refs.adduser.form.tenantId = row.tenantId;
      this.$refs.adduser.form.userType = "00000000-0000-0000-0000-000000000000";
    }
  }
};
</script>

<style lang="scss" scoped>
.TabPaneTenantManage /deep/ {
  .el-form-item__label {
    color: #7688a3;
    font-weight: normal;
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
    div {
      min-height: 36px;
      line-height: 36px;
    }
  }
  .el-table--medium th {
    height: 36px;
  }
}
</style>
