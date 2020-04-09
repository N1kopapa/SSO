<template>
<el-dialog class="TenantAdd" title="租户编辑" align="center" :visible.sync="dialogFormVisible">

  <el-form :model="form" style="width:330px;">
    <el-form-item label="租户名称*" :label-width="formLabelWidth">
      <el-input v-model="form.tenantName" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="登录账号*" :label-width="formLabelWidth">
      <el-input v-model="form.loginAccount" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="租户类型*" :label-width="formLabelWidth">
      <el-select v-model="form.tenantType" placeholder="请选择" style="width:100%;">
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
        <el-select v-model="form.usageStatus" placeholder="请选择使用状态" style="width:100%;">
          <el-option
            v-for="state in tenantStateList"
            :key="state.dictionaryItemId"
            :label="state.dictionaryItemName"
            :value="state.dictionaryItemId"
          />
        </el-select>
    </el-form-item>
    <el-form-item label="当前状态*" v-if="false" :label-width="formLabelWidth">
        <el-select v-model="form.currentStatus" placeholder="请选择当前状态" style="width:100%;">
          <el-option
            v-for="state in tenantStateList"
            :key="state.dictionaryItemId"
            :label="state.dictionaryItemName"
            :value="state.dictionaryItemId"
          />
        </el-select>
    </el-form-item>
    <el-form-item label="区域" :label-width="formLabelWidth">
        <el-select v-model="form.area" placeholder="请选择" style="width:100%;">
          <el-option
            v-for="state in tenantAreaList"
            :key="state.dictionaryItemId"
            :label="state.dictionaryItemName"
            :value="state.dictionaryItemId"
          />
        </el-select>
    </el-form-item>

    <el-form-item label="联系人" :label-width="formLabelWidth">
      <el-input v-model="form.contactPerson" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="联系电话" :label-width="formLabelWidth">
      <el-input v-model="form.contactPhone" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="电子邮箱*" :label-width="formLabelWidth">
      <el-input v-model="form.email" type="email" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="联系地址" :label-width="formLabelWidth">
      <el-input v-model="form.addressId" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="备注说明" :label-width="formLabelWidth">
      <el-input v-model="form.remark" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="是否禁用" :label-width="formLabelWidth" align="left">
      <el-switch v-model="form.isDisabled"  autocomplete="off"></el-switch>
    </el-form-item>

    <el-form-item label="Logo标志" :label-width="formLabelWidth" align="left">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handle_success"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.logo" :src="form.logo" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-button class="choice">上传</el-button>
      </el-form-item>

    <!-- 还可以添加其他字段进来 -->
  </el-form>
  <div slot="footer" class="dialog-footer" align="center">
    <el-button type="primary" @click="confirm()">确 定</el-button>
    <el-button class="cancel" @click="cancel()">取 消</el-button>
  </div>
</el-dialog>
</template>
<script>
import { updateTenant } from  '@/api/tenant'
import { fetchDicItemList } from '@/api/dictionary'
import { postFile } from "@/api/file"
import { validate_tenantInfoAll } from "@/utils/validate";

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
        formLabelWidth: '80px',

        uploadUrl: this.GLOBALADRESS.uploadUrl,
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
        // 参数效验
        let ret = validate_tenantInfoAll(this.form);
        if (!ret.isOK) {
          this.$message({
            showClose: true,
            message: ret.errInfo,
            type: "error"
          });
          return;
        }

        updateTenant(this.form.tenantId,this.form).then(response => {
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success"
          });
          this.$emit("flush")
          _this.dialogFormVisible = false
      })

      },
      cancel(){
        this.dialogFormVisible = false
      },

          // 图片上传成功
      handle_success(response, file, fileList) {
        console.log(fileList)
        this.form.logo =
          process.env.VUE_APP_BASE_API + response.data[0].url;
      },
      // 图片校验
      beforeAvatarUpload(file) {
        const isJPG = file.type === "image/jpeg";
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error("上传头像图片只能是 JPG 格式!");
        }
        if (!isLt2M) {
          this.$message.error("上传头像图片大小不能超过 2MB!");
        }
        return isJPG && isLt2M;
      },
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
  .cancel {
    color: #00a2fd;
    border-color: #00a2fd;
  }
  .choice {
    background-color: #f5b442;
    color: #ffffff;
    border: none;
    position:absolute;
    right:0;
    top:0;
  }

    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    line-height: 28px;
    vertical-align: middle;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 28px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    vertical-align: top;
  }
  .avatar {
    width: 28px;
    height: 28px;
    display: block;
  }


}
</style>
