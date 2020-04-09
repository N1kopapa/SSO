<template>
  <el-dialog class="MySystemPlus" :title="isGlobal ? '全局角色新增' : '系统角色新增'" align="center" :visible.sync="dialogFormVisible" :modal-append-to-body='false'>
    <el-form :model="form" style="width:330px;">
      <el-form-item label="角色名称" :label-width="formLabelWidth">
        <el-input v-model="form.roleName" autocomplete="off" />
      </el-form-item>
      <el-form-item v-if="!isGlobal" label="所属系统" :label-width="formLabelWidth">
        <el-select v-model="form.applicationSystemId" placeholder="请选择所属系统" style="width:100%;">
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
import { fetchApplicationSystem } from "@/api/application-system";
import { addRucRole } from "@/api/ruc-role";
import { validate_systemRole } from "@/utils/validate";
import { getMyDate } from "@/utils/date";
export default {
  data() {
    return {
      gridData: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      xxx: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        roleName: "",
        remark: "",
        applicationSystemId: ""
      },
      form: {
        applicationSystemId: "",
        roleName: "",
        remark: "",
        createdBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        createdAt: "",
        modifiedBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        modifiedAt: "2020-03-05T02:27:19.844Z",
        tenantId: "",
        isGlobal: null,
        statu: true
      },
      formLabelWidth: '80px',
      isGlobal: false,
      listQuery: {
        isMyAPP: true,
        tenantId: ""
      },
      systemList: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listQuery.tenantId = localStorage.getItem("tenantId");
      fetchApplicationSystem(this.listQuery).then(response => {
        this.systemList = response.data.list;
      });
    },
    save() {
      const ret = validate_systemRole(this.form,!this.isGlobal)
      if (!ret.isOK){
        this.$message({
          showClose: true,
          message: ret.errInfo,
          type: "error"
        })
        return
      }
      if (this.isGlobal) {
        delete this.form.applicationSystemId

        this.form.isGlobal = this.isGlobal;
        this.form.tenantId = localStorage.getItem("tenantId");
        this.form.createdAt = getMyDate();
        this.form.modifiedAt = getMyDate();
        console.log(this.form);
        addRucRole(this.form).then(response => {
          this.dialogFormVisible = false;
          this.$emit("flush");
          this.$message({
            showClose: true,
            message: "新增成功",
            type: "success"
          });
          this.form.applicationSystemId = ""
        },
        // eslint-disable-next-line handle-callback-err
        error => {
            this.form.applicationSystemId = ""
        });
      } else {
        if (this.form.applicationSystemId === "") {
          console.log("所属系统为空", this.form.applicationSystemId);
          return false;
        } else {
          this.form.isGlobal = this.isGlobal;
          this.form.tenantId = localStorage.getItem("tenantId");
          this.form.createdAt = getMyDate();
          this.form.modifiedAt = getMyDate();
          console.log(this.form);
          addRucRole(this.form).then(response => {
            this.dialogFormVisible = false;
            this.$emit("flush");
            this.$message({
              showClose: true,
              message: "新增成功",
              type: "success"
            });
          });
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.MySystemPlus /deep/ {
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
