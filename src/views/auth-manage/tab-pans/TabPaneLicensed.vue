<template>
  <div class="TabPaneLicensed">
    <el-table :data="list" fit highlight-current-row style="width: 100%">
      <el-table-column
        v-loading="loading"
        align="center"
        label="系统微标"
        width="80"
        element-loading-text="请给我点时间！"
      >
        <template slot-scope="scope">
          <el-image :src="scope.row.applicationSystemLogo" style="width: 28px;height: 28px;vertical-align: middle;">
            <div slot="error">
              <img src="../../../assets/temporary/3.jpg" width="28px" height="28px">
            </div>
          </el-image>
        </template>
      </el-table-column>

      <el-table-column width="180px" label="系统名称">
        <template slot-scope="scope">
          <span>{{ scope.row.applicationSystemName}}</span>
        </template>
      </el-table-column>

      <el-table-column width="220px" label="访问地址">
        <template slot-scope="{row}">
          <span>{{ row.accessUrl }}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="是否可用">
        <template slot-scope="scope">
          <span>{{ scope.row.isEnable? '可用' :'不可用' }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" label="系统类型">
        <template slot-scope="scope">
          <span>{{scope.row.applicationSystemTpyeName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="备注说明" width="115">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="操作" min-width="110">
        <template slot-scope="scope">
          <el-button type="text" @click="showEditDialog(scope.row)">编辑</el-button>
          <el-button v-if="scope.row.isEnable" style="color:rgb(252, 80, 80);" type="text" @click="startOrForbidden(scope.row)">点击禁用</el-button>
          <el-button v-else type="text" @click="startOrForbidden(scope.row)">点击启用</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="total"
      :page.sync="listQuery.pageIndex"
      :limit.sync="listQuery.pageSize"
      class="fixed"
      @pagination="getList"
    />

    <el-dialog title="提示" align="center" :visible.sync="dialogVisible" width="30%">
      <div v-if="this.startOrForbiddenShift.isEnable" class="el-icon-warning warning">确定启用？</div>
      <div v-else class="el-icon-warning warning">确定禁用？</div>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button type="primary" @click="startOrForbiddenConfirm()">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <my-system-edit ref="edit" @flush="getList" />
  </div>
</template>

<script>
import { fetchApplicationSystem ,updateApplicationSystem} from "@/api/application-system";
import MySystemEdit from "./dialog-box/MySystemEdit.vue";
import Pagination from "@/components/Pagination";
export default {
  name: "TabPane0",
  components: { MySystemEdit,Pagination },
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
    }
  },
  data() {
    return {
      list: null,
      dialogVisible: false,
      startOrForbiddenShift: {
        isDisabled: false
      },
      total:0,
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        sortBy: 'modifiedAt',
        isDescending: true,
        // applicationSystemName:"",
        // applicationSystemType:"",
        isMyAPP: false,
        tenantId: "",
      },
      loading: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    showDialog() {
      this.$refs.edit.dialogFormVisible = true;
    },
    showEditDialog(row) {
      this.$refs.edit.dialogFormVisible = true;
      // this.$refs.edit.form = Object.assign(row);
      this.$refs.edit.form = JSON.parse(JSON.stringify(row))
      this.$refs.edit.fileList = [];
       this.$refs.edit.newAdd = false;
        this.$refs.edit.shiftApplicationSystemType = {};
        this.$refs.edit.shiftApplicationSystemType.dictionaryItemId =
          row.applicationSystemType;
        this.$refs.edit.shiftApplicationSystemType.dictionaryItemName =
          row.applicationSystemTpyeName;
        this.$refs.edit.applicationSystemId = row.applicationSystemId;
        this.$refs.edit.form.modifiedAt = getMyDate();
    },
    getList() {
      this.loading = true;
      this.listQuery.tenantId = localStorage.getItem("tenantId");
      fetchApplicationSystem(this.listQuery).then(response => {
        this.list = response.data.list;
         this.total = response.data.totalCount;
        this.loading = false;
      });
    },
    startOrForbidden(row){
      this.dialogVisible =true;
      this.startOrForbiddenShift = row;
    },
    startOrForbiddenConfirm() {
      let row = this.startOrForbiddenShift;
      let formOfSys = Object.assign(row);
      formOfSys.isEnable = !formOfSys.isEnable;
      updateApplicationSystem(row.applicationSystemId, formOfSys).then(
        response => {
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success"
          });
          this.dialogVisible =false;
          this.startOrForbiddenShift = {}
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.TabPaneLicensed /deep/ {
  .el-table th {
    background-color: #f3f5fa;
  }
  .el-table th.is-leaf {
    border-bottom: none;
    font-weight: normal;
    color: #7688a3;
  }
  .el-table--medium th, .el-table--medium td {
    padding: 0;
    img {
      vertical-align: middle;
    }
  }
  .el-table--medium th {
    height: 36px;
  }
}
</style>

