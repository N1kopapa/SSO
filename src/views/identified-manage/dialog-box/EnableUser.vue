<template>
  <el-dialog class="EnableUser" title="启用/禁用" align="center" :visible.sync="dialogFormVisible" :modal-append-to-body='false'>
    <div v-if="!user.isDisabled" class="el-icon-warning warning">该用户已启用，是否禁用！</div>
    <div v-else class="el-icon-warning warning">该用户已禁用，是否启用！</div>
    <div slot="footer" class="dialog-footer" align="center">
      <el-button type="primary" @click="save()">确 定</el-button>
      <el-button class="cancel" @click="dialogFormVisible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { updateUser } from '@/api/user-manage'

export default {
  data() {
    return {
      gridData: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {},
      formLabelWidth: '120px',
      user: {}
    }
  },
  methods: {
    save() {
      console.log('保存')
      if (this.user.isDisabled) {
        this.user.isDisabled = false
      } else {
        this.user.isDisabled = true
      }
      updateUser(this.user.userId, this.user).then(response => {
        this.dialogFormVisible = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.EnableUser /deep/ {
  .el-dialog__title {
    font-weight: bold;
  }
  .cancel {
    color: #00a2fd;
    border-color: #00a2fd;
  }
  .warning::before {
    font-size: 26px;
    color: #ff0000;
    vertical-align: sub;
  }
  .el-dialog__body {
    margin: 30px 0;
  }
}
</style>
