<template>
  <div class="TabPaneShortMsg">
    <div style="margin: 20px;"></div>
    <el-row style="border-bottom:1px solid #d1ddf0;">
      <el-col>
        <el-tag color="transparent" class="head-title">短信信息</el-tag>
        <el-button type="text" style="float:right;" :disabled="needEdit" icon="el-icon-edit" @click="edit()">编辑</el-button>
      </el-col>
    </el-row>
    <el-form :label-position="labelPosition" label-width="100px" :model="formShortMsg" style="margin-top:20px;">
      <el-form-item label="短信用户名">
        <el-input :disabled="!needEdit" v-model="formShortMsg.messageUserName"></el-input>
      </el-form-item>
      <el-form-item label="短信Key">
        <el-input :disabled="!needEdit" v-model="formShortMsg.messageKey"></el-input>
      </el-form-item>
      <el-form-item label="短信URL">
        <el-input :disabled="!needEdit" v-model="formShortMsg.messageUrl"></el-input>
      </el-form-item>

      <el-form-item class="touch-bottom" style="text-align: center;">
        <el-button type="primary" v-if="needEdit" @click="save()">保存</el-button>
        <el-button v-if="needEdit" @click="cancel()">取 消</el-button>
      </el-form-item>
      <success ref="success"/>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.TabPaneShortMsg {
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
  addMessageConfig,
  updateMessageConfig,
  getMessageConfig
} from "@/api/tenant-message-config";
import { getBasicUserInfo } from "@/api/basic-user-info";
import success from "@/dialog-box/success"

export default {
  components: { success },
  data() {
    return {
      needEdit:false,
      labelPosition: "right",
      tenantId: "",
      shouldAddOrUpdate: 0, //1-add;2-update
      formShortMsg: {
        messageId: "",
        tenantId: "",
        messageUserName: "",
        messageKey: "",
        messageUrl: ""
      }
    };
  },
  mounted() {
    this.getMessageInfo()
  },
  methods: {
    getMessageInfo(){
    let _this = this;
    this.tenantId = localStorage.getItem("tenantId");
    if (this.tenantId == null) {
      getBasicUserInfo().then(response => {
        this.tenantId = response.data.tenantId;
        localStorage.setItem("tenantId", this.tenantId);

        getMessageConfig(this.tenantId).then(response => {
          if (response.data.messageUserName != null) {
            _this.formShortMsg = Object.assign(response.data);
            this.shouldAddOrUpdate = 2;
          } else {
            this.shouldAddOrUpdate = 1;
          }
        });
      });
    } else {
      getMessageConfig(this.tenantId).then(response => {
        if (response.data.messageUserName != null) {
          _this.formShortMsg = Object.assign(response.data);
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
      if (this.shouldAddOrUpdate == 2){
        this.formShortMsg.tenantId = this.tenantId
        updateMessageConfig(this.tenantId, this.formShortMsg).then(response => {
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success"
          });

          this.getMessageInfo()
        });
      }
      else if (this.shouldAddOrUpdate == 1){
        this.formShortMsg.messageId = this.tenantId
        this.formShortMsg.tenantId = this.tenantId
        addMessageConfig(this.formShortMsg).then(response => {
           this.$message({
            showClose: true,
            message: "新建成功",
            type: "success"
          });

          this.getMessageInfo()
        });
      }
      this.needEdit = false
    },

    cancel() {
      this.needEdit = false
      this.getMessageInfo()
    }
  }
};
</script>
