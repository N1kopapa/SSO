<template>
  <div class="KeeperPasswdChange">
    <el-dialog
      title="管理员密码重置"
      align="center"
      :visible.sync="dialogFormVisible"
      :modal-append-to-body="false"
    >
      <el-form :model="form" style="width:330px;">
        <el-form-item label="重置密码" :label-width="formLabelWidth">
          <el-input v-model="newUserPwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <el-input v-model="form.userPwd" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button type="primary" @click="confirm()">确 定</el-button>
        <el-button class="cancel" @click="cancel()">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.KeeperPasswdChange /deep/ {
  .el-dialog__header {
    box-shadow: 0px 1px 5px #c5c5c5;
  }
  .el-dialog__title {
    font-weight: bold;
  }
  .el-form-item {
    margin-bottom: 8px;
  }
  .cancel {
    color: #00a2fd;
    border-color: #00a2fd;
  }
}
</style>
<script>
import { updateUser } from "@/api/user-manage";
export default {
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      newUserPwd: "",
      form: {
        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        tenantId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        isDisabled: true,
        userName: "string",
        userPwd: "string",
        nickName: "string",
        headPortrait: "string",
        userType: "00000000-0000-0000-0000-000000000000",
        actualName: "string",
        sex: true,
        idCard: "string",
        birthDay: "2020-02-28T03:05:17.304Z",
        qq: "string",
        weiXin: "string",
        email: "string",
        fixPhone: "string",
        mobilePhone: "string",
        short: 0,
        addressId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        registerTime: "2020-02-28T03:05:17.304Z",
        lastLoginTime: "2020-02-28T03:05:17.304Z",
        status: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        remark: "string",
        createdBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        createdAt: "2020-02-28T03:05:17.304Z",
        modifiedBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        modifiedAt: "2020-02-28T03:05:17.304Z",
        validate: true
      },
      formLabelWidth: "80px"
    };
  },
  methods: {
    confirm() {
      if (
        this.newUserPwd !== this.form.userPwd ||
        this.newUserPwd == undefined ||
          this.newUserPwd == "" ||
          this.newUserPwd == null
      ) {
        this.$message({
          showClose: true,
          message: "确认密码与重置密不一致",
          type: "error"
        });
        return;
        this.newUserPwd = ""
        this.form.userPwd = ""
      }
      let _this = this;
      updateUser(this.form.userId, this.form).then(response => {
        this.$message({
          showClose: true,
          message: "密码修改成功",
          type: "success"
        });
        _this.dialogFormVisible = false;
        // this.form = {};
        this.newUserPwd = "";
      });
    },
    cancel() {
      this.dialogFormVisible = false;
      this.newUserPwd = ""
    }
  }
};
</script>