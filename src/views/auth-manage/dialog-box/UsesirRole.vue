<template>
  <el-dialog
    class="UsesirRole"
    :title="isGlobal ? '全局角色管理>'+roleName : '系统角色管理>'+roleName"
    :visible.sync="dialogFormVisible"
    :modal-append-to-body="false"
  >
    <el-form :model="form" :inline="true">
      <el-form-item style="border:1px solid #d1ddf0;border-radius:5px;">
        <el-input v-model="listQuery.userName" autocomplete="off" placeholder="搜索姓名">
          <el-button slot="append" class="input-select" icon="el-icon-search" @click="select()" />
        </el-input>
      </el-form-item>
      <el-form-item style="margin-left:20px;">
        <el-button type="primary" icon="el-icon-plus" @click="showPlusDialog()">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :data="userList"
      element-loading-text="Loading"
      fit
      highlight-current-row
    >
      <el-table-column label="用户名" width="110">
        <template slot-scope="scope">{{ scope.row.user.userName }}</template>
      </el-table-column>
      <el-table-column label="真实姓名" width="110">
        <template slot-scope="scope">{{ scope.row.user.actualName }}</template>
      </el-table-column>
      <el-table-column label="角色名" width="110">
        <template>{{ roleName }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.pageIndex"
      :limit.sync="listQuery.pageSize"
      @pagination="fetchData"
    />
    <div slot="footer" class="dialog-footer" align="center">
      <el-button class="cancel" @click="dialogFormVisible = false">关 闭</el-button>
    </div>
    <usesir-role-plus ref="plus" />
    <el-dialog
      title="删除"
      align="center"
      :visible.sync="dialogVisible"
      append-to-body
      width="30%"
    >
      <div class="el-icon-warning warning">确定删除！</div>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button type="primary" @click="showDelDialog()">确 定</el-button>
        <el-button class="cancel" @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </el-dialog>
</template>
<script>
import UsesirRolePlus from "./UsesirRolePlus.vue";
import Pagination from "@/components/Pagination";
import { fetchUserRoleList } from "@/api/mock-cy/ruc-role";
import { delUserRoleList } from "@/api/mock-cy/ruc-role";

export default {
  components: { UsesirRolePlus, Pagination },
  data() {
    return {
      isGlobal: false,
      roleName: "",
      dialogVisible:false,
      dialogVisibleShift:{},
      dialogTableVisible: false,
      dialogFormVisible: false,
      listLoading: false,
      form: {
        name: ""
      },
      userList: [],
      total: 0,
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        roleId: "",
        userName: ""
      },
      roleId: ""
    };
  },
  watch: {
    dialogFormVisible: function() {
      this.fetchData();
    }
  },
  created() {},
  methods: {
    select() {
      this.fetchData();
    },
    del(row){
      this.dialogVisibleShift = row;
      this.dialogVisible = true;
      console.log(this.dialogVisibleShift)
    },
    showPlusDialog() {
      this.$refs.plus.dialogFormVisible = true;
      // 当前角色用户
      
      this.$refs.plus.fetchAllUserListQuery.roleId = this.roleId;
      this.$refs.plus.roleId = this.roleId;
      this.$refs.plus._parentThis = this;
    },
    showDelDialog() {
      let row = this.dialogVisibleShift;
      delUserRoleList(row.userId).then(response => {
        this.fetchData();
        this.$message({
          showClose: true,
          message: "删除成功",
          type: "success"
        });
        this.dialogVisible = false;
        this.dialogVisibleShift = {}
      });
    },
    fetchData() {
      this.listLoading = true;
      this.listQuery.roleId = this.roleId;
      fetchUserRoleList(this.listQuery).then(response => {
        this.total = response.data.totalCount;
        this.userList = response.data.list;

        // const list = response.data.list
        // for (let i = 0; i < list.length; i++) {
        //   if (!list[i].user)
        //     continue
        //   else
        //     list[i].userName = list[i].user.userName
        // }

        this.listLoading = false;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.UsesirRole /deep/ {
  .el-dialog__title {
    color: #7688a3;
  }
  .cancel {
    color: #00a2fd;
    border-color: #00a2fd;
  }
  .input-select {
    background-color: transparent;
    border: none;
    font-size: 18px;
    color: #f5b442;
    padding: 9px 10px;
    margin: -8px -10px;
  }
  .el-input__inner {
    border: none;
  }
  .el-input-group__append {
    border: none;
    background-color: transparent;
    padding: 0 10px;
  }
}
</style>
