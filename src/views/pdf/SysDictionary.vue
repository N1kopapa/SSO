<template>
  <div class="SysDictionary">
    <div class="app-container">
      <el-row>
        <el-col>
          <el-form :inline="true" ref="form" :model="form">
            <el-form-item label="字典名称" class="SysDictionaryName">
              <el-input v-model="listQuery.dictionaryName" style=" width: 290px;"></el-input>
            </el-form-item>
            <el-form-item class="accesslog_select">
              <el-button
                type="warning"
                @click="SysDictionaryCheck()"
                class="sysdictionary_select_btn"
              >查询</el-button>
              <el-button type="primary" @click="SysDictionaryAdd()" class="sysdictionary_select_btn">新增</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col style="padding:15px 15px 112px;background-color:#ffffff;border-radius: 5px;min-height: calc(100vh - 126px);">
          <el-table
            v-loading="listLoading"
            :data="list"
            element-loading-text="拼命加载中"
            fit
            highlight-current-row
          >
            <el-table-column align="center" label="名称">
              <template slot-scope="scope">{{ scope.row.dictionaryName }}</template>
            </el-table-column>
            <el-table-column align="center" label="描述">
              <template slot-scope="scope">{{ scope.row.remark }}</template>
            </el-table-column>
            <el-table-column label="操作" align="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="SysDictionarySelect(scope.row)">查看</el-button>
                <el-button type="text" @click="SysDictionaryEdit(scope.row)">编辑</el-button>
                <!-- <el-button v-if="scope.row.isEnable" style="color:rgb(252, 80, 80);" type="text" @click="startOrForbidden()">点击禁用</el-button>
              <el-button v-else type="text" @click="startOrForbidden()">点击启用</el-button> -->
              </template>
            </el-table-column>
          </el-table>
          <pagination
            :total="total"
            :page.sync="listQuery.pageIndex"
            :limit.sync="listQuery.pageSize"
            class="sysdictionary_pagination fixed"
            @pagination="getList"
          />
        </el-col>
      </el-row>
    </div>
    <sys-dictionary-edit ref="edit" @flush="getList"/>
  </div>
</template>

<style scoped lang="scss">
.SysDictionary /deep/ .app-container {
  .SysDictionaryName {
    // width: 50%;
    // float: left;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .accesslog_select {
    // width: 50%;
    // float: left;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .sysdictionary_pagination {
    margin-top: 0px;
  }
  .sysdictionary_select_btn {
    float: left;
    margin-top: 0px;
  }
  .el-form-item__label {
    font-weight: normal;
    color: #7688a3;
  }
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
    div {
      min-height: 36px;
      line-height: 36px;
    }
  }
  .el-table--medium th {
    height: 36px;
  }
}
</style>

<script>
import { fetchDicList } from "@/api/dictionary";
import Pagination from "@/components/Pagination";
import SysDictionaryEdit from "./dialog-box/SysDictionaryEdit.vue";
export default {
  components: { Pagination, SysDictionaryEdit },
  data() {
    return {
      list: [
        {
          dictionaryId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          dictionaryName: "string",
          remark: "string"
        }
      ],
      listLoading: true,
      downloadLoading: false,
      form: {},
      total: 0,
      listQuery: {
        pageIndex: 1, //当前页
        pageSize: 10, //每页条数，默认10
        importance: undefined,
        title: undefined,
        type: undefined,
        dictionaryName: ""
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      fetchDicList(this.listQuery).then(response => {
        this.list = response.data.list;
        this.total = response.data.totalCount;
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false;
        }, .5 * 1000);
      });
    },
    onSubmit() {
      console.log("submit!");
    },
    SysDictionarySelect(row) {
      this.$refs.edit.dialogTableVisible = true;
      this.$refs.edit.isEdit = true;
      this.$refs.edit.dialogStat = 0;

      // this.$refs.edit.form = Object.assign(row);

      this.$refs.edit.form = JSON.parse(JSON.stringify(row))
      this.$refs.edit.listQuery.dictionaryId = row.dictionaryId;
    },
    SysDictionaryEdit(row) {
      this.$refs.edit.dialogTableVisible = true;
      this.$refs.edit.isEdit = false;
      this.$refs.edit.dialogStat = 1;

      // this.$refs.edit.form = Object.assign(row);
      this.$refs.edit.form = JSON.parse(JSON.stringify(row))
      this.$refs.edit.listQuery.dictionaryId = row.dictionaryId;
    },
    SysDictionaryAdd() {
      this.$refs.edit.dialogTableVisible = true;
      this.$refs.edit.initFormForAddDict()
      
      this.$refs.edit.isEdit = false;
      this.$refs.edit.dialogStat = 2;
    },
    // 字典检索 name
    SysDictionaryCheck() {
      fetchDicList(this.listQuery).then(response => {
        this.list = response.data.list;
        this.total = response.data.totalCount;
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false;
        }, .5 * 1000);
      });
    }
  }
};
</script>
