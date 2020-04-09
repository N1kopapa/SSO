<template>
  <div class="TabPaneSMTP">
    <div style="margin: 20px;"></div>
    <el-row style="border-bottom:1px solid #d1ddf0;">
      <el-col>
        <el-tag color="transparent" class="head-title">SMTP信息</el-tag>
        <el-button type="text" style="float:right;" :disabled="needEdit" icon="el-icon-edit" @click="edit()">编辑</el-button>
      </el-col>
    </el-row>
    <el-form :label-position="labelPosition" label-width="100px" :model="formSMTP" style="margin-top:20px;">
      <el-form-item label="SMTP名">
        <el-input :disabled="!needEdit" v-model="formSMTP.smtpName"></el-input>
      </el-form-item>
      <el-form-item label="smtp主机名">
        <el-input :disabled="!needEdit" v-model="formSMTP.smtpHostName"></el-input>
      </el-form-item>
      <el-form-item label="SMTP端口号">
        <el-input :disabled="!needEdit" v-model="formSMTP.smtpPort" type="number"></el-input>
      </el-form-item>
      <el-form-item label="信封从">
        <el-input :disabled="!needEdit" v-model="formSMTP.smtpFromEmailAddress"></el-input>
      </el-form-item>
      <el-form-item label="SMTP密码">
        <el-input :disabled="!needEdit" v-model="formSMTP.smtpPwd"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input :disabled="!needEdit" v-model="formSMTP.smtpDesc"></el-input>
      </el-form-item>
      <el-form-item class="touch-bottom" style="text-align: center;">
        <el-button type="primary" v-if="needEdit" @click="save()">保存</el-button>
        <el-button v-if="needEdit" @click="cancel()">取 消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style lang="scss" scoped>
.TabPaneSMTP {
  /deep/ .el-form-item {
    margin-bottom: 8px;
  }
  .el-input {
    width: 60%;
    margin-right: 24%;
    // margin-bottom: 15px;
  }
  /deep/ .el-form {
    .el-form-item__label {
      margin-left: 120px;
      color: #7688a3;
      font-weight: normal;
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
  /deep/ .el-input.is-disabled .el-input__inner {
    background-color: transparent;
    border-color: transparent;
    color: #333333;
    cursor: default;
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
import {
  addSMTPConfig,
  updateSMTPConfig,
  getSMTPConfig
} from "@/api/tenant-smtp-config";
import { getBasicUserInfo } from "@/api/basic-user-info";

export default {
  data() {
    return {
      needEdit:false,
      labelPosition: "right",
      tenantId: "",
      userId:"",
      shouldAddOrUpdate: 0, //1-add;2-update
      formSMTP: {
        smtpId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        smtpName: "",
        smtpDesc: "",
        smtpFromEmailAddress: "",
        smtpHostName: "",
        smtpPort: 80,
        smtpPwd: ""
      }
    };
  },
  mounted() {
    this.getSMTPInfo()
  },
  methods: {
    getSMTPInfo(){
    let _this = this;
    this.tenantId = localStorage.getItem("tenantId");
    if (this.tenantId == null) {
      getBasicUserInfo().then(response => {
        this.tenantId = response.data.tenantId;
        localStorage.setItem("tenantId", this.tenantId);

        getSMTPConfig(this.tenantId).then(response => {
          if (response.data.smtpName != null) {
            _this.formSMTP = Object.assign(response.data);
            this.shouldAddOrUpdate = 2;
          } else {
            this.shouldAddOrUpdate = 1;
          }
        });
      });
    } else {
      getSMTPConfig(this.tenantId).then(response => {
        if (response.data.smtpName != null) {
          _this.formSMTP = Object.assign(response.data);
          this.shouldAddOrUpdate = 2;
        } else {
          this.shouldAddOrUpdate = 1;
        }
      });
    }
    },
    edit(){
      this.needEdit = true
    },
    save() {
      this.formSMTP.smtpPort = parseInt(this.formSMTP.smtpPort,10)
      if (this.shouldAddOrUpdate == 2)
        updateSMTPConfig(this.tenantId, this.formSMTP).then(response => {
           this.$message({
            showClose: true,
            message: "修改成功",
            type: "success"
          });

          this.getSMTPInfo()
        });
      else if (this.shouldAddOrUpdate == 1){
        this.formSMTP.smtpId = this.tenantId
        addSMTPConfig(this.formSMTP).then(response => {
          
          this.$message({
            showClose: true,
            message: "新建成功",
            type: "success"
          });

          this.getSMTPInfo()
        });
      }

      this.needEdit = false
    },

    cancel() {
      this.needEdit = false
      this.getSMTPInfo()
    }
  }
};
</script>
