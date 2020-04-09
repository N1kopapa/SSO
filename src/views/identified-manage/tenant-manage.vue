<template>
  <div class="tab-container">
    <el-tabs v-model="activeName"  type="border-card">
      <el-tab-pane
        :label="tabMapOptions[0].label"
        :key="tabMapOptions[0].key"
        :name="tabMapOptions[0].key"
        v-if="!isAdmin"
      >
        <tab-pane-tenant-info v-if="activeName==tabMapOptions[0].key" :type="tabMapOptions[0].key" />
      </el-tab-pane>
      <el-tab-pane
        :label="tabMapOptions[1].label"
        :key="tabMapOptions[1].key"
        :name="tabMapOptions[1].key"
        v-if="!isAdmin"
      >
        <tab-pane-keeper-account
          v-if="activeName==tabMapOptions[1].key"
          :type="tabMapOptions[1].key"
        />
      </el-tab-pane>
      <el-tab-pane
        :label="tabMapOptions[2].label"
        :key="tabMapOptions[2].key"
        :name="tabMapOptions[2].key"
        v-if="!isAdmin"
      >
        <tab-pane-global-role v-if="activeName==tabMapOptions[2].key" :type="tabMapOptions[2].key" />
      </el-tab-pane>
      <el-tab-pane
        :label="tabMapOptions[3].label"
        :key="tabMapOptions[3].key"
        :name="tabMapOptions[3].key"
        v-if="!isAdmin"
      >
        <tab-pane-smtp v-if="activeName==tabMapOptions[3].key" :type="tabMapOptions[3].key" />
      </el-tab-pane>
      <el-tab-pane
        :label="tabMapOptions[4].label"
        :key="tabMapOptions[4].key"
        :name="tabMapOptions[4].key"
        v-if="!isAdmin"
      >
        <tab-pane-short-msg v-if="activeName==tabMapOptions[4].key" :type="tabMapOptions[4].key" />
      </el-tab-pane>
      <el-tab-pane
        :label="tabMapOptions[5].label"
        :key="tabMapOptions[5].key"
        :name="tabMapOptions[5].key"
        v-if="!isAdmin"
      >
        <tab-pane-adinfo v-if="activeName==tabMapOptions[5].key" :type="tabMapOptions[5].key" />
      </el-tab-pane>

      <el-tab-pane
        :label="tabMapOptions[6].label"
        :key="tabMapOptions[6].key"
        :name="tabMapOptions[6].key"
        v-if="!isAdmin"
      >
        <tab-pane-login-validate
          v-if="activeName==tabMapOptions[6].key"
          :type="tabMapOptions[6].key"
        />
      </el-tab-pane>

      <el-tab-pane
        :label="tabMapOptions[7].label"
        :key="tabMapOptions[7].key"
        :name="tabMapOptions[7].key"
      >
        <tab-pane-tenant-group
          v-if="activeName==tabMapOptions[7].key"
          :type="tabMapOptions[7].key"
        />
      </el-tab-pane>

      <el-tab-pane
        :label="tabMapOptions[8].label"
        :key="tabMapOptions[8].key"
        :name="tabMapOptions[8].key"
        v-if="isAdmin"
      >
      <tab-pane-tenant-manage
          v-if="activeName==tabMapOptions[8].key"
          :type="tabMapOptions[8].key"
        />
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
import TabPaneTenantInfo from "./tabPans/TabPaneTenantInfo";
import tabPaneKeeperAccount from "./tabPans/TabPaneKeeperAccount";
import tabPaneGlobalRole from "./tabPans/TabPaneGlobalRole";
import tabPaneSmtp from "./tabPans/TabPaneSMTP";
import tabPaneShortMsg from "./tabPans/TabPaneShortMsg";
import tabPaneAdinfo from "./tabPans/TabPaneAdinfo";
import tabPaneLoginValidate from "./tabPans/TabPaneLoginValidate";
import tabPaneTenantGroup from "./tabPans/TabPaneTenantGroup";
import tabPaneTenantManage from "./tabPans/TabPaneTenantManage"
export default {
  name: "Tab",
  components: {
    tabPaneTenantManage,
    TabPaneTenantInfo,
    tabPaneKeeperAccount,
    tabPaneGlobalRole,
    tabPaneSmtp,
    tabPaneShortMsg,
    tabPaneAdinfo,
    tabPaneLoginValidate,
    tabPaneTenantGroup
  },
  data() {
    return {
      isAdmin:false,
      tabMapOptions: [
        { label: "租户信息", key: "first" },
        { label: "管理员账户", key: "second" },
        { label: "全局角色", key: "third" },
        { label: "SMTP", key: "forth" },
        { label: "短信", key: "fifth" },
        { label: "AD信息", key: "sixth" },
        { label: "登录验证", key: "seventh" },
        { label: "租户分组", key: "eight" },
        {label: "租户管理", key: "ninth"}
      ],
      activeName: "first",
      createdTimes: 0
    };
  },
  watch: {
    activeName(val) {
      this.$router.push(`${this.$route.path}?tab=${val}`);
    }
  },
  created() {
    // 超管懒惰，不需要看太多东西。。
    this.isAdmin = (localStorage.getItem("userName") == "admin")
    if (this.isAdmin) 
      this.activeName = "eight"
    else
      this.activeName = "first"
    // init the default selected tab
    const tab = this.$route.query.tab;
    if (tab) {
      this.activeName = tab;
    }
  },
  methods: {
    showCreatedTimes() {
      this.createdTimes = this.createdTimes + 1;
    }
  }
};
</script>

<style scoped lang="scss">
.tab-container {
  padding: 10px;
  background-color: #f3f5fa;

  /deep/ .el-tabs--border-card {
    border: 0px solid #dcdfe6;
    box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.12), 0 0 0px 0 rgba(0, 0, 0, 0.04);
    .el-tabs__content {
      border-radius: 5px;
      background-color: #ffffff;
      min-height: calc(100vh - 110px);
      // padding: 0;
    }
  }
  /deep/ .el-tabs__item.is-active{
    background-color: #fff;
    border-right-color: #fff;
    border-left-color: #fff;
    border-radius: 5px 5px 0 0;
  }
  /deep/ .el-tabs__header {
    background-color: #f3f5fa;
    border: none;
  }
}
</style>
