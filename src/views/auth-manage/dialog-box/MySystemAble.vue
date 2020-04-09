<template>
  <el-dialog class="MySystemAble" :title="form.isGlobal ? '全局角色启用/禁用' : '系统角色启用/禁用'" align="center" :visible.sync="dialogFormVisible" :modal-append-to-body='false'>
    <div v-if="form.statu" class="el-icon-warning"> 该角色已启用，是否禁用！</div>
    <div v-else class="el-icon-warning warning"> 该角色已禁用，是否启用！</div>
    <div slot="footer" class="dialog-footer" align="center">
      <el-button type="primary" @click="save()">确 定</el-button>
      <el-button class="cancel" @click="dialogFormVisible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { editRucRole } from '@/api/ruc-role'

export default {
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {}
      // statu: true,
      // isGlobal: true
    }
  },
  methods: {
    save() {
      if (this.form.statu) {
        this.form.statu = false
      } else {
        this.form.statu = true
      }
      editRucRole(this.form.roleId, this.form).then(response => {
        this.dialogFormVisible = false;
        this.$message({
            showClose: true,
            message: "更改成功",
            type: "success"
          });
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.MySystemAble /deep/ {
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
