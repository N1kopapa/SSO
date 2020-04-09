<template>
<el-dialog class="TenantAdd" title="租户查看" align="center" :visible.sync="dialogFormVisible" :modal-append-to-body='false'>

  <el-form :model="form" disabled="disabled" style="width:330px;">
    <el-form-item label="租户名称*" :label-width="formLabelWidth">
      <el-input v-model="form.tenantName" disabled="disabled" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="登录账号*" :label-width="formLabelWidth">
      <el-input v-model="form.loginAccount" disabled="disabled" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="租户类型*" :label-width="formLabelWidth">
      <el-select v-model="form.tenantType" disabled="disabled" placeholder="请选择" style="width:100%;">
          <el-option
            v-for="state in tenantTypeList"
            :key="state.dictionaryItemId"
            :label="state.dictionaryItemName"
            :value="state.dictionaryItemId"
          />
      </el-select>
    </el-form-item>
    <el-form-item label="启用日期*" :label-width="formLabelWidth">
        <el-date-picker
          v-model="form.startDate"
          type="date"
          placeholder="选择日期"
          style="width:100%;"
        />
    </el-form-item>
    <el-form-item label="到期日期*" :label-width="formLabelWidth">
        <el-date-picker
          v-model="form.endDate"
          type="date"
          placeholder="选择日期"
          style="width:100%;"
        />
    </el-form-item>
    <el-form-item label="使用状态*" :label-width="formLabelWidth">
        <el-select v-model="form.usageStatus" disabled="disabled" placeholder="请选择使用状态" style="width:100%;">
          <el-option
            v-for="state in tenantStateList"
            :key="state.dictionaryItemId"
            :label="state.dictionaryItemName"
            :value="state.dictionaryItemId"
          />
        </el-select>
    </el-form-item>
    <el-form-item label="当前状态*" v-if="false" :label-width="formLabelWidth">
        <el-select v-model="form.currentStatus" disabled="disabled" placeholder="请选择当前状态" style="width:100%;">
          <el-option
            v-for="state in tenantStateList"
            :key="state.dictionaryItemId"
            :label="state.dictionaryItemName"
            :value="state.dictionaryItemId"
          />
        </el-select>
    </el-form-item>
    <el-form-item label="区域" :label-width="formLabelWidth">
        <el-select v-model="form.area" disabled="disabled" placeholder="请选择" style="width:100%;">
          <el-option
            v-for="state in tenantAreaList"
            :key="state.dictionaryItemId"
            :label="state.dictionaryItemName"
            :value="state.dictionaryItemId"
          />
        </el-select>
    </el-form-item>

    <el-form-item label="联系人" :label-width="formLabelWidth">
      <el-input v-model="form.contactPerson" disabled="disabled" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="联系电话" :label-width="formLabelWidth">
      <el-input v-model="form.contactPhone" disabled="disabled" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="电子邮箱*" :label-width="formLabelWidth">
      <el-input v-model="form.email" type="email" disabled="disabled" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="联系地址" :label-width="formLabelWidth">
      <el-input v-model="form.addressId" disabled="disabled" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="备注说明" :label-width="formLabelWidth">
      <el-input v-model="form.remark" disabled="disabled" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="是否禁用" :label-width="formLabelWidth" align="left">
      <el-switch v-model="form.isDisabled"  disabled="disabled" autocomplete="off"></el-switch>
    </el-form-item>
      <el-form-item label="Logo标志" :label-width="formLabelWidth" align="left">
        <img v-if="form.logo" style="width:28px;height:28px;" :src="form.logo" class="avatar">
      </el-form-item>

    <!-- 还可以添加其他字段进来 -->
  </el-form>
  <div slot="footer" class="dialog-footer" align="center">
    <el-button type="primary" v-if="false" @click="confirm()">确 定</el-button>
    <el-button class="cancel" v-if="false" @click="cancel()">取 消</el-button>
  </div>
</el-dialog>
</template>
<script>
import { addTenant } from  '@/api/tenant'
import { fetchDicItemList } from '@/api/dictionary'

  export default {
    data() {
      return {
        // 主要是注意Guid，注意时间也要写。
        // 地址，区域，状态，类型都是GUID。
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
            isDisabled: true,
            tenantName: "",
            loginAccount: "",
            tenantType: "",
            startDate: "",
            endDate: "",
            area: "",
            legalPerson: "",
            contactPerson: "",
            contactPhone: "",
            addressId: "",
            email: "",
            usageStatus: "",
            currentStatus: "",
            logo: "",
            remark: "",
            createdBy: "",
            createdAt: "2020-01-29T01:28:06.813Z",
            modifiedBy: "",
            modifiedAt: "2020-02-29T01:28:06.813Z"
        },

        tenantTypeQuery:{
          dictionaryId: '34232fbf-7225-11e5-9fcc-005056c00008'
        },
        tenantStateQuery:{
          dictionaryId: '402469a6-7234-11e5-9fcc-005056c00008'
        },
        tenantAreaQuery:{
          dictionaryId: 'e436e06c-721e-11e5-9fcc-005056c00008'
        },
        _parentThis:null,
        tenantTypeList:[],
        tenantStateList:[],
        tenantAreaList:[],
        formLabelWidth: '80px'
      };
    },
    created(){

      fetchDicItemList(this.tenantTypeQuery).then(response => {
        this.tenantTypeList = response.data.list
      })
      fetchDicItemList(this.tenantStateQuery).then(response => {
        this.tenantStateList = response.data.list
      })
      fetchDicItemList(this.tenantAreaQuery).then(response => {
        this.tenantAreaList = response.data.list
      })

    },

    methods:{
      confirm(){
        let _this = this;
        this.form.createdBy = localStorage.getItem("userId")
        this.form.modifiedBy = localStorage.getItem("userId")
        addTenant(this.form).then(response => {
          console.log("good,good,good"+response.code)
          _this.dialogFormVisible = false
          this._parentThis.getList()
      })
      },
      cancel(){
        this.dialogFormVisible = false
      }
    }
  }

</script>

<style lang="scss" scoped>
.TenantAdd /deep/ {
  .el-dialog__title {
    font-weight: bold;
  }
  .el-form-item__label {
    color: #7688a3;
    font-weight: normal;
  }
  .el-form-item {
    margin-bottom: 8px;
  }
  /deep/ .el-input.is-disabled {
    .el-input__inner {
      background-color: transparent;
      border-color: transparent;
      color: #333333;
      cursor: default;
    }
    .el-input__suffix {
      display: none;
    }
  }
  .cancel {
    color: #00a2fd;
    border-color: #00a2fd;
  }
}
</style>
