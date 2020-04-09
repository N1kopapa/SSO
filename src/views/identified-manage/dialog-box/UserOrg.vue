<template>
  <el-dialog class="UserOrg" title="组织架构" align="center" :visible.sync="dialogFormVisible" append-to-body>
    <div>
      <tree :nodes="orgs" :setting="setting" @onClick="onClick" @onCreated="handleCreated"/>
    </div>
    <div slot="footer" class="dialog-footer" align="center">
      <el-button type="primary" @click="save()">确 定</el-button>
      <el-button class="cancel" @click="dialogFormVisible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import tree from 'vue-giant-tree'

import { fetchOrganizationalStructure } from '@/api/organizational-structure'

export default {
  components: { tree },
  data() {
    return {
      organizeQuery:{
        pageIndex:1,
        pageSize:8000,
      },
      gridData: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      // 输出到外面的哦。
      orgOuts: [],
      setting: {
        check: {
          enable: true
        },
        data: {
          simpleData: {
            enable: true,
            idKey: 'organizationalStructureId',
            pIdKey: 'parentId',
            rootPId: '00000000-0000-0000-0000-000000000000'
          }
        }
      },
      orgs: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      fetchOrganizationalStructure(this.organizeQuery).then(response => {
        const list = response.data.list
        for (let i = 0; i < list.length; i++) {
          list[i].name = list[i].departmentName
          list[i].open = true
        }
        this.orgs = list
      })
    },
    save() {
      this.$emit('orgOuts', this.orgOuts)
      this.dialogFormVisible = false
    },
    onClick(evt, treeId, treeNode) {
      this.orgOuts.push(treeNode)
    },
            handleCreated: function(ztreeObj) {
      this.ztreeObj = ztreeObj;
      ztreeObj.expandNode(ztreeObj.getNodes()[0], false,true)
      // let ztreeNodes = ztreeObj.getNodes()[0].children
      // ztreeNodes.find(treeNode => {
      //   if (treeNode.type == "***") {
      //     ztreeObj.setChkDisabled(treeNode, true)
      //   }
      // })
      // ztreeObj.setChkDisabled(ztreeObj.getNodes()[0], true)
    }
  }
}
</script>

<style lang="scss" scoped>
.UserOrg /deep/ {
  .el-dialog__title {
    font-weight: bold;
  }
  .cancel {
    color: #00a2fd;
    border-color: #00a2fd;
  }
  .button.chk {
    display: none;
  }

}
</style>
