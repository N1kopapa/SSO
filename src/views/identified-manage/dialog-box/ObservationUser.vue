<template>
  <el-dialog class="ObservationUser" title="用户详情" align="center" :visible.sync="dialogFormVisible" :modal-append-to-body='false'>
    <el-form :model="form" disabled="true" style="width:330px;">
      <el-form-item label="用户名称" :label-width="formLabelWidth">
        <el-input v-model="form.userName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="用户类型" :label-width="formLabelWidth">
        <el-input v-model="form.userTypeName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="用户昵称" :label-width="formLabelWidth">
        <el-input v-model="form.nickName" autocomplete="off" />
      </el-form-item>

      <el-form-item label="用户头像" :label-width="formLabelWidth" align="left">
        <img v-if="form.headPortrait" :src="form.headPortrait" class="avatar">
      </el-form-item>

      <el-form-item label="用户状态" :label-width="formLabelWidth">
        <el-input v-model="form.statusName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="真实姓名" :label-width="formLabelWidth">
        <el-input v-model="form.actualName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth">
        <el-input v-model="form.sex?'男':'女'" autocomplete="off" />
      </el-form-item>

      <el-form-item label="组织架构" :label-width="formLabelWidth">
        <el-input v-model="organize" autocomplete="off" />
      </el-form-item>

      <el-form-item label="身份证号码" :label-width="formLabelWidth">
        <el-input v-model="form.idCard" autocomplete="off" />
      </el-form-item>
      <el-form-item label="出生日期" :label-width="formLabelWidth">
        <el-input v-model="form.birthDay" autocomplete="off" />
      </el-form-item>

      <el-form-item label="QQ" :label-width="formLabelWidth">
        <el-input v-model="form.qq" autocomplete="off" />
      </el-form-item>

      <el-form-item label="微信" :label-width="formLabelWidth">
        <el-input v-model="form.weiXin" autocomplete="off" />
      </el-form-item>

      <el-form-item label="电子邮箱" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="固定电话" :label-width="formLabelWidth">
        <el-input v-model="form.fixPhone" autocomplete="off" />
      </el-form-item>

      <el-form-item label="移动电话" :label-width="formLabelWidth">
        <el-input v-model="form.mobilePhone" autocomplete="off" />
      </el-form-item>

      <el-form-item label="备注说明" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off" />
      </el-form-item>

      <el-form-item label="是否启用" :label-width="formLabelWidth" align="left">
        <el-switch v-model="form.isDisabled" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" align="center">
      <el-button type="primary" @click="dialogFormVisible = false">关 闭</el-button>
    </div>
  </el-dialog>
</template>
<script>


export default {
  data() {
    return {
      gridData: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '90px',
      organize:"",
      form: {}
    }
  },
}

</script>

<style lang="scss" scoped>
.ObservationUser /deep/ {
  .el-dialog__title {
    font-weight: bold;
  }
  .el-form-item {
    margin-bottom: 8px;
  }
  /deep/ .el-input.is-disabled .el-input__inner {
    background-color: transparent;
    border-color: transparent;
    color: #333333;
    cursor: default;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
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
  }
  .avatar {
    width: 28px;
    height: 28px;
    display: block;
  }
}
</style>
