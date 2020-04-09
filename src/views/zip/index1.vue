<template>
  <div class="exceptionlog">
    <div class="app-container">
      <el-row>
        <el-col>
          <el-form :inline="true" ref="form" :model="form">
            <el-form-item label="发生时间" class="exceptionlog_time">
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="listQuery.happenAtStart"
                  class="exceptionlog_time_date_picker"
                ></el-date-picker>
              </el-col>
              <el-col class="line" :span="2" style="text-align:center">-</el-col>
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="listQuery.happenAtEnd"
                  class="exceptionlog_time_date_picker"
                ></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="异常名称" class="exceptionlog_name">
              <el-input v-model="listQuery.name" style=" width: 290px;"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="异常描述" class="exceptionlog_detail">
              <el-input
                type="text"
                v-model="listQuery.description"
                maxlength="30"
                style=" width: 290px;"
              ></el-input>
            </el-form-item>
            <el-form-item class="exceptionlog_select">
              <el-button type="warning" @click="getList()" class="exceptionlog_select_btn">查询</el-button>
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
          >
            <el-table-column align="center" label="资源路径">
              <template slot-scope="scope">{{ scope.row.requestUri }}</template>
            </el-table-column>
            <el-table-column align="center" label="发生时间">
              <template slot-scope="scope">{{ scope.row.happenAt }}</template>
            </el-table-column>
            <el-table-column label="异常名称" align="center">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column label="异常描述" align="center">
              <template slot-scope="scope">{{ scope.row.description }}</template>
            </el-table-column>
          </el-table>
          <pagination
            class="exceptionlog_pagination fixed"
            :total="total"
            :page.sync="listQuery.pageIndex"
            :limit.sync="listQuery.pageSize"
            @pagination="getList"
          />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped lang="scss">
.exceptionlog /deep/ .app-container {
  .exceptionlog_time {
    // width: 50%;
    // float: left;
    margin-top: 10px;
    margin-bottom: 10px;
    .exceptionlog_time_date_picker {
      width: 100%;
    }
    .el-form-item__content {
      width: 330px;
    }
  }
  .exceptionlog_pagination {
    margin-top: 0px;
  }
  .exceptionlog_name {
    // width: 50%;
    // float: left;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .exceptionlog_detail {
    // width: 40%;
    // float: left;
    margin-top: 4px;
    margin-bottom: 16px;
  }
  .exceptionlog_select {
    // width: 10%;
    // float: left;
    margin-top: 4px;
    margin-bottom: 16px;
  }
  .exceptionlog_select_btn {
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
import { fetchExceptionList } from "@/api/log-list";
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
      form:{},
      listQuery: {
        pageIndex: 1, //当前页
        pageSize: 10, //每页条数，默认10
        importance: undefined,
        title: undefined,
        type: undefined,
        sortBy: 'happenAt',
        happenAtStart: "",
        happenAtEnd: "",
        name: "",
        description: "",
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
      fetchExceptionList(this.listQuery).then(response => {
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
