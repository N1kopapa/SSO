<template>
  <el-dialog class="MySystemEdit" :title="isGlobal ? '全局角色编辑' : '系统角色编辑'" align="center" :visible.sync="dialogFormVisible" :modal-append-to-body='false'>
    <el-form :model="form" style="width:330px;">
      <el-form-item label="角色名称" :label-width="formLabelWidth">
        <el-input v-model="form.roleName" autocomplete="off" />
      </el-form-item>
      <el-form-item v-if="!isGlobal" label="所属系统" :label-width="formLabelWidth">
        <el-select v-model="form.applicationSystemId"  placeholder="请选择所属系统" style="width:100%;">
          <el-option
            v-for="system in systemList"
            :key="system.applicationSystemId"
            :label="system.applicationSystemName"
            :value="system.applicationSystemId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input v-model="form.remark" type="textarea" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" align="center">
      <el-button type="primary" @click="save()">确 定</el-button>
      <el-button class="cancel" @click="dialogFormVisible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { editRucRole } from '@/api/ruc-role'
import { fetchApplicationSystem } from '@/api/application-system'
import { validate_systemRole2 } from '@/utils/validate'

export default {
  data() {
    return {
      gridData: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        roleName: '',
        remark: ''
      },
      formLabelWidth: '80px',
      isGlobal: false,
      listQuery: {
        isMyAPP: true,
        tenantId: ''
      },
      systemList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listQuery.tenantId = localStorage.getItem('tenantId')
      fetchApplicationSystem(this.listQuery).then(response => {
        this.systemList = response.data.list
      })
    },
    save() {
      let ret = validate_systemRole2(this.form)
      if (!ret.isOK){
        this.$message({
          showClose: true,
          message: ret.errInfo,
          type: "error"
        })
        return 
      }
      editRucRole(this.form.roleId, this.form).then(response => {
        this.$emit("flush");
        this.$message({
            showClose: true,
            message: "修改成功",
            type: "success"
          });
          this.$emit("flush");
        this.dialogFormVisible = false
      })
    }
  }
}

</script>

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

}
</style>
