<template>
  <div class="GlobalRoleEdit">
    <el-dialog title="全局角色编辑" align="center" :visible.sync="dialogFormVisible" class="dialogTitle" :modal-append-to-body='false'>
      <el-form :model="form" style="width:330px;">
        <el-form-item label="角色名" :label-width="formLabelWidth">
          <el-input v-model="form.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.remark" autocomplete="off"></el-input>
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
.GlobalRoleEdit /deep/ {
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
import { editRucRole } from "@/api/ruc-role";
import { validate_systemRole2 } from '@/utils/validate'
import { getMyDate } from '@/utils/date';

export default {
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        roleId: "",
        applicationSystemId: "",
        roleName: "",
        remark: "",
        createdBy: "",
        createdAt: "",
        modifiedBy: "",
        modifiedAt: "",
        tenantId: "",
        isGlobal: 0
      },
      formLabelWidth: "80px"
    };
  },
  methods: {
    confirm() {
        let ret = validate_systemRole2(this.form)
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
      editRucRole(this.form.roleId, this.form).then(response => {
        this.$message({
            showClose: true,
            message: "修改成功",
            type: "success"
          });
        this.$emit("flush");
        _this.dialogFormVisible = false;
      });
    },
    cancel() {
      this.dialogFormVisible = false;
    }
  }
};
</script>