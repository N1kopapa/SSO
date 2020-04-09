<template>
  <el-dialog
    class="MySystemAuth"
    title="应用系统授权"
    align="center"
    :visible.sync="dialogFormVisible"
    :modal-append-to-body="false"
  >
    <el-form :inline="true" align="left">
      <el-form-item label="分组">
        <el-select v-model="groupName" placeholder="请选择" @change="changeGroup">
          <el-option
            v-for="item in list"
            :key="item.groupId"
            :label="item.groupName"
            :value="item.groupId"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button class="select" @click="selectAll()">全选</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col>
        <el-checkbox-group v-model="checkTenantIds">
          <el-checkbox-button
            v-for="item in tenantlist"
            :key="item.tenantId"
            class="checkbox"
            :label="item.tenantId"
          >
            <img class="img" src="../../../../assets/temporary/1.png" />
            <span>{{ item.tenantName }}</span>
            <el-tag class="el-icon-success check-icon" />
          </el-checkbox-button>
        </el-checkbox-group>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer" align="center">
      <el-button type="primary" @click="save()">确 定</el-button>
      <el-button class="cancel" @click="dialogFormVisible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { fetchGroup } from "@/api/group";
import { fetchTenantList } from "@/api/tenant";
import { authorize } from "@/api/applicationsystem_tenant";

export default {
  name: "TabPane0",
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  props: {
    type: {
      type: String,
      default: "CN"
    },
    value: {
      type: [Object, Array],
      default: () => []
    }
  },
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      list: null,
      tenantlist: null,
      listQuery: {
        pageIndex: 1,
        pageSize: 8000,
        modifiedAt: 'updateAt',
        isDescending: true,
        condition: {}
      },
      checkTenantIds: [],
      applicationSystemId: "",
      tenantQuery: {
        pageIndex: 1,
        pageSize: 8000,
        sortBy: 'modifiedAt',
        isDescending: true,
        tenantName: "",
        loginAccount: "",
        tenantType: "00000000-0000-0000-0000-000000000000",
        startDate: "1900-11-1",
        endDate: "2021-11-1",
        legalPerson: "",
        groupId: "",
        
      },
      groupName: "",
      loading: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    selectAll() {
      this.checkTenantIds = [];
      for (let index = 0; index < this.list.length; index++) {
        this.checkTenantIds.push(this.tenantlist[index].tenantId);
      }
    },
    changeGroup(data) {
      console.log(data);
      this.tenantQuery.groupId = data;
      fetchTenantList(this.tenantQuery).then(response => {
        this.tenantlist = response.data.list;
      });
    },

    save() {
      if (this.checkTenantIds.length == 0){
        this.$message({
            showClose: true,
            message: "未选择租户，不能授权",
            type: "success"
        })
        return
      }

      let data = [];
      for (var i = 0; i < this.checkTenantIds.length; i++)
        data.push({
          applicationSystemId: this.applicationSystemId,
          tenantId: this.checkTenantIds[i]
        });
      if (data != null) {
        authorize(data).then(response => {
          this.dialogFormVisible = false;
          this.$message({
            showClose: true,
            message: "授权成功",
            type: "success"
          });
          this.groupName = "";
          this.tenantlist = [];
        });
      } else {
        console("error");
      }
    },

    getList() {
      this.loading = true;
      fetchGroup(this.listQuery).then(response => {
        this.list = response.data.list;
        this.loading = false;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.MySystemAuth /deep/ {
  .el-dialog__title {
    font-weight: bold;
  }
  .el-form-item__label {
    color: #7688a3;
    font-weight: normal;
  }
  .cancel {
    color: #00a2fd;
    border-color: #00a2fd;
  }
  .select {
    background-color: #f5b442;
    color: #ffffff;
    border: none;
    margin-left: 5px;
  }
  .img {
    vertical-align: middle;
    width: 22px;
    height: 22px;
  }
  .checkbox {
    width: 49%;
    float: left;
  }
  .checkbox:nth-of-type(2n + 1) {
    margin-right: 2%;
  }
  .el-checkbox-button__inner {
    width: 100%;
    border: none;
    text-align: left;
    padding: 10px 2px;
  }
  .check-icon {
    display: none;
    float: right;
    font-size: 20px;
    height: 22px;
    border: none;
    padding: 0;
    background-color: transparent;
  }
  .el-checkbox-button.is-checked {
    .el-checkbox-button__inner {
      color: #333333;
      background-color: #ffffff;
      box-shadow: none;
    }
    .check-icon {
      display: block;
    }
  }
}
</style>
