<template>
<div class="TabPaneLoginValidate">
<div style="margin: 20px;"></div>
<el-row style="border-bottom:1px solid #d1ddf0;">
  <el-col>
    <el-tag color="transparent" class="head-title">登录验证</el-tag>
    <el-button type="text" style="float:right;" :disabled="needEdit" icon="el-icon-edit" @click="edit()">编辑</el-button>
  </el-col>
</el-row>
<el-form :label-position="labelPosition" label-width="100px" :model="tenantInfo" style="margin-top:20px;">
  <el-form-item class="CheckList" label="">
    <el-switch :disabled="!needEdit" v-model="tenantInfo.isFormValid"></el-switch>表单验证
    <el-switch :disabled="!needEdit" v-model="tenantInfo.isADValid"></el-switch>AD域验证
    <el-switch :disabled="!needEdit" v-model="tenantInfo.isMessageValid"></el-switch>短信验证
    <!-- <el-switch v-model="tenantInfo.isWXValid"></el-switch>微信验证
    <el-switch v-model="tenantInfo.isQQValid"></el-switch>QQ验证 -->
  </el-form-item>

  <el-form-item class="touch-bottom" style="text-align: center;">
        <el-button type="primary" v-if="needEdit" @click="save()">保存</el-button>
        <el-button v-if="needEdit" @click="cancel()">取 消</el-button>
      </el-form-item>
</el-form>
</div>
</template>

<style scoped lang="scss">
.TabPaneLoginValidate{
  .CheckList{
    padding-top: 10px;
    padding-bottom: 10px;
    // background-color: #F3F5FA;
    overflow: hidden;

    /deep/.el-form-item__content{
    margin-left: 100px;
    display: grid;
    grid-template-columns: repeat(2,100px);
    }
    
    /deep/.el-form-item__content::before, .el-form-item__content::after{
      display:none;
    }
  }
  .el-checkbox{
    margin-left: 25px;
  }
  .el-switch{
    margin-left: 15px;
    margin-right: 5px;
        margin-bottom: 40px;
    /deep/ .el-switch__core{
          margin-top: 15px;
    }
  }
  .ADCheckLabel{
    display: inline-block;
    width: 10%;
    margin-right: 5%;
    text-align: right;
  }
  .el-input{
    width: 60%;
    margin-right: 24%;
    margin-bottom: 15px;
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

  export default {
    data() {
      return {
        needEdit:false,
        tenantId:"",
        tenantInfo: {
            tenantId: "",
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
            modifiedAt: "2020-02-29T01:28:06.813Z",
            isFormValid: true,
            isADValid: true,
            isMessageValid: true,
            isWXValid: true,
            isQQValid: true,
        },
        labelPosition: 'right',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        }
      };
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
              this.loading = false
            })
        })
      }
      else {
            getTenant(this.tenantId).then(response => {
              this.tenantInfo = Object.assign(response.data)
              this.loading = false
            })
      }
    },
    edit(){
      this.needEdit = true
    },
    save(){
      updateTenant(this.tenantId,this.tenantInfo).then(response => {
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success"
          });
          this.needEdit = false
          this.getTenantInfo()
      })
    },
    cancel(){
      this.needEdit = false
      this.getTenantInfo()
    }
  },

  }
</script>
