<template>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" center :modal-append-to-body='false' >
      <div class="el-icon-warning warning"> 确定退出？</div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="logout">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
</template>
<script>
import { editRucRole } from '@/api/ruc-role'

export default {
 data() {
    return {
      dialogVisible:false,
    };
  },
  methods: {
    async logout() {
      this.dialogVisible = false;
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
      
    },
  },

}
</script>


<style lang="scss" scoped>
/deep/  .el-dialog__body{
    text-align: center;
  }
</style>

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
    right: 220px;
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
    margin-right: 100px;
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
