<template>
  <div class="organize-manage">
    <div class="app-container">
      <el-row>
        <el-col>
          <el-tag color="transparent" class="appSys">{{currTitle!=""?currTitle:"花样年控股集团有限公司"}}</el-tag>
          <el-button type="primary" style="float:right;" @click="synchronization">同步AD信息</el-button>
        </el-col>
      </el-row>
      <el-row style="background-color:#ffffff;margin-top:10px;border-radius:5px;min-height: calc(100vh - 116px);">
        <el-col :span="7" style="border-right: 1px solid #d1ddf0;min-height: calc(100vh - 136px);margin-top: 10px;padding: 10px;">
          <tree class="ruc-tree" :nodes="list" :setting="setting" @onClick="onClick" @onCreated="handleCreated" />
        </el-col>
        <el-col :span="8">
          <template>
            <el-form :model="form" label-width="100px">
              <input v-model="form.organizationalStructureId" type="hidden">
              <input v-model="form.tenantId" type="hidden">
              <input v-model="form.parentId" type="hidden">
              <input v-model="form.sort" type="hidden">
              <input v-model="form.level" type="hidden">
              <input v-model="form.createdBy" type="hidden">
              <input v-model="form.createdAt" type="hidden">
              <input v-model="form.modifiedBy" type="hidden">
              <input v-model="form.modifiedAt" type="hidden">
              <input v-model="form.addressId" type="hidden">
              <el-form-item label="名称" style="margin-top: 20px;">
                <el-input :disabled="!needEdit" v-model="form.departmentName" />
              </el-form-item>
              <el-form-item label="介绍">
                <el-input :disabled="!needEdit" v-model="form.introduction" />
              </el-form-item>
              <el-form-item label="责任人">
                <el-input :disabled="!needEdit" v-model="form.responsiblePerson" />
              </el-form-item>
              <el-form-item label="联系人">
                <el-input :disabled="!needEdit" v-model="form.contactPerson" />
              </el-form-item>
              <el-form-item label="联络电话">
                <el-input :disabled="!needEdit" v-model="form.contactPhone" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input :disabled="!needEdit" v-model="form.remark" type="textarea" />
              </el-form-item>
              <el-form-item align="center">
                <el-button v-if="needEdit" @click="save()">保存</el-button>
              </el-form-item>

            </el-form>
          </template>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import tree from 'vue-giant-tree'
import '@/assets/css/ruc-tree.scss';

import { fetchOrganizationalStructure } from '@/api/organizational-structure'
import { updateOrganizationalStructure } from '@/api/organizational-structure'
import { postIndexInfo } from '@/api/index-info'
export default {
  components: {
    tree
  },

  data() {
    return {
      currTitle:"",
      needEdit:false,
      listQuery: {
        pageIndex: 1,
        pageSize: 5,
        sortBy: 'updateAt',
        isDesending: true,
        condition: 'd'
      },
      list: null,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
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
      form: {
        organizationalStructureId: '',
        tenantId: '',
        parentId: '',
        sort: 0,
        level: 0,
        departmentName: '',
        introduction: '',
        responsiblePerson: '',
        contactPerson: '',
        contactPhone: '',
        addressId: '',
        remark: '',
        createdBy: '',
        createdAt: '',
        modifiedBy: '',
        modifiedAt: ''
      },
      organizeQuery:{
        pageIndex:1,
        pageSize:8000,
      },
      indexQuery:{
        tenantId:""
      },
      applicationSystem: '花样年控股集团有限公司',
      tenantId: ''
    }
  },
  created() {
    this.getList()
  },

  methods: {
    handleNodeClick(data) {
      console.log(data)
    },

    getList() {
      this.loading = true
      this.currTitle = localStorage.getItem("tenantName")
      fetchOrganizationalStructure(this.organizeQuery).then(response => {
        const list = response.data.list
        for (let i = 0; i < list.length; i++) {
          list[i].name = list[i].departmentName
          list[i].open = true
        }
        this.list = list
        this.loading = false
      })
    },
    onClick(evt, treeId, treeNode) {
      for (const item in this.form) {
        this.form[item] = treeNode[item]
      }
      // console.log(evt, treeId, treeNode, this.form)
    },
    save() {
      updateOrganizationalStructure(this.form.organizationalStructureId, this.form).then(response => {
      })
    },
    synchronization() {
      this.indexQuery.tenantId = localStorage.getItem("tenantId");
      postIndexInfo(this.indexQuery).then(response => {
        if (response.status === 0) {
          this.$message({
            showClose: true,
            message: "同步AD信息成功",
            type: "success"
          });
          this.getList()
        } else {
          console.log('同步AD信息失败', response)
        }
      })
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
.organize-manage /deep/ .app-container {
  .button.chk {
    display: none;
  }
  .el-form-item__label {
    color: #7688a3;
    font-weight: normal;
  }
  .el-form-item {
    margin-bottom: 8px;
  }
  .appSys {
    border:none;
    color:#333333;
    font-size:16px;
    font-weight: bold;
    float: left;
    line-height: 38px;
  }
  /deep/ .el-input.is-disabled .el-input__inner,
  /deep/ .el-textarea.is-disabled .el-textarea__inner {
    background-color: transparent;
    // border-color: transparent;
    color: #333333;
    cursor: default;
    resize:none;
  }
  // .ruc-tree {
  //   li a {
  //     width: calc(100% - 22px);
  //   }
  //   .curSelectedNode .node_name {
  //     color: #ffffff;
  //     background-color: #0099ff;
  //     width: 100%;
  //     border-radius: unset;
  //   }
  // }
}
</style>

