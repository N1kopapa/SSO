<template>
  <el-dialog title="选择角色" :visible.sync="dialogFormVisible" append-to-body>
    <el-row>
      <el-col v-for="role in roles" :key="role.label" :span="6">
        <template>
          <el-checkbox v-model="role.checked" :label="role.roleName" />
        </template>
      </el-col>
    </el-row>
    <div />
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="save()">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { fetchRoleList } from '@/api/ruc-role'
export default {
  data() {
    return {
      gridData: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      roles: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      fetchRoleList().then(response => {
        this.roles = response.data.list
      })
    },
    save() {
      const rolelist = []
      for (let i = 0; i < this.roles.length; i++) {
        if (this.roles[i].checked) {
          rolelist.push(this.roles[i])
        }
      }
      this.$emit('querenchongzhi', rolelist)
      console.log(rolelist)
      this.dialogFormVisible = false
    }
  }
}
</script>
