<template>
  <el-dialog
    class="MySystemEdit"
    :title="newAdd?'应用系统新增':'应用系统编辑'"
    align="center"
    :visible.sync="dialogFormVisible"
  >
    <el-form :model="form" style="width:330px;">
      <el-form-item label="系统名称*" :label-width="formLabelWidth">
        <el-input v-model="form.applicationSystemName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="系统Logo" :label-width="formLabelWidth" align="left">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handle_success"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.applicationSystemLogo" :src="form.applicationSystemLogo" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <!-- <el-input v-model="form.applicationSystemLogo" autocomplete="off"></el-input> -->
      </el-form-item>
      <el-form-item label="访问路径" :label-width="formLabelWidth">
        <el-input v-model="form.accessUrl" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="是否可用" :label-width="formLabelWidth" align="left">
        <el-switch v-model="form.isEnable"></el-switch>
      </el-form-item>
      <el-form-item label="系统类型*" :label-width="formLabelWidth">
        <!-- <el-input v-model="form.applicationSystemTpyeName" autocomplete="off"></el-input> -->

        <!-- todo -->
        <el-select
          v-model="shiftApplicationSystemType"
          value-key="dictionaryItemId"
          placeholder="请选择"
          style="width:100%;"
        >
          <el-option
            v-for="item in dicItemList"
            :key="item.dictionaryItemId"
            :label="item.dictionaryItemName"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注说明" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" align="center">
      <el-button type="primary" @click="confirm()">保 存</el-button>
      <el-button class="cancel" @click="cancel()">取 消</el-button>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.MySystemEdit /deep/ {
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
    border-color: #409eff;
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

<script>
import {
  updateApplicationSystem,
  addApplicationSystem
} from "@/api/application-system";
import { postFile } from "@/api/file";
import { fetchDicItemList } from "@/api/dictionary";
import { getMyDate } from "@/utils/date";
import { validate_applicationSystem } from "@/utils/validate"
export default {
  data() {
    return {
      dialogFormVisible: false,
      newAdd: false, //新增窗口
      dictionaryId: "71affa31-5ba1-4378-1354-08d7c257162e", //勿删
      dicItemList: [], //系统类型
      shiftApplicationSystemType: {
        dictionaryItemId:"",
        dictionaryItemName:""
      },
      form: {
        applicationSystemName: "",
        applicationSystemLogo: null,
        accessUrl: "",
        isEnable: true,
        applicationSystemType: "",
        remark: "",
        createdBy: "",
        createdAt: "",
        modifiedBy: "",
        modifiedAt: "",
        tenantId: ""
      },
      uploadUrl: this.GLOBALADRESS.uploadUrl,
      // uploadUrl:'http://192.168.2.167:5000/api/File',
      formLabelWidth: "80px"
    };
  },
  methods: {
    confirm() {      
      // let ret = (this.form.applicationSystemName && this.form.applicationSystemName.length>0 && this.form.applicationSystemName.length<50)
      // if (!ret){
      //   this.$message({
      //     showClose: true,
      //     message: "应用系统名称不符合规范",
      //     type: "success"
      //   })
      //   return
      // }

      let _this = this;
      // 系统类型
      this.form.applicationSystemType = this.shiftApplicationSystemType.dictionaryItemId;
      this.form.applicationSystemTpyeName = this.shiftApplicationSystemType.dictionaryItemName;
      
      let ret = validate_applicationSystem(this.form)
      if (!ret.isOK){
        this.$message({
          showClose:true,
          message:ret.errInfo,
          type: "error"
        })
        return 
      }

      this.form.modifiedAt = getMyDate();
      // 新增
      if (this.newAdd == true) {
        this.form.tenantId = localStorage.getItem("tenantId");
        let userId = localStorage.getItem("userId");
        this.form.createdBy = userId;
        this.form.modifiedBy = userId;
        this.form.createdAt = getMyDate();
        addApplicationSystem(this.form).then(response => {
          _this.dialogFormVisible = false;
          _this.newAdd = false;
          _this.$emit("flush");
          this.$message({
            showClose: true,
            message: "添加成功",
            type: "success"
          });
        });
      } else {
        // 编辑
        updateApplicationSystem(this.form.applicationSystemId, this.form).then(
          response => {
            _this.dialogFormVisible = false;
            this.$message({
              showClose: true,
              message: "修改成功",
              type: "success"
            });
            delete this.form.applicationSystemId
            this.$emit("flush")
          },
          err=>{
            delete this.form.applicationSystemId
          }
        );
      }
    },
    // 图片上传成功
    handle_success(response, file, fileList) {
      console.log(fileList);
      this.form.applicationSystemLogo =
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
    cancel() {
      this.dialogFormVisible = false;
      this.newAdd = false;
    }
  },
  watch: {
    dialogFormVisible: function(val, old) {
      if (!this.dialogFormVisible) {
        // 关闭弹出框清空form
      } else {
        // 检索系统类型
        let query = { dictionaryId: this.dictionaryId };
        fetchDicItemList(query).then(response => {
          this.dicItemList = response.data.list;
        });
      }
    }
  }
};
</script>