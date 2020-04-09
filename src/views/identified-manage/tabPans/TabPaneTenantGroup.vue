<template>
  <div class="sudoku_row">
    <el-row style="width:100%;padding: 0 12px 0 0;margin-bottom:-5px;">
      <el-col v-if="isAdmin">
        <el-tag color="transparent" class="head-title">租户分组</el-tag>
        <el-button class="el-icon-plus" type="primary" style="float:right;" @click="addGroupO()">新增</el-button>
      </el-col>
    </el-row>
    <ul class="group">
      <li class="group_item" v-for="item in list" :key="item.groupId">
        <div class="group_item_title">{{item.groupName}}</div>
        <div class="group_item_content">
          <!-- <div v-for="item1 in item.tenantNames" :key="item1" class="box">
            <img class="img" src="../../../assets/temporary/1.png">
            <span class="text">{{ item1 }}</span>
          </div>-->
          <div v-if="item.tenantNames.length>0" class="box">
            <img class="img" src="../../../assets/temporary/1.png" />
            <span class="text">{{ item.tenantNames[0] }}</span>
          </div>
          <div v-if="item.tenantNames.length>1" class="box">
            <img class="img" src="../../../assets/temporary/1.png" />
            <span class="text">{{ item.tenantNames[1] }}</span>
          </div>
          <div v-if="item.tenantNames.length>2" class="box">
            <img class="img" src="../../../assets/temporary/1.png" />
            <span class="text">{{ item.tenantNames[2] }}</span>
          </div>
        </div>
        <div class="group_item_more">
          <div class="button" v-if="item.tenantNames.length>3" @click="selectGroup(item)">查看</div>
          <div class="button" v-if="isAdmin" @click="editGroup(item)">编辑</div>
          <div class="button" v-if="isAdmin" @click="deleteGroup(item)">删除</div>
        </div>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" center :modal-append-to-body='false' >
          <div class="el-icon-warning warning">确认删除信息？</div>
          <div slot="footer" class="dialog-footer" align="center">
            <el-button type="primary" @click="deleteGroupConfirm()">确 定</el-button>
            <el-button @click="dialogVisible = false">取 消</el-button>
          </div>
        </el-dialog>
      </li>
    </ul>
          <pagination
        :total="total"
        :page.sync="listQuery.pageIndex"
        :limit.sync="listQuery.pageSize"
        @pagination="getList"
        class="sysdictionary_pagination"
      />
    <tenants-of-group ref="tenants" />
    <group-add ref="add" @flush="getList" />
  </div>
</template>  


<style scoped lang="scss">
/deep/.el-dialog__body{
  text-align: center;
}
.sudoku_row {
  display: flex;
  padding: 1px;
  flex-direction: row;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  .head-title {
    border: none;
    color: #333333;
    font-size: 16px;
    font-weight: bold;
    float: left;
    line-height: 38px;
  }
  .group {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 33.33%);
    grid-template-rows: auto;
    padding: 0;
    margin: 0;
    .group_item {
      position: relative;
      box-shadow: 0px 1px 5px #c5c5c5;
      display: inline-block;
      align-items: center;
      width: 95%;
      height: 192px;
      margin: 15px 5px 5px 8px;
      border: 1px solid #eaeaea;
      border-radius: 5px;
      .group_item_title {
        height: 50px;
        text-align: center;
        padding-top: 15px;
        background-color: #f3f5fa;
        font-weight: bold;
      }
      .group_item_content {
        // padding: 20px;
        .box {
          margin: 14px;
        }
        .img {
          vertical-align: middle;
          width: 22px;
          height: 22px;
        }
        .text {
          vertical-align: middle;
        }
      }
      .group_item_more {
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 20px;
        padding-bottom: 10px;
        display: inline-block;
        margin-bottom: 0px;
        font-size: 14px;
        color: rgb(62, 175, 255);
        .button {
          display: inline-block;
          cursor: pointer;
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
<script>
import { fetchGroup } from "@/api/group";
import TenantsOfGroup from "./dialog-box/TenantsOfGroup.vue";
import { fetchTenantList } from "@/api/tenant";
import GroupAdd from "./dialog-box/GroupAdd";
import { addGroup, delGroup } from "@/api/group";
import Pagination from "@/components/Pagination";
import { getMyDate } from "@/utils/date";
export default {
  name: "sudoku",
  components: { TenantsOfGroup, GroupAdd,Pagination },
  data() {
    return {
      shiftItem:null,
      dialogVisible:false,
      isAdmin: false,
      list: null,
      total:0,
      listQuery: {
        pageIndex: 1,
        pageSize: 9,
        sortBy: 'updateAt',
        isDescending: true,
        condition: {}
      },

      tenantQuery: {
        pageIndex: 1,
        pageSize: 10000,
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
      /* 这样写居然错了，一模一样。什么接口啊。唉。
    tenantQuery: {
        pageIndex: 1,
        pageSize: 5,
        sortBy:'',
        isDescending:true,
        tenantName:"",
        loginAccount:"",
        tenantType:"00000000-0000-0000-0000-000000000000",
        startDate:"2000-02-29",
        endDate:"2021-02-29",
        legalPerson:"",
        groupId:""
      },
*/
      curSelect: null
    };
  },

  mounted() {
    this.isAdmin = localStorage.getItem("userName") == "admin";
    this.getList();
  },

  methods: {
    getList() {
      this.loading = true;
      fetchGroup(this.listQuery).then(response => {
        this.list = response.data.list;
        this.total = response.data.totalCount;
        this.loading = false;
      });
    },

    selectGroup(e) {
      console.log("dddd");
      this.$refs.tenants.dialogFormVisible = true;
      this.tenantQuery.groupId = e.groupId;
      fetchTenantList(this.tenantQuery).then(response => {
        this.tenantlist = response.data.list;
        this.$refs.tenants.list = response.data.list;
      });
    },
    addGroupO() {
      this.$refs.add.dialogFormVisible = true;
      this.$refs.add._parentThis = this;
      this.$refs.add.checkTenants=[];
      this.$refs.add.tenantGroup.groupName="";
      this.$refs.add.currentTitle = "租户分组新增";
    },
    editGroup(item) {
      this.tenantQuery.groupId = item.groupId;
      fetchTenantList(this.tenantQuery).then(response => {
        this.$refs.add.checkTenants = response.data.list;

        this.$refs.add.isEditGroup = true;
        this.$refs.add.currentTitle = "租户分组编辑";
        this.$refs.add.groupId = item.groupId;

        // this.$refs.add.tenantGroup = Object.assign(item);
        this.$refs.add.tenantGroup = JSON.parse(JSON.stringify(item))
        this.$refs.add.tenantGroup.updateAt = getMyDate()
        this.$refs.add.dialogFormVisible = true;
        
      });
    },
    deleteGroup(item){
      this.dialogVisible = true;
      this.shiftItem = item;
    },
    deleteGroupConfirm() {
      let item = this.shiftItem;
      let _this = this;
      let groupList = [];
      groupList.push(item.groupId);
      delGroup(groupList).then(response => {
        _this.getList();
        this.$message({
            showClose: true,
            message: "删除成功",
            type: "success"
          });
          this.shiftItem = null;
          this.dialogVisible = false;
      });
    }
  }
};
</script>  

