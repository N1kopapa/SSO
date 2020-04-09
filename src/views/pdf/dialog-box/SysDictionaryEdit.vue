<template>
  <div class="SysDictionaryEdit">
    <el-dialog :title="title" :visible.sync="dialogTableVisible" :modal-append-to-body="false">
      <el-form :model="form">
        <div class="SysDictionaryEditForm">
          <div class="SysDictionaryEditFormTitle">字典</div>
          <el-form-item label="系统字典">
            <el-input v-model="form.dictionaryName" :disabled="isEdit"></el-input>
          </el-form-item>
          <el-form-item label="备注说明">
            <el-input v-model="form.remark" :disabled="isEdit"></el-input>
          </el-form-item>
          <div class="SysDictionaryEditFormTitle">
            字典项目
            <el-button
              v-show="!isEdit"
              class="SysDictionaryAdd"
              @click="SysDictionaryAdd()"
              type="primary"
            >添加</el-button>
          </div>
        </div>
        <el-table
          :data="formitem"
          element-loading-text="拼命加载中"
          fit
          highlight-current-row
          :header-cell-style="{background:'#f3f5fa'}"
        >
          <el-table-column align="center" label="显示顺序">
            <template slot-scope="{row}">
              <el-input type="number" v-model="row.sortNum" :disabled="isEdit"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="条目名称">
            <template slot-scope="{row}">
              <el-input v-model="row.dictionaryItemName" :disabled="isEdit"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="备注">
            <template slot-scope="{row}">
              <el-input v-model="row.remark" :disabled="isEdit"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="操作">
            <template slot-scope="scope">
              <el-button
                style="color:rgb(252, 80, 80);"
                type="text"
                @click="SysDictionaryItemDel(scope.row)"
                v-show="!isEdit"
              >点击删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          :total="total"
          :page.sync="listQuery.pageIndex"
          :limit.sync="listQuery.pageSize"
          @pagination="getDicItem"
          class="sysdictionary_pagination"
        />
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button type="primary" @click="confirm()" v-show="!isEdit">保 存</el-button>
        <el-button class="cancel" @click="cancel()" v-show="!isEdit">取 消</el-button>
      </div>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" center append-to-body>
        <div class="el-icon-warning warning">确认删除信息？</div>
        <div slot="footer" class="dialog-footer" align="center">
          <el-button type="primary" @click="SysDictionaryItemDelConfirm()">确 定</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </div>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.SysDictionaryEdit {
  /deep/ .el-dialog__header {
    box-shadow: 0px 1px 5px #c5c5c5;
    text-align: center;
  }
  /deep/ .el-dialog__title {
    font-weight: bold;
  }
  /deep/ .el-form-item {
    margin-bottom: 8px;
  }
  /deep/ .cancel {
    color: #00a2fd;
    border-color: #00a2fd;
  }
  /deep/ .el-input__inner {
    text-align: center;
  }
  /deep/ .is-disabled .el-input__inner {
    background-color: #ffff;
    border: #dfe4ed 0px;
    color: black;
  }
  /deep/ .el-input.is-disabled .el-input__inner {
    background-color: transparent;
    border-color: transparent;
    color: #333333;
    cursor: default;
  }
  /deep/ .el-table th {
    background-color: #f3f5fa;
  }
  /deep/ .el-table th.is-leaf {
    border-bottom: none;
    font-weight: normal;
    color: #7688a3;
  }
  .SysDictionaryEditForm {
    .SysDictionaryEditFormTitle {
      font-size: 20px;
      padding: 5px;
      font-family: "黑体";
      .SysDictionaryAdd {
        float: right;
        margin-top: -5px;
      }
    }
    .SysDictionaryEditFormTitle::after {
      display: block;
      width: 100%;
      content: "";
      border-bottom: solid 1px #dfdfdf;
      margin-top: 10px;
    }
    /deep/ .el-input--medium {
      float: right;
    }
    /deep/ .el-form-item__content {
      display: inline-block;
      width: 40%;
    }
    /deep/ .el-form-item__label {
      width: 70px;
      margin-left: 20%;
    }
  }
}
</style>
<script>
import { fetchDicItemList, editDic, postNewDic,dicItemDel } from "@/api/dictionary";
import Pagination from "@/components/Pagination";
import { system_dictionary } from "@/utils/validate";
export default {
  components: { Pagination },
  data() {
    return {
      total: 0,
      listQuery: {
        pageIndex: 1, //当前页
        pageSize: 10, //每页条数，默认10
        dictionaryId: ""
      },
      dialogTableVisible: false,
      dialogVisible: false,
      SysDictionaryItemDelShift: [],
      dialogStat: 0, //0查看 1编辑 2新增
      isEdit: false, //查看  编辑
      title: "编辑",
      form: {
        dictionaryId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        dictionaryName: "",
        remark: ""
      },
      formitem: [],
      dictionaryitem: [
        {
          dictionaryItemId: "",
          dictionaryId: "",
          dictionaryName: "",
          dictionaryItemName: "",
          remark: "",
          sortNum: 0,
          parentId: ""
        }
      ]
    };
  },
  created() {},
  methods: {
    initFormForAddDict(){
      this.form.dictionaryName = "";
      this.form.remark= "";
      this.formitem= [];
      this.dictionaryitem = [
        {
          dictionaryItemId: "",
          dictionaryId: "",
          dictionaryName: "",
          dictionaryItemName: "",
          remark: "",
          sortNum: 0,
          parentId: ""
        }
      ]
    },
    getDicItem(listQuery) {
      let that = this;
      fetchDicItemList(this.listQuery).then(response => {
        this.total = response.data.totalCount;
        this.formitem = response.data.list;
        this.dictionaryitem = this.formitem;
        // Just to simulate the time of the request
        setTimeout(() => {}, 1.5 * 1000);
      });
    },
    //新增item
    SysDictionaryAdd() {
      this.formitem.push({
        dictionaryItemId: "00000000-0000-0000-0000-000000000000",
        dictionaryId: "00000000-0000-0000-0000-000000000000",
        dictionaryName: "",
        dictionaryItemName: "",
        remark: "",
        sortNum: 0,
        parentId: "00000000-0000-0000-0000-000000000000" //此行误删，默认00000000-0000-0000-0000-000000000000
      });
    },
    //保存确认
    confirm() {
      if (this.dialogStat == 2) {
        //新增保存按钮 post
        let postItem = {
          dictionaryId: "00000000-0000-0000-0000-000000000000",
          dictionaryName: "",
          remark: "",
          dictionaryitem: []
        };
        // postItem.dictionaryId = this.form.dictionaryId;
        postItem.dictionaryName = this.form.dictionaryName;
        postItem.remark = this.form.remark;
        postItem.dictionaryitem = this.formitem;
        for (let i = 0; i < this.formitem.length; i++) {
          this.formitem[i].sortNum = Number(this.formitem[i].sortNum);
        }
        // 校验合格合格
        let check = system_dictionary(postItem);
        if (!check.isOK) {
          this.$message({
            showClose: true,
            message: check.errInfo,
            type: "error"
          });
          return;
        } else {
          postNewDic(postItem).then(response => {
            this.$message({
              showClose: true,
              message: "新增成功",
              type: "success"
            });
          });
          this.dialogTableVisible = false;
          this.$emit("flush");
        }
      } else if (this.dialogStat == 1) {
        //编辑保存按钮 put 新itemid保存00000000-0000-0000-0000-000000000000
        let postItem = {
          id: "",
          dictionaryName: "",
          remark: "",
          dictionaryitem: []
        };
        postItem.id = this.form.dictionaryId;
        postItem.dictionaryName = this.form.dictionaryName;
        postItem.remark = this.form.remark;

        for (let i = 0; i < this.formitem.length; i++) {
          this.formitem[i].dictionaryId = this.form.dictionaryId;
          this.formitem[i].sortNum = Number(this.formitem[i].sortNum);
        }
        postItem.dictionaryitem = this.formitem;
        let param = {
          id: postItem.id
        };
        editDic(param, postItem).then(response => {
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success"
          });
        });
        this.dialogTableVisible = false;
        this.$emit("flush");
      } else {
        alert("error");
      }
      
      let _this = this;
    },
    cancel() {
      this.dialogTableVisible = false;
    },
    SysDictionaryItemDel(row) {
      //字典字段删除
      this.dialogVisible = true;
      this.SysDictionaryItemDelShift.push(row.dictionaryItemId);
    },
    SysDictionaryItemDelConfirm() {
      console.log(this.SysDictionaryItemDelShift)
      dicItemDel(this.SysDictionaryItemDelShift).then(response => {
        this.getDicItem();
        this.$message({
          showClose: true,
          message: "删除成功",
          type: "success"
        });
        this.SysDictionaryItemDelShift = [];
        this.dialogVisible = false;
      });
    }
  },
  watch: {
    dialogStat: function() {
      if (this.dialogStat == 0) {
        (this.title = "查看"), (this.formitem = this.dictionaryitem);
      } else if (this.dialogStat == 1) {
        (this.title = "编辑"), (this.formitem = this.dictionaryitem);
      } else {
        this.title = "新增";
        (this.form = {}), (this.formitem = []);
      }
    },
    dialogTableVisible: function() {
      if (this.dialogTableVisible) {
        if (this.dialogStat != 2) {
          this.getDicItem();
        }
      }
    }
  }
};
</script>