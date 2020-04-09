<template>
<div class="KeeperAdd">
<el-dialog title="管理员账号编辑" :visible.sync="dialogFormVisible" :modal-append-to-body='false'>

  <el-form :model="form">
    <el-form-item label="用户名" :label-width="formLabelWidth">
      <el-input v-model="form.userName" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" :label-width="formLabelWidth">
      <el-input v-model="form.email" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="手机" :label-width="formLabelWidth">
      <el-input v-model="form.mobilePhone" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="QQ" :label-width="formLabelWidth">
      <el-input v-model="form.qq" autocomplete="off"></el-input>
    </el-form-item>

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="confirm()">确 定</el-button>
    <el-button @click="cancel()">取 消</el-button>
  </div>
</el-dialog>
</div>
</template>

<style scoped lang="scss">
.KeeperAdd /deep/ .el-dialog__header {
  box-shadow: 0px 1px 5px #c5c5c5;
}
</style>
<script>
import { addUser } from  '@/api/user-manage'
import { getMyDate } from '@/utils/date';
  export default {
    data() {
      return {
        dialogTableVisible: false,
        dialogFormVisible: false,
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
        formLabelWidth: '120px'
      };
    },
    methods:{
      confirm(){
        let _this = this;
        this.form.modifiedAt = getMyDate();
        this.form.createdAt = getMyDate();
        addUser(this.form).then(response => {
          console.log("good,good,good"+response.code)
          this.$emit("flush");
          _this.dialogFormVisible = false
      })
      },
      cancel(){
        this.dialogFormVisible = false
      }
    }
  }

</script>