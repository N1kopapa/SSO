<template>
  <div class="TabPaneKeeperAccount">
    <span class="TabPaneTitle">{{currTitle!=""?currTitle:"花样年控股集团有限公司"}}</span>
    <el-button type="primary" v-if="isTenantAdmin" @click="addUser()" class="AccountAddBtn">新增管理员</el-button>
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
        label="头像"
        width="70"
        element-loading-text="请给我点时间！"
      >
        <template slot-scope="scope">
          <el-image :src="scope.row.headPortrait" style="width: 28px;height: 28px;vertical-align: middle;">
            <div slot="error">
              <img src="../../../assets/temporary/2.jpg" width="28px" height="28px">
            </div>
          </el-image>
        </template>
      </el-table-column>

      <el-table-column width="130px" label="用户名">
        <template slot-scope="{row}">
          <span>{{ row.userName }}</span>
        </template>
      </el-table-column>

      <el-table-column width="130px" label="姓名">
        <template slot-scope="{row}">
          <span>{{ row.actualName }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" label="邮箱">
        <template slot-scope="{row}">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>

      <el-table-column width="130px" label="手机号">
        <template slot-scope="{row}">
          <span>{{ row.mobilePhone }}</span>
        </template>
      </el-table-column>

      <el-table-column width="130px" label="QQ">
        <template slot-scope="{row}">
          <span>{{ row.qq }}</span>
        </template>
      </el-table-column>

      <el-table-column v-if="isTenantAdmin" label="操作" min-width="210">
        <template slot-scope="{row}">
          <el-button type="text" @click="keeperEdit(row)">编辑</el-button>
          <el-button type="text" @click="keeperPwdChange(row)">重置密码</el-button>
          <el-button
            v-if="!row.isDisabled"
            style="color:rgb(252, 80, 80);"
            type="text"
            @click="startOrForbidden(row)"
          >点击禁用</el-button>
          <el-button v-else type="text" @click="startOrForbidden(row)">点击启用</el-button>
        </template>
      </el-table-column>
      <el-table-column v-if="!isTenantAdmin">
        <!-- !isTenantAdmin 时填充表头 -->
      </el-table-column>
    </el-table>

    <pagination
      :total="total"
      :page.sync="userRoleQuery.pageIndex"
      :limit.sync="userRoleQuery.pageSize"
      class="fixed"
      @pagination="getList"
    />
    <el-dialog title="提示" align="center" :visible.sync="dialogVisible" width="30%">
      <div v-if="this.startOrForbiddenShift.isDisabled" class="el-icon-warning warning">是否启用？</div>
      <div v-else class="el-icon-warning warning">是否禁用？</div>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button type="primary" @click="startOrForbiddenConfirm()">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <keeper-user-add ref="add" @flush ="getList"/>
    <keeper-edit ref="edit" @flush ="getList"/>
    <keeper-passwd-change ref="passwd" />
  </div>
</template>

<style scoped lang="scss">
.TabPaneKeeperAccount /deep/ {
  padding-bottom: 97px;
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
  .AccountAddBtn {
    float: right;
    margin-bottom: 10px;
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
// import KeeperAdd from "./dialog-box/KeeperAdd";
import KeeperUserAdd from "./dialog-box/KeeperUserAdd";
import KeeperEdit from "./dialog-box/KeeperEdit";
import KeeperPasswdChange from "./dialog-box/KeeperPasswdChange";
import { fetchRoleList, editRucRole } from "@/api/ruc-role";
import { getUserRole } from "@/api/user-role";
import { updateUser , fetchUserList } from "@/api/user-manage"

export default {
  components: {
    Pagination,
    // KeeperAdd,
    KeeperUserAdd,
    KeeperEdit,
    KeeperPasswdChange
  },
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
      currTitle:"",
      isTenantAdmin:false,
      managerRoleId: "",
      startOrForbiddenShift: {
        isDisabled: false
      },
      dialogVisible: false,
      list: [],
      total: 0,
      roleQuery: {
        roleName: "租户管理员",
        isGlobal: true
      },
      userRoleQuery: {
        pageIndex: 1,
        pageSize: 10,
        roleId: "",
        sortBy:"modifiedAt",
        isDescending:true,
        roleId:""
      },
      listQuery: {
        sortBy: 'updateAt',
        // isDescending: "",
        // userName:"",
        // nickName:"",
        userType: "00000000-0000-0000-0000-000000000000"
      },
      loading: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.isTenantAdmin = (localStorage.getItem("role") == "tenant-admin")
      this.currTitle = localStorage.getItem("tenantName")

      this.loading = true;
      let _this = this;
      fetchRoleList(this.roleQuery).then(response => {
        if (response.data.list != null) {
           _this.managerRoleId = response.data.list[0].roleId;
          _this.userRoleQuery.roleId = response.data.list[0].roleId;

          fetchUserList(_this.userRoleQuery).then(response => {
            _this.list = []
            _this.list = response.data.list;
            _this.total = response.data.totalCount;
            _this.loading = false;
          });
        }
      });
    },
    addUser() {
      let _this = this;
      this.$refs.add.managerRoleId = this.managerRoleId;
      this.$refs.add.fetchAllUserListQuery.roleId = this.managerRoleId;
      this.$refs.add.dialogFormVisible = true;
      this.$refs.add.form.name =""
      this.$refs.add.fetchData()
      this.$refs.add.list = null
      this.$refs.add.secCheckManageUsers = this.list;
      
      this.$refs.add._parentThis = this;
      this.$refs.add.oldRoleManagers = this.list;
    },
    keeperEdit(row) {
      this.$refs.edit.dialogFormVisible = true;
      // 这是浅拷贝，其实就是把地址，引用拷贝过去。此处不要用浅拷贝。
      // this.$refs.edit.form = Object.assign(row);
      // 这种叫深拷贝
      this.$refs.edit.form = JSON.parse(JSON.stringify(row))
    },
    keeperPwdChange(row) {
      this.$refs.passwd.dialogFormVisible = true;
      // this.$refs.passwd.form = Object.assign(row);
      this.$refs.passwd.form = JSON.parse(JSON.stringify(row))
      this.$refs.passwd.form.userPwd = ""
    },
    startOrForbiddenConfirm() {
      let row = this.startOrForbiddenShift;
      let putItem = this.startOrForbiddenShift;
      putItem.isDisabled = (!putItem.isDisabled);
      updateUser(row.userId, putItem).then(response => {
        this.$message({
          showClose: true,
          message: "修改成功",
          type: "success"
        });
        this.dialogVisible = false;
      });
    },
    startOrForbidden(row) {
      this.dialogVisible = true;
      this.startOrForbiddenShift = row;
    }
  }
};
</script>


