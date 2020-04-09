<template>
  <div class="indexPage">
    <div class="title">{{isAdmin?"花样年控股集团有限公司":currTitle}}</div>
    <div v-if="!isAdmin" class="indexView">
      <div class="card" :style="{backgroundImage:'url('+ imgUrl.imgsrc1+') '}">
        <p class="color">
          <font style="font-size:50px;">{{roleCount}}</font>个
        </p>全局角色
      </div>
      <div class="card" :style="{backgroundImage:'url('+ imgUrl.imgsrc2+') '}">
        <p>
          <font style="font-size:50px;">{{appCount}}</font>个
        </p>系统个数
      </div>
      <div class="card" :style="{backgroundImage:'url('+ imgUrl.imgsrc3+') '}">
        <p>
          <font style="font-size:50px;">{{userCount}}</font>个
        </p>用户数量
      </div>
    </div>

    <div v-if="isAdmin" class="indexView">
      <div class="card" :style="{backgroundImage:'url('+ imgUrl.imgsrc1+') '}">
        
      </div>
      <div class="card" :style="{backgroundImage:'url('+ imgUrl.imgsrc2+') '}">
      </div>
      <div class="card" :style="{backgroundImage:'url('+ imgUrl.imgsrc3+') '}">
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.indexPage {
  .title {
    padding: 20px;
    font-size: 18px;
    font-family: "黑体";
  }
  .indexView {
    display: grid;
    margin-left: 10px;
    grid-template-columns: repeat(3, 33.33%);
    box-sizing: border-box;
    height: 230px;
    width: calc(100% - 20px);
    .card {
      text-align: center;
      padding: 5px;
      width: calc(100% - 16px);
      box-shadow: 0px 1px 5px #c5c5c5;
      background-size: 100% 100%;
      height: 230px;
      background-repeat: no-repeat;
      padding-right: calc(100% - 160px);
      padding-top: 30px;
      text-align: center;
      color: #7688a3;
      margin: 0 auto;
    }
    .card:nth-of-type(1) > p {
      color:#2AC6BE;
    }
    .card:nth-of-type(2) > p {
      color:#FBA826;
    }
    .card:nth-of-type(3) > p {
      color:#00B5FD;
    }
  }
}
</style>

<script>
import { getIndexInfo } from "@/api/index-info";
import { getBasicUserInfo } from "@/api/basic-user-info";

export default {
  name: "index",
  data() {
    return {
      currTitle:"",
      queryList: {
        tenantId: ""
      },
      tenantName: "string",
      isAdmin:false,
      roleCount: 0,
      appCount: 0,
      userCount: 0,
      imgUrl: {
        imgsrc1: require("../../assets/index/1.png"),
        imgsrc2: require("../../assets/index/2.png"),
        imgsrc3: require("../../assets/index/3.png"),
      }
    };
  },
  computed: {},
  created() {
    this.isAdmin = localStorage.getItem("userName") == "admin";
    if (!this.isAdmin)
      this.currTitle = localStorage.getItem("tenantName")

    this.queryList.tenantId = localStorage.getItem("tenantId");
    if (this.queryList.tenantId == null) {
      getBasicUserInfo().then(response => {
        this.queryList.tenantId = response.data.tenantId;
        localStorage.setItem("tenantId", this.queryList.tenantId);
        getIndexInfo(this.queryList).then(response => {
          this.roleCount = response.data.roleCount;
          this.appCount = response.data.appCount;
          this.userCount = response.data.userCount;
        });
      });
    }
    else{
        getIndexInfo(this.queryList).then(response => {
          this.roleCount = response.data.roleCount;
          this.appCount = response.data.appCount;
          this.userCount = response.data.userCount;
        });
    }
  }
};
</script>
