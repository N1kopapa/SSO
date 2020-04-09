<template>
  <div class="TabPaneTenantInfo">
    <!-- <p class="boss">{{ tenantInfo.tenantName }}</p> -->
    <el-row>
      <el-col>
        <el-tag color="transparent" class="head-title">{{ tenantInfo.tenantName }}</el-tag>
      </el-col>
    </el-row>
    <div class="tenantInfoBox">
      <p class="title">租户类型</p>
      <p>{{tenantInfo.tenantTypeName}}</p>
      <p class="title">区域</p>
      <p>{{tenantInfo.areaName}}</p>
      <p class="title">启用日期</p>
      <p>{{disStartDate}}</p>
      <p class="title">备注说明</p>
      <p>{{tenantInfo.remark}}</p>
      <p class="title">到期日期</p>
      <p>{{disEndDate}}</p>
      <p class="title">是否禁用</p>
      <p>{{tenantInfo.isDisabled?"是":"否"}}</p>
      <p class="title">使用状态</p>
      <p>{{tenantInfo.usageStatusName}}</p>
      <p class="title">logo标志</p>
      <img v-bind:src="tenantInfo.logo" width="40px" height="40px">
      <!-- <p class="title">当前状态</p>
      <p>{{tenantInfo.currentStatusName}}</p> -->

    </div>
    <el-row style="border-bottom:1px solid #d1ddf0;">
      <el-col>
        <el-tag color="transparent" class="head-title">联系信息</el-tag>
        <el-button type="text" style="float:right;" :disabled="needEdit" icon="el-icon-edit" @click="edit()">编辑</el-button>
      </el-col>
    </el-row>
    <el-form :model="tenantEditInfo" style="margin-top:20px;width:430px;">
      <el-form-item label="联系人" :label-width="formLabelWidth">
        <el-input v-model="tenantEditInfo.contactPerson" :disabled="!needEdit" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" :label-width="formLabelWidth">
        <el-input v-model="tenantEditInfo.contactPhone" :disabled="!needEdit" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱" :label-width="formLabelWidth">
        <el-input v-model="tenantEditInfo.email" :disabled="!needEdit" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div class="dialog-footer touch-bottom" align="center">
      <el-button type="primary" v-if="needEdit" @click="confirm()">保存</el-button>
      <el-button class="cancel" v-if="needEdit" @click="cancel()">取消</el-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.TabPaneTenantInfo{
  .el-form-item {
    margin-bottom: 8px;
  }
  .cancel {
    color: #00a2fd;
    border-color: #00a2fd;
  }
  /deep/ .el-input.is-disabled .el-input__inner {
    background-color: transparent;
    border-color: transparent;
    color: #333333;
    cursor: default;
  }
  .boss{
    font-size: 25px;
  }
  .tenantInfoBox{
    display: grid;
    grid-template-columns: 10% 30% 10% 30%;
    padding: 10px 10px 40px;
    .title{
      color: #7688a3;
    }
    p {
      height: 18px;
      margin: 10px 0;
    }
  }
  .head-title {
    border:none;
    color:#333333;
    font-size:16px;
    font-weight: bold;
    float: left;
    line-height: 38px;
  }
  .touch-bottom {
    position: absolute;
    bottom: 15px;
    width: 100%;
    left: 0;
  }
}
</style>
<script>
import { getTenant, updateTenant } from '@/api/tenant'
import { getBasicUserInfo } from '@/api/basic-user-info'
import { validate_tenantInfo } from '@/utils/validate'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  props: {
    type: {
      type: String,
      default: 'CN'
    }
  },
  data() {
    return {
      loading: false,
      tenantId:"",
      needEdit:false,
      formLabelWidth: '80px',
      disStartDate:"",
      disEndDate:"",
      tenantInfo: {
            tenantId: "12345",
            isDisabled: true,
            tenantName: "string",
            loginAccount: "string",
            tenantType: "",
            startDate: "2020-02-29T01:28:06.813Z",
            endDate: "2020-02-29T01:28:06.813Z",
            area: "",
            legalPerson: "string",
            contactPerson: "",
            contactPhone: "",
            addressId: "",
            email: "",
            usageStatus: "",
            currentStatus: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            logo: "string",
            remark: "string",
            createdBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            createdAt: "2020-02-29T01:28:06.813Z",
            modifiedBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            modifiedAt: "2020-02-29T01:28:06.813Z"
      },
      tenantEditInfo: {
            tenantId: "12345",
            isDisabled: true,
            tenantName: "string",
            loginAccount: "string",
            tenantType: "",
            startDate: "2020-02-29T01:28:06.813Z",
            endDate: "2020-02-29T01:28:06.813Z",
            area: "",
            legalPerson: "string",
            contactPerson: "string",
            contactPhone: "string",
            addressId: "",
            email: "string",
            usageStatus: "",
            currentStatus: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            logo: "string",
            remark: "string",
            createdBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            createdAt: "2020-02-29T01:28:06.813Z",
            modifiedBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            modifiedAt: "2020-02-29T01:28:06.813Z"
      }
    }
  },
  created() {
    this.loading = true
    this.getTenantInfo()
  },
  methods: {
    getTenantInfo(){
      this.tenantId = localStorage.getItem("tenantId")
      if (this.tenantId == null){
        getBasicUserInfo().then(response => {
            this.tenantId = response.data.tenantId
            localStorage.setItem("tenantId",this.tenantId);
            getTenant(this.tenantId).then(response => {
              this.tenantInfo = Object.assign(response.data)
              this.tenantEditInfo = Object.assign(response.data)
              this.processTime()
              this.loading = false
            })
        })
      }
      else {
            getTenant(this.tenantId).then(response => {
              this.tenantInfo = Object.assign(response.data)
              this.tenantEditInfo = Object.assign(response.data)
              this.processTime()
              this.loading = false
            })
      }
    },

    processTime(){
      if (this.tenantInfo.startDate && this.tenantInfo.startDate.length > 10)
        this.disStartDate = this.tenantInfo.startDate.substr(0,10)
      if (this.tenantInfo.endDate && this.tenantInfo.endDate.length > 10)
        this.disEndDate = this.tenantInfo.endDate.substr(0,10)
    },

    edit(){
      this.needEdit = true
    },
    confirm(){

      let ret = validate_tenantInfo(this.tenantEditInfo)
      if (!ret.isOK){
        this.$message({
            showClose: true,
            message: ret.errInfo,
            type: "error"
        })
        return
      }  
      
      updateTenant(this.tenantId,this.tenantEditInfo).then(response => {
        this.$message({
            showClose: true,
            message: "修改成功",
            type: "success"
          });
        this.needEdit = false
      })
    },
    cancel(){
      this.needEdit = false
      this.getTenantInfo()
    }
  },
}
</script>

