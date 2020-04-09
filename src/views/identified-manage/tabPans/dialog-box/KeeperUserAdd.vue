<template>
  <el-dialog
    class="KeeperUserAdd"
    title="新增管理员"
    align="center"
    :visible.sync="dialogFormVisible"
    append-to-body
  >
    <el-row>
      <el-col>
        <el-tag color="#ffffff" class="appSys">{{currTitle!=""?currTitle:"花样年控股集团有限公司"}}</el-tag>
        <el-form :model="form" :inline="true" style="float:right;">
          <el-form-item style="border:1px solid #d1ddf0;border-radius:5px;">
            <el-input v-model="form.name" autocomplete="off" placeholder="搜索部门或姓名">
              <el-button
                slot="append"
                class="input-select"
                icon="el-icon-search"
                @click="select()"
              />
            </el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row style="background-color:#f8fbfb;padding:10px;">
      <el-col :span="8" style="border-right: 1px solid #d1ddf0;">
        <tree
          :nodes="nodes"
          :setting="setting"
          @onClick="onClickNode"
          @onCheck="onCheck"
          @onCreated="handleCreated"
          ref="treeDom"
        />
      </el-col>
      <el-col :span="16" style="border-left: 1px solid #d1ddf0;margin-left:-1px;">
        <el-row style="left:10px;">
          <el-checkbox-group v-model="checkManageUsers" style="text-align:left;">
            <el-checkbox
              v-for="item in list"
              :key="item.userId"
              :label="item.userId"
              :disabled="secCheckManageUsers.find( ({ userId }) => userId === item.userId ) !=null"
              @change="checked=>handleCheckedChange(checked,item)"
            >{{item.actualName}}</el-checkbox>
          </el-checkbox-group>
        </el-row>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer" align="center">
      <el-button type="primary" @click="confirm()">确 定</el-button>
      <el-button class="cancel" @click="dialogFormVisible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { fetchOrgsList } from "@/api/mock-cy/ruc-role";
import { fetchUserList } from "@/api/user-manage";
import { fetchDeptUserByDeptId, fetchDeptUserByName } from "@/api/dept-user";
import { addUserRole, getUserRole } from "@/api/user-role";
import tree from "vue-giant-tree";
import { getMyDate } from "@/utils/date";
// import axios from 'axios'
export default {
  components: {
    tree
  },
  data() {
    return {
      organizeQuery: {
        pageIndex: 1,
        pageSize: 8000
      },
      currTitle: "",
      dialogTableVisible: false,
      dialogFormVisible: false,
      // 租户管理员-特殊角色ID
      managerRoleId: "",
      checkManageUsers: [], //回显禁用 userId
      secCheckManageUsers: [], //回显禁用 user对象
      needToForm: [],
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      _parentThis: null,
      formLabelWidth: "120px",
      list: null,
      allKeeperUser: null, //所有已添加管理员回调
      data: [],
      newdata: [],
      users: [],
      ceshi: "",
      listQuery: {
        userName: "",
        actualName: ""
        // total: ''
      },
      fetchAllUserListQuery: {
        //获取所有已添加管理员参数 5000
        pageIndex: 1,
        pageSize: 5000,
        roleId: ""
      },
      userRoleQuery: {
        pageIndex: 1,
        pageSize: 600,
        roleId: ""
      },
      oldRoleManagers: [],
      listLoading: false,
      ztreeObj: null,
      setting: {
        check: {
          enable: true
        },
        data: {
          simpleData: {
            enable: true,
            idKey: "organizationalStructureId",
            pIdKey: "parentId",
            rootPId: "0"
          }
        }
      },
      nodes: [{ id: "", pid: "", name: "", checked: true, open: true }]
    };
  },
  created() {
    this.hideTreeNodes();
  },
  methods: {
    // 隐藏树
    hideTreeNodes() {
      let treeObj = this.$refs.treeDom;
      let treefunc = this.$refs.treeDom.showHide(treeObj, false);
    },
    // 检索姓名
    select() {
      let _this = this;
      this.listQuery.actualName = this.form.name;
      fetchDeptUserByName(this.listQuery).then(response => {
        this.list = response.data.list;
        this.listLoading = false;
      });
      _this.checkManageUsers = [];
    },
    // 点击树节点，部门人员检索
    onClickNode(evt, treeId, treeNode) {
      let _this = this;
      fetchDeptUserByDeptId(treeNode.organizationalStructureId).then(
        response => {
          _this.list = response.data[0].userList;
          this.listLoading = false;
        }
      );
      //  _this.checkManageUsers= []
    },
    // 点击部门人员添加进needToForm
    handleCheckedChange(val, item) {
      // val true为选中
      if (val) {
        this.needToForm.push(item);
      } else {
        // 删除取消勾选
        let indexToFind = item.userId;
        for (let index = 0; index < this.needToForm.length; index++) {
          if (this.needToForm[index].userId === indexToFind) {
            this.needToForm.splice(index, 1);
          }
        }
      }
    },
    onCheck() {},

    fetchData() {
      this.listLoading = true;
      this.currTitle = localStorage.getItem("tenantName");
      fetchOrgsList(this.organizeQuery).then(response => {
        this.newdata = response.data.list;

        const list = response.data.list;
        for (let i = 0; i < list.length; i++) {
          list[i].name = list[i].departmentName;
          list[i].open = true;
        }
        this.nodes = response.data.list;
      }),
        // 获取所有管理员
        fetchUserList(this.fetchAllUserListQuery).then(response => {
          this.allKeeperUser = [];
          this.allKeeperUser = response.data.list;
          this.secCheckManageUsers = response.data.list;
          for (let index = 0; index < this.allKeeperUser.length; index++) {
            this.checkManageUsers.push(this.allKeeperUser[index].userId);
          }
        });
    },
    fetchTree() {
      this.listLoading = true;
      console.log("newdata>>>:" + this.newdata);
    },

    confirm() {
      if (this.needToForm.length == 0) {
        this.$message({
          showClose: true,
          message: "请选择拟新增的管理员",
          type: "success"
        });
        return;
      }

      this.dialogFormVisible = false;

      let data = [];
      //遍历id进data
      for (var i = 0; i < this.needToForm.length; i++) {
        // if (this.isManager(this.checkManageUsers[i]))
        //   continue
        data.push({
          roleId: this.managerRoleId,
          userId: this.needToForm[i].userId,
          user: this.needToForm[i]
        });
      }
      // 遍历更新时间进user
      // 遍历usertype000进user
      for (let index = 0; index < this.needToForm.length; index++) {
        data[index].user.modifiedAt = getMyDate();
        data[index].user.userType = "00000000-0000-0000-0000-000000000000";
      }

      addUserRole(data).then(response => {
        this.$message({
          showClose: true,
          message: "添加成功",
          type: "success"
        });

        this._parentThis && this._parentThis.getList();
      });
    },
    handleCreated: function(ztreeObj) {
      this.ztreeObj = ztreeObj;
      ztreeObj.expandNode(ztreeObj.getNodes()[0], false, true);
    }
  },
  watch: {
    dialogFormVisible() {
      this.needToForm = [];
      if (this.dialogTableVisible) {
        this.fetchData();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.KeeperUserAdd /deep/ {
  .el-dialog__title {
    font-weight: bold;
  }
  .cancel {
    color: #00a2fd;
    border-color: #00a2fd;
  }
  .button.chk {
    display: none;
  }
  .el-checkbox {
    margin: 8px 0;
    width: 25%;
    text-align: left;
    padding-left: 5px;
    overflow: hidden;
  }
  .el-input__inner {
    border: none;
  }
  .input-select {
    background-color: transparent;
    border: none;
    font-size: 18px;
    color: #f5b442;
    padding: 9px 10px;
    margin: -8px -10px;
  }
  .el-input-group__append {
    border: none;
    background-color: transparent;
    padding: 0 10px;
  }
  .appSys {
    border: none;
    color: #333333;
    font-size: 16px;
    font-weight: bold;
    float: left;
    line-height: 38px;
  }
}
</style>
