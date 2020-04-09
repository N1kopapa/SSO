<template>
  <el-dialog label="success" align="center" :visible.sync="dialogFormVisible" :modal-append-to-body='false'>
    操作已经成功！
    <el-button @click="confirm()">确认</el-button>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
    }
  },
  methods: {
    confirm() {
      this.dialogFormVisible = false;
    }
  }
}
</script>
