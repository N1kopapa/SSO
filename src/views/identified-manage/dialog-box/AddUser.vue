<template>
  <el-dialog class="AddUser" :title="currentTitle" align="center" :visible.sync="dialogFormVisible" :modal-append-to-body='false'>
    <el-form :model="form" style="width:330px;">
      <input v-model="form.registerTime" type="hidden" />
      <input v-model="form.lastLoginTime" type="hidden" />
      <input v-model="form.createdBy" type="hidden" />
      <input v-model="form.createdAt" type="hidden" />
      <input v-model="form.modifiedBy" type="hidden" />
      <input v-model="form.modifiedAt" type="hidden" />
      <el-form-item label="用户名称*" :label-width="formLabelWidth">
        <el-input v-model="form.userName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="用户密码*" :label-width="formLabelWidth">
        <el-input v-model="form.userPwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="用户类型*" v-if="showUserType" :label-width="formLabelWidth">
        <el-select v-model="form.userType" placeholder="用户类型" style="width:100%;">
          <el-option
            v-for="type in typeList"
            :key="type.dictionaryItemId"
            :label="type.dictionaryItemName"
            :value="type.dictionaryItemId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="用户昵称" :label-width="formLabelWidth">
        <el-input v-model="form.nickName" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="用户头像" :label-width="formLabelWidth" align="left">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handle_success"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.headPortrait" :src="form.headPortrait" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <!-- <el-input v-model="form.headPortrait" autocomplete="off"></el-input> -->
      </el-form-item>

      <el-form-item label="用户状态*" :label-width="formLabelWidth">
        <el-select v-model="form.status" placeholder="请选择" style="width:100%;">
          <el-option
            v-for="state in stateList"
            :key="state.dictionaryItemId"
            :label="state.dictionaryItemName"
            :value="state.dictionaryItemId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="真实姓名*" :label-width="formLabelWidth">
        <el-input v-model="form.actualName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth">
        <el-select v-model="form.sex" placeholder="性别" style="width:100%;">
          <el-option label="男" :value="true" />
          <el-option label="女" :value="false" />
        </el-select>
      </el-form-item>

      <!-- <el-form-item label="角色" :label-width="formLabelWidth">
        <user-role ref="userR" @querenchongzhi="fquerenchongzhi" />
        <el-input v-model="userRole" autocomplete="off" />
        <el-button @click="role(userRole)">选择</el-button>
      </el-form-item>-->

      <el-form-item label="组织架构" :label-width="formLabelWidth">
        <user-org ref="userO" @orgOuts="forg" />
        <el-input v-model="userOrgsNames" autocomplete="off" />
        <el-button class="choice" @click="Org()">选择</el-button>
      </el-form-item>
      <el-form-item label="身份证号码*" :label-width="formLabelWidth">
        <el-input v-model="form.idCard" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="出生日期*" :label-width="formLabelWidth">
        <el-date-picker
          v-model="form.birthDay"
          type="date"
          placeholder="选择日期"
          style="width: 100%;"
        />
      </el-form-item>

      <el-form-item label="QQ" :label-width="formLabelWidth">
        <el-input v-model="form.qq" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="微信" :label-width="formLabelWidth">
        <el-input v-model="form.weiXin" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="电子邮箱*" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="固定电话" :label-width="formLabelWidth">
        <el-input v-model="form.fixPhone" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="移动电话" :label-width="formLabelWidth">
        <el-input v-model="form.mobilePhone" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="备注说明" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="是否禁用" :label-width="formLabelWidth" align="left">
        <el-switch v-model="form.isDisabled"></el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" align="center">
      <el-button type="primary" @click="save(form)">确 定</el-button>
      <el-button class="cancel" @click="dialogFormVisible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { addUser } from "@/api/user-manage";
import { fetchDicItemList } from "@/api/dictionary";
// import UserRole from './UserRole.vue'
import UserOrg from "./UserOrg.vue";
import { addUserOrg } from "@/api/user_org";
import { postFile } from "@/api/file";
import { validate_user } from "@/utils/validate";
import { fetchUserList } from "@/api/user-manage";
import { getMyDate } from '@/utils/date';

export default {
  components: {
    // UserRole,
    UserOrg
  },
  data() {
    return {
      currentTitle: "新增用户",
      gridData: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      showUserType: true,
      form: {
        tenantId: "",
        isDisabled: false,
        userName: "",
        userPwd: "",
        nickName: "",
        headPortrait: "",
        userType: "",
        actualName: "",
        sex: true,
        idCard: "",
        birthDay: "",
        qq: "",
        weiXin: "",
        email: "",
        fixPhone: "",
        mobilePhone: "",
        short: 0,
        addressId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        status: "",
        remark: "",
        validate: true,
        registerTime: "2020-03-03T12:11:35.526Z",
        lastLoginTime: "2020-03-03T12:11:35.526Z",
        createdBy: "",
        createdAt: "2020-03-03T12:11:35.526Z",
        modifiedBy: "",
        modifiedAt: "2020-03-03T12:11:35.526Z"
      },
      userRole: "",

      userOrgs: [],
      userOrgsNames: [],
      formLabelWidth: "90px",
      imageUrl: "",
      dataForm: {
        logo: ""
      },
      typeQuery: {
        dictionaryId: "bbe764e9-6e58-11e5-b18d-005056c00008"
      },
      typeList: [],
      stateQuery: {
        dictionaryId: "2aca0fac-6e5b-11e5-b18d-005056c00008"
      },
      stateList: [],
      uploadUrl: this.GLOBALADRESS.uploadUrl
    };
  },
  created() {
    this.form.createdBy = localStorage.getItem("userId");
    this.form.modifiedBy = localStorage.getItem("userId");
    this.getList();
  },
  methods: {
    initFormForAddUser(){
      let form1 = {
        tenantId: "",
        isDisabled: false,
        userName: "",
        userPwd: "",
        nickName: "",
        headPortrait: "",
        userType: "",
        actualName: "",
        sex: true,
        idCard: "",
        birthDay: "",
        qq: "",
        weiXin: "",
        email: "",
        fixPhone: "",
        mobilePhone: "",
        short: 0,
        addressId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        status: "",
        remark: "",
        validate: true,
        registerTime: "2020-03-03T12:11:35.526Z",
        lastLoginTime: "2020-03-03T12:11:35.526Z",
        createdBy: "",
        createdAt: "2020-03-03T12:11:35.526Z",
        modifiedBy: "",
        modifiedAt: "2020-03-03T12:11:35.526Z"
      }
      this.form = form1
      this.form.createdBy = localStorage.getItem("userId");
      this.form.modifiedBy = localStorage.getItem("userId");
    },
    getList() {
      fetchDicItemList(this.typeQuery).then(response => {
        this.typeList = response.data.list;
      });
      fetchDicItemList(this.stateQuery).then(response => {
        this.stateList = response.data.list;
      });
    },
    // 图片上传成功
    handle_success(response, file, fileList) {
      console.log(fileList);
      this.form.headPortrait =
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
    role() {
      this.$refs.userR.dialogFormVisible = true;
    },
    Org() {
      this.$refs.userO.dialogFormVisible = true;
    },
    fquerenchongzhi(res) {
      var str = "";
      for (let i = 0; i < res.length; i++) {
        str += res[i].roleName;
        str += ",";
      }
      this.userRole = str;
    },
    forg(res) {
      this.userOrgs = res;
      for (let i = 0; i < this.userOrgs.length; i++)
        this.userOrgsNames.push(this.userOrgs[i].departmentName);
    },
    save(form) {
      // 用户名不存在，再做其他参数效验
      let ret = validate_user(form);
      if (!ret.isOK) {
        this.$message({
          showClose: true,
          message: ret.errInfo,
          type: "error"
        });
        return;
      }

      // 特殊校验-唯一性校验
      let userQuery = {
        userName: form.userName,
        falg:1
      };
      fetchUserList(userQuery).then(response => {
        if (response.data.totalCount == 0) {
          this.save_pure(form);
        } else {
          this.$message({
            showClose: true,
            message: "该用户名已存在，请重新输入",
            type: "success"
          });
        }
      });
    },
    save_pure(form) {
      this.form.createdAt = getMyDate();
      this.form.modifiedAt = getMyDate();
      addUser(form).then(response => {
        console.log(response);
        if (response.data != null) {
          let userId = response.data;
          let datalink = [];

          if (this.userOrgs && this.userOrgs.length > 0) {

            // 只要一个
            // for (var i = 0; i < this.userOrgs.length; i++)
            //   datalink.push({
            //     userId: userId,
            //     organizationalStructureId: this.userOrgs[i]
            //       .organizationalStructureId
            //   });
            let i = this.userOrgs.length - 1
            datalink.push({
                userId: userId,
                organizationalStructureId: this.userOrgs[i]
                  .organizationalStructureId
              });

            addUserOrg(datalink).then(response => {
              console.log("response!");
            });
          }
        }

        this.$message({
            showClose: true,
            message: "新增成功",
            type: "success"
          });
        this.dialogFormVisible = false;
        this.$emit("flush");
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.AddUser /deep/ {
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
  .choice {
    background-color: #f5b442;
    color: #ffffff;
    border: none;
    position: absolute;
    right: -80px;
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
