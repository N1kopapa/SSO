<template>
  <el-dialog class="TenantsOfGroup" title="租户列表" :visible.sync="dialogFormVisible" align="center" :modal-append-to-body='false'>
    <el-row>
      <el-col v-for="item in list" :key="item.tenantId" :span="12" align="left" style="padding-left:13px;line-height:36px;">
        <img class="img" src="../../../../assets/temporary/1.png">
        <span>{{ item.tenantName }}</span>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer" align="center">
      <el-button type="primary" @click="dialogFormVisible = false">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { updateUser } from  '@/api/user-manage'
  export default {
    data() {
      return {
        dialogTableVisible: false,
        dialogFormVisible: false,
        newUserPwd:"",
        list:null,
        formLabelWidth: '120px'
      };
    },
    methods:{
      confirm(){
      this.dialogFormVisible = false
      },
      cancel(){
        this.dialogFormVisible = false
      }
    }
  }

</script>

<style lang="scss" scoped>
.TenantsOfGroup /deep/ {
  .el-dialog__title {
    font-weight: bold;
  }
  .img {
    vertical-align: middle;
    width: 22px;
    height: 22px;
  }
}
</style>
