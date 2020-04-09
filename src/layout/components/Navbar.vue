<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <div class="title">
      <img :src="imgUrl.logo" alt />统一认证管理
    </div>
    <!-- <breadcrumb id="breadcrumb-container" class="breadcrumb-container" /> -->
    <div class="person">{{isAdmin?"花样年后台管理员":currTitle}}</div>
    <div class="logout" @click="startOrForbidden()">
      <img :src="imgUrl.logout" alt />退出登录
    </div>
    
    <!-- <div class="right-menu">
      <template v-if="device!=='mobile'">
        <search id="header-search" class="right-menu-item" />

        <error-log class="errLog-container right-menu-item hover-effect" />

        <screenfull id="screenfull" class="right-menu-item hover-effect" />

        <el-tooltip content="Global Size" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>
        
      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <img src="https://i2.hdslb.com/bfs/face/c43e6cab13c9a0303cf8476cfd405cff61195726.jpg" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/profile/index">
            <el-dropdown-item>Profile</el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item>Dashboard</el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>-->
    <dialog-out ref="dialog"/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import ErrorLog from "@/components/ErrorLog";
import Screenfull from "@/components/Screenfull";
import SizeSelect from "@/components/SizeSelect";
import Search from "@/components/HeaderSearch";
import DialogOut from "./DialogOut"

export default {
  components: {
    DialogOut,
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    Search
  },
  data() {
    return {
      currTitle:"",
      isAdmin:false,
      dialogVisible:false,
      imgUrl: {
        logo: require("../../assets/index/logo.png"),
        logout: require("../../assets/index/logout.png")
      }
    };
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "device"])
  },
  created() {
    this.isAdmin = localStorage.getItem("userName") == "admin";
    if (!this.isAdmin)
      this.currTitle = localStorage.getItem("tenantName")
  },

  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      this.dialogVisible = false;
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
      
    },
    startOrForbidden(){
      this.$refs.dialog.dialogVisible = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  z-index: 1002;
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .title {
    display: inline-block;
    float: left;
    font-size: 20px;
    padding-top: 15px;
    padding-left: 25px;
    font-family: "黑体";
    text-align: right;
    width: 200px;
    position: relative;
    img {
      position: absolute;
      left: 0;
      top: 5px;
    }
  }
  .person {
    display: inline-block;
    right: 140px;
    top: 15px;
    font-family: "黑体";
    font-size: 18px;
    position: absolute;
    color: #727272;
  }
  .logout {
    display: inline-block;
    margin-top: 16px;
    font-family: "黑体";
    font-size: 16px;
    float: right;
    margin-right: 20px;
    color: #afafaf;
    img {
      margin-right: 10px;
    }
  }
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
    margin-left: 60px;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
