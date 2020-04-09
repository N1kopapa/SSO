<template>
  <div class="TabPaneAdinfo">
    <div style="margin: 20px;"></div>
    <el-row style="border-bottom:1px solid #d1ddf0;">
      <el-col>
        <el-tag color="transparent" class="head-title">AD信息</el-tag>
        <el-button type="text" style="float:right;" :disabled="needEdit" icon="el-icon-edit" @click="edit()">编辑</el-button>
      </el-col>
    </el-row>
    <el-form :label-position="labelPosition" label-width="100px" :model="formAdds" style="margin-top:20px;">
      <el-form-item class="test" label="addsip">
        <el-input :disabled="!needEdit" v-model="formAdds.addsip"></el-input>
      </el-form-item>
      <el-form-item label="域名">
        <el-input :disabled="!needEdit" v-model="formAdds.domainName"></el-input>
      </el-form-item>
      <el-form-item label="admin登录名">
        <el-input :disabled="!needEdit" v-model="formAdds.adminLoginName"></el-input>
      </el-form-item>
      <el-form-item label="admin密码">
        <el-input :disabled="!needEdit" v-model="formAdds.adminPassword"></el-input>
      </el-form-item>
      <el-form-item label="根OU名字">
        <el-input :disabled="!needEdit" v-model="formAdds.ouRootName"></el-input>
      </el-form-item>

      <!-- <el-form-item label="createdAt">
        <span>{{formAdds.createdAt}}</span>
      </el-form-item> -->

      <!-- <el-form-item label="modifiedAt">
        <span>{{formAdds.modifiedAt}}</span>
      </el-form-item> -->

      <el-form-item class="touch-bottom" style="text-align: center;">
        <el-button type="primary" v-if="needEdit" @click="save()">保存</el-button>
        <el-button v-if="needEdit" @click="cancel()">取 消</el-button>
      </el-form-item>
      <success ref="success"/>
    </el-form>
  </div>
</template>


<style scoped lang="scss">
.TabPaneAdinfo {
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
  addAdConfig,
  updateAdConfig,
  getAdConfig
} from "@/api/tenant-ad-config";
import { getBasicUserInfo } from "@/api/basic-user-info";
import success from "@/dialog-box/success"

export default {
  components: { success },
  data() {
    return {
      needEdit:false,
      labelPosition: "right",
      tenantId: "",
      userId:"",
      shouldAddOrUpdate: 0, //1-add;2-update
      formAdds: {
        addsConfigId: "",
        tenantId: "",
        addsip: "",
        domainName: "",
        adminLoginName: "",
        adminPassword: "",
        ouRootName: "",
        createdBy: "",
        createdAt: "2019-03-04T07:33:17.968Z",
        modifiedBy: "",
        modifiedAt: "2020-03-04T07:33:17.968Z"
      }
    };
  },
  mounted() {
    this.getADInfo()
  },
  methods: {
    getADInfo(){
    let _this = this;
    this.tenantId = localStorage.getItem("tenantId");
    this.userId = localStorage.getItem("userId");

    if (this.tenantId == null || this.userId == null) {
      getBasicUserInfo().then(response => {
        this.tenantId = response.data.tenantId;
        localStorage.setItem("tenantId", this.tenantId);
        localStorage.setItem("userId", this.userId);

        getAdConfig(this.tenantId).then(response => {
          if (response.data.domainName != null) {
            _this.formAdds = Object.assign(response.data);
            this.shouldAddOrUpdate = 2;
          } else {
            this.shouldAddOrUpdate = 1;
          }
        });
      });
    } else {
      getAdConfig(this.tenantId).then(response => {
        if (response.data.domainName != null) {
          _this.formAdds = Object.assign(response.data);
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
      this.formAdds.createdBy = this.userId
      this.formAdds.modifiedBy = this.userId
      if (this.shouldAddOrUpdate == 2)
        updateAdConfig(this.tenantId, this.formAdds).then(response => {
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success"
          });

          this.getADInfo()
        });
      else if (this.shouldAddOrUpdate == 1){
        this.formAdds.addsConfigId = this.tenantId
        this.formAdds.tenantId = this.tenantId
        addAdConfig(this.formAdds).then(response => {
          this.$message({
            showClose: true,
            message: "新建成功",
            type: "success"
          });

          this.getADInfo()
        });
      }
      this.needEdit = false
    },

    cancel() {
      this.needEdit = false
      this.getADInfo()
    }
  }
};
</script>
