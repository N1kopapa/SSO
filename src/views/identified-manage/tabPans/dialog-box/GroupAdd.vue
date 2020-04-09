<template>
  <el-dialog class="GroupAdd" :title="currentTitle" align="center" :visible.sync="dialogFormVisible" :modal-append-to-body='false'>
    <el-form label-width="80px">
      <el-form-item label="分组名称">
        <el-input v-model="tenantGroup.groupName" style="width:250px;float:left;" />
      </el-form-item>
      <el-form-item label="已选租户">
        <el-row style="border:1px solid #d1ddf0;min-height:110px;">
          <el-col
            v-for="item in checkTenants"
            :key="item"
            :span="8"
            align="left"
            style="padding-left:13px;height:36px;overflow:hidden;"
          >
            <img class="img" src="../../../../assets/temporary/1.png">
            <span>{{item.tenantName}}</span>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="租户列表">
        <el-checkbox-group v-model="checkTenants">
          <el-checkbox-button class="checkbox" v-for="item in list" :label="item" :key="item.tenantId">
            <img class="img" src="../../../../assets/temporary/1.png">
            <span class="text" :title="item.tenantName">{{ item.tenantName }}</span>
            <el-tag class="el-icon-success check-icon" />
          </el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer" align="center">
      <el-button type="primary" @click="confirm()">确 定</el-button>
      <el-button class="cancel" @click="cancel()">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { addGroup,updateGroup } from  '@/api/group'
import { addTenantToGroup } from  '@/api/group_tenant'
import { fetchTenantList } from  '@/api/tenant'
import { validate_group } from  "@/utils/validate"
import { getMyDate } from '../../../../utils/date'
  export default {
    data() {
      return {
        // 编辑-分组功能。
        isEditGroup:false,
        _parentThis:null,
        currentTitle:"",
        checkTenants:[],

        list:null,
        dialogTableVisible: false,
        dialogFormVisible: false,
        groupId:"",
        tenantGroup: {
          // groupId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          groupName: "",
          createAt: "2020-03-07T07:53:56.659Z",
          createBy: "",
          tenantId: "",
          updateAt: "2020-03-07T07:53:56.659Z",
          updateBy: ""
        },
        tenantQuery: {
         pageIndex: 1,
         pageSize: 100,
         sortBy: 'modifiedAt',
         isDescending:true,
         tenantName:"",
         loginAccount:"",
         tenantType:"00000000-0000-0000-0000-000000000000",
         startDate:"1900-11-1",
         endDate:"2021-11-1",
         legalPerson:"",
        //  groupId:""
      },
        formLabelWidth: '120px'
      };
    },
    created(){
        this.getList()
    },
    methods:{
    getList() {
      this.loading = true
      fetchTenantList(this.tenantQuery).then(response => {
        this.list = response.data.list
      })
    },
      confirm(){
        let _this = this;

        // 参数效验
        let ret = validate_group(this.tenantGroup,this.checkTenants)
        if (!ret.isOK){
          this.$message({
            showClose: true,
            message: ret.errInfo,
            type: "error"
        })
        this.$emit("flush");
        return
        }  

        if (this.isEditGroup){
          updateGroup(this.groupId,this.tenantGroup).then(response=>{
            this.$message({
            showClose: true,
            message: "修改成功",
            type: "success"
            });
            let data = []
            for (var i=0;i<this.checkTenants.length;i++)
              data.push({"groupId":this.groupId,
              "tenantId": this.checkTenants[i].tenantId})

            addTenantToGroup(data).then(response => {
              this.$emit("flush");
              console.log("good,good,good"+response.code)
              _this.dialogFormVisible = false
            })

          })
        }
        else{
          let userId = localStorage.getItem("userId");
          this.tenantGroup.createBy = userId;
          this.tenantGroup.updateBy = userId;
          this.tenantGroup.tenantId = localStorage.getItem("tenantId");
            this.tenantGroup.updateAt = getMyDate();
            this.tenantGroup.createAt = getMyDate();
          var myDate = new Date();
          //this.tenantGroup.createAt = myDate.toLocaleDateString()
          //this.tenantGroup.updateAt = myDate.toLocaleDateString()
          addGroup(this.tenantGroup).then(response => {
          this.groupId = response.data
          let data = []
          for (var i=0;i<this.checkTenants.length;i++)
            data.push({"groupId":this.groupId,
            "tenantId": this.checkTenants[i].tenantId})
        
          addTenantToGroup(data).then(response => {
            this.$emit("flush");
            _this._parentThis && _this._parentThis.getList()
            this.$message({
            showClose: true,
            message: "添加成功",
            type: "success"
            });
            _this.dialogFormVisible = false
         })
        })
      }
      },
      cancel(){
        this.dialogFormVisible = false
      }
    }
  }

</script>

<style lang="scss" scoped>
.GroupAdd /deep/ {
  .el-form-item__label {
    color: #7688a3;
    font-weight: normal;
  }
  .el-form-item {
    margin-bottom: 8px;
  }
  .el-dialog__title {
    font-weight: bold;
  }
  .cancel {
    color: #00a2fd;
    border-color: #00a2fd;
  }
  .img {
    vertical-align: middle;
    width: 22px;
    height: 22px;
  }
  .text {
    overflow: hidden;
    width: calc(100% - 50px);
    display: inline-block;
    vertical-align: middle;
    text-overflow: ellipsis;
  }
  .checkbox {
    width: 49%;
    float: left;
  }
  .checkbox:nth-of-type(2n+1) {
    margin-right: 2%;
  }
  .el-checkbox-button__inner {
    width: 100%;
    border: none;
    border-bottom: 1px solid #d1ddf0;
    border-top: 1px solid #d1ddf0;
    margin-bottom: -1px;
    text-align: left;
    padding: 10px 2px;
  }
  .check-icon {
    display: none;
    float: right;
    font-size: 20px;
    height: 22px;
    border: none;
    padding: 0;
    background-color: transparent;
  }
  .el-checkbox-button.is-checked {
    .el-checkbox-button__inner {
      color: #333333;
      background-color: #ffffff;
      box-shadow: none;
    }
    .check-icon {
      display: block;
    }
  }
}
</style>
