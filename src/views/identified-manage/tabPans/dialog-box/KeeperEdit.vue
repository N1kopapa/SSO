<template>
  <div class="KeeperEdit">
    <el-dialog title="管理员账号编辑" align="center" :visible.sync="dialogFormVisible" :modal-append-to-body='false'>

      <el-form :model="form" style="width:330px;">
        <el-form-item label="用户名*" :label-width="formLabelWidth">
          <el-input v-model="form.userName" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
     <el-form-item label="用户头像" :label-width="formLabelWidth" align="left">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handle_success"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.headPortrait" :src="form.headPortrait" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <!-- <el-input v-model="form.headPortrait" autocomplete="off"></el-input> -->
      </el-form-item>
        <el-form-item label="邮箱*" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号*" :label-width="formLabelWidth">
          <el-input v-model="form.mobilePhone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="QQ*" :label-width="formLabelWidth">
          <el-input v-model="form.qq" autocomplete="off"></el-input>
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
.KeeperEdit /deep/ .el-dialog__header {
  box-shadow: 0px 1px 5px #c5c5c5;
}
</style>
<script>
import { updateUser } from  '@/api/user-manage'
import { postFile } from "@/api/file"
import { validate_keeperAccoutEdit } from "@/utils/validate"
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
        formLabelWidth: '80px',
        uploadUrl: this.GLOBALADRESS.uploadUrl,
      };
    },
    methods:{
    // 图片上传成功
    handle_success(response, file, fileList) {
        console.log(fileList)
        this.form.headPortrait =
          process.env.VUE_APP_BASE_API + response.data[0].url;
    },
      // 图片校验

      beforeAvatarUpload(file) {
        const isJPG = file.type === "image/jpeg";
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error("上传头像图片只能是 JPG 格式!");
        }
        if (!isLt2M) {
          this.$message.error("上传头像图片大小不能超过 2MB!");
        }
        return isJPG && isLt2M;
      },
      confirm(){
        let ret = validate_keeperAccoutEdit(this.form)
        if (!ret.isOK){
          this.$message({
            showClose: true,
            message: ret.errInfo,
            type: "error"
          })
          return 
        }

        let _this = this;
        this.form.modifiedAt = getMyDate();
        updateUser(this.form.userId,this.form).then(response => {
          this.$message({
            showClose: true,
            message: "编辑成功",
            type: "success"
          });
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

<style lang="scss" scoped>
.KeeperEdit /deep/ {
  .el-dialog__title {
    font-weight: bold;
  }
  .el-form-item__label {
    color: #7688a3;
    font-weight: normal;
  }
  .el-form-item {
    margin-bottom: 8px;
  }
  .cancel {
    color: #00a2fd;
    border-color: #00a2fd;
  }
  .choice {
    background-color: #f5b442;
    color: #ffffff;
    border: none;
    position:absolute;
    right:-80px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    line-height: 28px;
    vertical-align: middle;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 28px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    vertical-align: top;
  }
  .avatar {
    width: 28px;
    height: 28px;
    display: block;
  }
}
</style>
