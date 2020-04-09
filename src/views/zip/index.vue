<template>
  <div class="accesslog">
    <div class="app-container">
      <el-row>
        <el-col>
          <el-form :inline="true">
            <el-form-item label="访问时间" class="accesslog_time">
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="listQuery.accessAtStart"
                  class="accesslog_time_date_picker"
                ></el-date-picker>
              </el-col>
              <el-col class="line" :span="2" style="text-align:center">-</el-col>
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="listQuery.accessAtEnd"
                  class="accesslog_time_date_picker"
                ></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="访问模块" class="accesslog_name">
              <el-input v-model="listQuery.whichModule" style=" width: 290px;"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="执行操作" class="accesslog_detail">
              <el-input
                type="text"
                v-model="listQuery.whatOperate"
                maxlength="30"
                style=" width: 290px;"
              ></el-input>
            </el-form-item>
            <el-form-item class="accesslog_select">
              <el-button type="warning" @click="getList()" class="accesslog_select_btn">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col style="padding:15px 15px 112px;background-color:#ffffff;border-radius: 5px;min-height: calc(100vh - 182px);">
          <el-table
            v-loading="listLoading"
            :data="list"
            element-loading-text="拼命加载中"
            fit
            highlight-current-row
            :header-cell-style="{background:'#f3f5fa'}"
          >
            <el-table-column align="center" label="资源路径">
              <template slot-scope="scope">{{ scope.row.requestUri }}</template>
            </el-table-column>
            <!-- <el-table-column align="center" label="访问者">
              <template slot-scope="scope">{{ scope.row.accessLogId }}</template>
            </el-table-column> -->
            <el-table-column label="访问时间" align="center">
              <template slot-scope="scope">{{ scope.row.accessAt }}</template>
            </el-table-column>
            <el-table-column label="访问模块" align="center">
              <template slot-scope="scope">{{ scope.row.whichModule }}</template>
            </el-table-column>
            <el-table-column label="执行操作" align="center">
              <template slot-scope="scope">{{ scope.row.whatOperate }}</template>
            </el-table-column>
          </el-table>
          <pagination
            :total="total"
            :page.sync="listQuery.pageIndex"
            :limit.sync="listQuery.pageSize"
            class="accesslog_pagination fixed"
            @pagination="getList"
          />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped lang="scss">
.accesslog /deep/ .app-container {
  .accesslog_time {
    // width: 50%;
    // float: left;
    margin-top: 10px;
    margin-bottom: 10px;
    .accesslog_time_date_picker {
      width: 100%;
    }
    .el-form-item__content {
      width: 330px;
    }
  }
  .accesslog_pagination {
    margin-top: 0px;
  }
  .accesslog_name {
    // width: 50%;
    // float: left;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .accesslog_detail {
    // width: 40%;
    // float: left;
    margin-top: 4px;
    margin-bottom: 16px;
  }
  .accesslog_select {
    // width: 10%;
    // float: left;
    margin-top: 4px;
    margin-bottom: 16px;
  }
  .accesslog_select_btn {
    float: left;
    // margin-top: 10px;
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
import { fetchAccessList } from "@/api/log-list";
import Pagination from "@/components/Pagination";
export default {
  name: "ExportZip",
  components: { Pagination },
  data() {
    return {
      list: [],
      listLoading: true,
      downloadLoading: false,
      total: 0,
      listQuery: {
        pageIndex: 1, //当前页
        pageSize: 10, //每页条数，默认10
        importance: undefined,
        title: undefined,
        type: undefined,
        sortBy: 'accessAt',
        accessAtStart: "",
        accessAtEnd: "",
        whichModule: "",
        whatOperate: "",
        isDescending:true
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      fetchAccessList(this.listQuery).then(response => {
        this.list = response.data.list;
        this.total = response.data.totalCount;
        // Just to simulate the time of the request
          this.listLoading = false;
      });
    },
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>
