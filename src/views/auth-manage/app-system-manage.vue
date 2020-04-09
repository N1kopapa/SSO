<template>
  <div class="tab-container">
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane
        :label="tabMapOptions[0].label"
        :key="tabMapOptions[0].key"
        :name="tabMapOptions[0].key"
      >
        <tab-pane0 v-if="activeName==tabMapOptions[0].key" :type="tabMapOptions[0].key" />
      </el-tab-pane>
      <el-tab-pane
        :label="tabMapOptions[1].label"
        :key="tabMapOptions[1].key"
        :name="tabMapOptions[1].key"
      >
        <tab-pane1 v-if="activeName==tabMapOptions[1].key" :type="tabMapOptions[1].key" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import tabPane0 from './tab-pans/TabPaneMySys'
import tabPane1 from './tab-pans/TabPaneLicensed'

export default {
  name: 'Tab',
  components: { tabPane0,tabPane1 },
  data() {
    return {
      tabMapOptions: [
        { label: '我的系统', key: 'CN' },
        { label: '被授权系统', key: 'US' }
      ],
      activeName: 'CN',
      createdTimes: 0
    }
  },
  watch: {
    activeName(val) {
      this.$router.push(`${this.$route.path}?tab=${val}`)
    }
  },
  created() {
    // init the default selected tab
    const tab = this.$route.query.tab
    if (tab) {
      this.activeName = tab
    }
  },
  methods: {
    showCreatedTimes() {
      this.createdTimes = this.createdTimes + 1
    }
  }
}
</script>

<style scoped lang="scss">
  .tab-container {
    margin: 10px;

    /deep/ .el-tabs--border-card {
      border: 0px solid #dcdfe6;
      box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.12), 0 0 0px 0 rgba(0, 0, 0, 0.04);
      .el-tabs__content {
        border-radius: 5px;
        background-color: #ffffff;
        min-height: calc(100vh - 110px);
        padding: 15px 15px 117px;
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


