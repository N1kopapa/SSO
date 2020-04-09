<template>
  <el-dialog class="MySystemDel" title="删除" align="center" :visible.sync="dialogFormVisible" :modal-append-to-body='false' width="30%">
    <div class="el-icon-warning warning"> 确定删除！</div>
    <div slot="footer" class="dialog-footer" align="center">
      <el-button type="primary" @click="del()">确 定</el-button>
      <el-button class="cancel" @click="dialogFormVisible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { delRucRole } from '@/api/ruc-role'
export default {
  data() {
    return {
      gridData: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {},
      formLabelWidth: '120px',
      roleIds: []
    }
  },
  methods: {
    del() {
      delRucRole(this.roleIds).then(response => {
        console.log('删除角色', response)
        this.$emit("flush");
        this.$message({
            showClose: true,
            message: "删除成功",
            type: "success"
          });
        this.dialogFormVisible = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.MySystemDel /deep/ {
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

}
</style>
