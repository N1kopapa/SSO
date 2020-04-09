<template>
  <div class="login-container">
    <div class="title">统一身份管理后台</div>
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-width="80px"
      hide-required-asterisk="false"
      style="width:430px;margin:160px auto 0;"
    >
      <div class="title-container">
        <!-- <h3 class="title">Login Form</h3> -->
      </div>
      <!-- <span class="loginText">登录账户</span> -->
      <el-form-item prop="username" label="登录名">
        <!-- <span class="svg-container">
          <svg-icon icon-class="user" />
        </span> -->
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="登录名"
          name="username"
          type="text"
          tabindex="1"
        />
      </el-form-item>
      <!-- <span class="loginText">登录密码</span> -->
      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password" label="登录密码">
          <!-- <span class="svg-container">
            <svg-icon icon-class="password" />
          </span> -->
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="登录密码"
            name="password"
            tabindex="2"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <!-- <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span> -->
        </el-form-item>
      </el-tooltip>
      <!-- <el-form-item>
        <el-radio-group v-model="loginForm.authType">
          <el-radio ischeck label="0" border>AD验证</el-radio>
          <el-radio label="1" border>表单验证</el-radio>
        </el-radio-group>
      </el-form-item> -->
      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleLogin"
        >确认</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="Or connect with" :visible.sync="showDialog" :modal-append-to-body='false'>
      Can not be simulated on local, so please combine you own business simulation! ! !
      <br />
      <br />
      <br />
      <social-sign />
    </el-dialog>
    <div class="footer">@版权所有 2020 中睿</div>
  </div>
</template>
<style lang="scss" scoped>
// .loginText {
//   display: inline-block;
// }
.login-container {
  // /deep/.el-form-item {
  //   width: 75%;
  //   margin-left: 40px;
  //   display: inline-block;
  // }
  // /deep/.el-input__inner:-webkit-autofill {
  //   box-shadow: 0 0 0 1000px rgb(255, 255, 255) inset !important;
  // }
  // /deep/ .el-input input:-webkit-autofill {
  //   -webkit-text-fill-color: #000000 !important;
  //   webkit-text-fill-color: #000000 !important;
  // }
  // /deep/.el-input__inner {
  //   color: #000000;
  // }
  /deep/ .el-form-item__label {
    color: #7688a3;
    font-weight: normal;
  }
  /deep/ .el-input__inner {
    border: 1px solid #d1ddf0;
  }
  .title {
    padding: 10px;
    height: 50px;
    font-size: 20px;
    box-shadow: 0px 1px 5px #c5c5c5;
    line-height: 30px;
    font-weight: bold;
  }
  .footer {
    position: absolute;
    bottom: 20px;
    color: #c5c5c5;
    text-align: center;
    width: 100%;
  }
  /deep/ .el-form-item__error {
    padding-top: 10px;
    position: static;
  }
}
</style>

<script>
import { validUsername } from "@/utils/validate";
import SocialSign from "./components/SocialSignin";

export default {
  name: "Login",
  components: { SocialSign },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能少于6位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
        authType: "1"
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === "") {
      this.$refs.username.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({
                path: this.redirect || "/",
                query: this.otherQuery
              });
              console.log("this.redirect is " + this.redirect);
              console.log("this.otherQuery is " + this.otherQuery);
              console.log("this.redirect is " + this.redirect);
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
    select() {
      console.log("into select!");
    }
  }
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
  }
}

/* reset element-ui css */
// .login-container {
//   .el-input {
//     display: inline-block;
//     height: 47px;
//     width: 85%;

//     input {
//       background: transparent;
//       border: 0px;
//       -webkit-appearance: none;
//       border-radius: 0px;
//       padding: 12px 5px 12px 15px;
//       color: $light_gray;
//       height: 47px;
//       caret-color: $cursor;

//       &:-webkit-autofill {
//         box-shadow: 0 0 0px 1000px $bg inset !important;
//         -webkit-text-fill-color: $cursor !important;
//       }
//     }
//   }

//   .el-form-item {
//     border: 1px solid rgba(255, 255, 255, 0.1);
//     background: #ffffff;
//     border-radius: 5px;
//     border: #cecece solid 1px;
//   }
// }
</style>

<style lang="scss" scoped>
$bg: #ffffff;
$dark_gray: #889aa4;
$light_gray: #eee;

// .login-container {
//   min-height: 100%;
//   width: 100%;
//   background-color: $bg;
//   overflow: hidden;

//   .login-form {
//     position: relative;
//     width: 520px;
//     max-width: 100%;
//     padding: 160px 35px 0;
//     margin: 0 auto;
//     overflow: hidden;
//   }

//   .tips {
//     font-size: 14px;
//     color: #fff;
//     margin-bottom: 10px;

//     span {
//       &:first-of-type {
//         margin-right: 16px;
//       }
//     }
//   }

//   .svg-container {
//     padding: 6px 5px 6px 15px;
//     color: $dark_gray;
//     vertical-align: middle;
//     width: 30px;
//     display: inline-block;
//   }

//   .title-container {
//     position: relative;

//     .title {
//       font-size: 26px;
//       color: $light_gray;
//       margin: 0px auto 40px auto;
//       text-align: center;
//       font-weight: bold;
//     }
//   }

//   .show-pwd {
//     position: absolute;
//     right: 10px;
//     top: 7px;
//     font-size: 16px;
//     color: $dark_gray;
//     cursor: pointer;
//     user-select: none;
//   }

//   .thirdparty-button {
//     position: absolute;
//     right: 0;
//     bottom: 6px;
//   }

//   @media only screen and (max-width: 470px) {
//     .thirdparty-button {
//       display: none;
//     }
//   }
// }
</style>
