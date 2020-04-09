<template>
  <el-dialog
    class="UsesirRolePlus"
    title="角色用户新增"
    align="center"
    :visible.sync="dialogFormVisible"
    append-to-body
  >
    <el-row>
      <el-col>
        <el-tag color="#ffffff" class="appSys">{{currTitle!=""?currTitle:"花样年控股集团有限公司"}}</el-tag>
        <!-- <el-form :model="form" :inline="true" style="float:right;">
          <el-form-item style="border:1px solid #d1ddf0;border-radius:5px;">
            <el-input v-model="form.name" autocomplete="off" placeholder="搜索部门或姓名">
              <el-button slot="append" class="input-select" icon="el-icon-search" @click="select()" />
            </el-input>
          </el-form-item>
        </el-form>-->
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
        <tree :nodes="nodes" :setting="setting" @onClick="onClickNode" @onCreated="handleCreated" default-expand-all="false"/>
      </el-col>
      <el-col :span="16" style="border-left: 1px solid #d1ddf0;margin-left:-1px;">
        <el-row style="left:10px;">
          <el-checkbox-group v-model="checkManageUsers" style="text-align:left;">
            <el-checkbox v-for="item in list" :key="item.userId" :label="item.userId" @change="checked=>handleCheckedChange(checked,item)" :disabled="secCheckManageUsers.find( ({ userId }) => userId === item.userId ) !=null">{{item.actualName}}</el-checkbox>
          </el-checkbox-group>
        </el-row>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer" align="center">
      <el-button type="primary" @click="save()">确 定</el-button>
      <el-button class="cancel" @click="dialogFormVisible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import tree from "vue-giant-tree";
import { fetchUserList } from "@/api/mock-cy/ruc-role";
import { fetchOrgsList } from "@/api/mock-cy/ruc-role";
import { fetchDeptUserByDeptId, fetchDeptUserByName } from "@/api/dept-user";
import { addUserRole, getUserRole } from "@/api/user-role";
import { fetchUserRoleList } from "@/api/mock-cy/ruc-role";
import { addUserRoleList } from "@/api/mock-cy/ruc-role";
import { getMyDate } from "@/utils/date";
export default {
  components: {
    tree
  },
  data() {
    return {
      currTitle: "",
      dialogTableVisible: false,
      dialogFormVisible: false,
      applicationSystem: "花样年控股集团有限公司",
      listLoading: false,
      list: null,
      allList:null,
      checkManageUsers: [],//回显选中 userId
      secCheckManageUsers:[],//回显禁用 user对象
      needToForm:[],
      _parentThis: null,
      form: {
        name: ""
      },
      organizeQuery:{
        pageIndex:1,
        pageSize:8000,
      },
      listQuery: {
        userName: "",
        actualName: ""
      },
      fetchAllUserListQuery: {
        pageIndex: 1,
        pageSize: 5000,
        roleId: "",
      },
      nodes: [
      ],
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
      userList: null,
      userCheckedList: [],
      organizationalStructureId: "",
      roleId: ""
    };
  },
  created() {
    this.currTitle = localStorage.getItem("tenantName");
    
  },
  methods: {
    handleCheckedChange(val,item){
      // val true为选中
      if(val){
        this.needToForm.push(item)
      }else{
        // 删除取消勾选
        let indexToFind = item.userId;
        for (let index = 0; index < this.needToForm.length; index++) {
          if(this.needToForm[index].userId === indexToFind){
            this.needToForm.splice(index,1)  
          }
          
        }
        
      }
    },
    fetchData() {
      this.listLoading = true;
      this.currTitle = localStorage.getItem("tenantName");
      // 组织架构树
      fetchOrgsList(this.listQuery).then(response => {
        this.newdata = response.data.list;

        const list = response.data.list;
        for (let i = 0; i < list.length; i++) {
          list[i].name = list[i].departmentName;
          list[i].open = true;
        }
        this.nodes = response.data.list;
      });
      // 所有已添加用户在组织架构中回显
      fetchUserRoleList(this.fetchAllUserListQuery).then(response => {
        this.allList = response.data.list;
        for (let index = 0; index < this.allList.length; index++) {
        this.secCheckManageUsers.push(this.allList[index].user)
      }
      for (let index = 0; index < this.allList.length; index++) {
        this.checkManageUsers.push(this.allList[index].user.userId)
      }
      });
      
    },
    // 搜索
    select() {
      this.listQuery.actualName = this.form.name;
      fetchDeptUserByName(this.listQuery).then(response => {
        this.list = response.data.list;
        this.listLoading = false;
      });
    },

    onClickNode(evt, treeId, treeNode) {
      let _this = this;
      fetchDeptUserByDeptId(treeNode.organizationalStructureId).then(
        response => {
          _this.list = response.data[0].userList;
          this.listLoading = false;
        }
      );
    },
    fetchTree() {
      this.listLoading = true;
      console.log("newdata>>>:" + this.newdata);
    },
    save() {
      let that = this;
      let data = [];
      if (this.needToForm.length == 0) {
        this.$message({
          showClose: true,
          message: "请选择拟新增的管理员",
          type: "success"
        });
        return;
      }
      for (var i = 0; i < this.needToForm.length; i++) {
        data.push({
          roleId: this.roleId,
          userId: this.needToForm[i].userId,
          user: this.needToForm[i]
        });
      }
      for (let index = 0; index < this.needToForm.length; index++) {
        data[index].user.modifiedAt = getMyDate();
      }

      addUserRoleList(data).then(response => {
        this.dialogFormVisible = false;
        this._parentThis && this._parentThis.fetchData();
      });
      this.$message({
        showClose: true,
        message: "添加成功",
        type: "success"
      });
      this.dialogFormVisible = false;
      this.form.name = "";
      this.list = null;
      data = [];
    },
    handleCreated: function(ztreeObj) {
      this.ztreeObj = ztreeObj;
      ztreeObj.expandNode(ztreeObj.getNodes()[0], false,true)
    }
  },
  watch:{
    dialogFormVisible(){
      this.needToForm = []
      if(this.dialogFormVisible){
        this.fetchData();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.UsesirRolePlus /deep/ {
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
  // .button.chk,.button {
  //   display: none;
  // }
  // .curSelectedNode {
  //   width: calc(100% - 10px);
  // }
  // .curSelectedNode .node_name {
  //   color: #ffffff;
  //   background-color: #009aff;
  //   width: 100%;
  // }
  // .node_name {
  //   padding-left: 0;
  //   text-indent: 3px;
  // }
  // .node_name::before {
  //   content: '11';
  //   display: inline-block;
  //   background-color: #ffffff;
  // }
}
</style>
