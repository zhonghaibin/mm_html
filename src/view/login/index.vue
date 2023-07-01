<template>
  <div class="main-warp">
    <div class="loginTop">
      <div class="loginTop-wrap">
        <a class="Logo" href="">
          <img height="40" src="../../assets/logo.png" width="145" />
        </a>
        <span style="float: right">
          <div class="chrome">
            为了更好的用户体验，Windows系统推荐使用Google浏览器
            <a href="http://down.inf.kim/google_windows.html" target="_blank">
              点击下载
            </a>
          </div>
        </span>
      </div>
    </div>
    <div class="main-content">
      <div class="formDiv">
        <h2 class="text-center">登录</h2>
        <div class="data-form">
          <div class="input-warp gap">
            <Icon class="input-icon iconfont" type="ios-contact-outline" />
            <input
              v-model="formData.account"
              class="inputs"
              maxlength="64"
              name="username"
              placeholder="手机号码或邮箱"
              type="text"
            />
          </div>
          <div class="error-content">
            <span v-show="errMag.account.isShow" class="errMsg">
              {{ errMag.account.msg }}
            </span>
          </div>

          <div class="input-warp gap">
            <Icon class="input-icon iconfont" type="ios-lock-outline" />
            <input
              v-model="formData.password"
              class="inputs"
              maxlength="20"
              name="password"
              placeholder="密码"
              type="password"
            />
          </div>
          <div class="error-content">
            <span v-show="errMag.password.isShow" class="errMsg">
              {{ errMag.password.msg }}
            </span>
          </div>

          <div class="btn-warp gap">
            <div class="text-center">
              <Button style="width: 100%" type="primary" @click="login">
                登录
              </Button>
            </div>
          </div>
          <div class="gap">
            <div class="pull-right" style="margin-top: 6px">
              <a class="link" href="javascript:;">忘记密码</a>
              <span class="split-space">|</span>
              <a class="link" href="javascript:;">新用户注册</a>
            </div>

            <div class="pretty-box">
              <Checkbox v-model="formData.remember">
                <span>记住我</span>
              </Checkbox>
            </div>
          </div>

          <div class="biggap third-party-title">
            <h5 class="text-center"><span>第三方账号登录</span></h5>
          </div>
          <div class="third-auth">
            <a class="dt" href="javascript:;" title="用钉钉登录"></a>
            <a class="wx" href="javascript:;" title="用微信账户登录"></a>
            <a class="qq" href="javascript:;" title="用QQ账户登录"></a>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <a href="http://www.yiyuemami.com" style="color: #999" target="_blank">
        蜜蜜妈妈 - 旗舰版
      </a>
      @ 商家咨询请致电:xxxxxxxxx
    </div>
  </div>
</template>
<script>
  // import { login } from '@/api/user'

  export default {
    name: 'Index',
    components: {},
    data: function () {
      return {
        formData: {
          account: 'test',
          password: '123',
          remember: 0,
        },
        errMag: {
          account: {
            msg: '',
            isShow: false,
          },
          password: {
            msg: '',
            isShow: false,
          },
        },
      }
    },
    computed: {},
    mounted() {},
    methods: {
      verify() {
        this.errMag.account.isShow = false
        this.errMag.password.isShow = false
        if (!this.formData.account) {
          this.errMag.account.isShow = true
          this.errMag.account.msg = '请输入手机号码或者邮箱'
          return false
        }
        if (!this.formData.password) {
          this.errMag.password.isShow = true
          this.errMag.password.msg = '请输入密码'
          return false
        }
        return true
      },
      async login() {
        if (!this.verify()) {
          return false
        }
        this.$store
          .dispatch('user/login', this.formData)
          .then(() => {
            this.$router.push({
              name: 'home',
            })
          })
          .catch((err) => {
            console.log(err)
          })
      },
    },
  }
</script>
<style lang="less" scoped>
  .text-center {
    text-align: center;
  }

  .pull-right {
    float: right !important;
  }

  .formDiv h2 {
    padding: 10px 0 20px;
    font-size: 20px;
    color: #545454;
  }

  .errMsg {
    color: rgba(253, 66, 56, 0.8);
  }

  .third-auth {
    text-align: center;
    position: relative;
    padding: 10px 0;
  }

  .third-auth a {
    color: #666;
    margin: 15px 20px 0 30px;
    width: 40px;
    height: 40px;
    box-sizing: border-box;
    display: inline-block;
    border-radius: 4px;
    zoom: 1;
    background: #fff url('@/assets/authn.png') no-repeat center center;
  }

  .third-auth a.qq {
    background-position: 0 0;
  }

  .third-auth a.wx {
    background-position: center;
  }

  .third-auth a.dt {
    background-position: right;
  }

  .title {
    padding: 10px 0 20px;
    font-size: 20px;
    color: #545454;
  }

  html,
  body {
    height: 100%;
    padding: 0;
    background: #fff;
  }

  .chrome {
    font-size: 14px;
    margin-top: 24px;
    padding: 5px 10px;
    color: #666;
    border-radius: 10px;
  }

  .loginTop {
    width: 100%;
    background-color: #ffffff;
    height: 80px;
    opacity: 0.85;
  }

  .loginTop-wrap {
    height: 100%;
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
  }

  .loginTop-wrap a.Logo {
    display: inline-block;
    margin-top: 18px;
    margin-left: 20px;
  }

  .main-warp {
    position: absolute;
    left: 0;
    right: 0;
    overflow: auto;
    background: #fff url('@/assets/loginback.png') no-repeat;
    background-size: cover;
    height: 100%;
  }

  .navbar {
    min-height: 60px;
  }

  .navbar-inverse {
    background-color: #fff;
    border-color: #fff;
    color: #676767;
  }

  @media (min-width: 994px) {
    .ourlogo {
      height: 32px;
      margin-top: 10px;
      margin-bottom: 5px;
    }
  }

  @media (min-width: 1025px) {
    .main-content {
      width: 500px;
      margin-top: 100px;
      padding: 20px 50px;
      border-radius: 4px;
    }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    .main-warp {
      background-image: none;
    }

    .main-content {
      width: 500px;
      margin-top: 100px;
      padding: 20px 50px;
      border-radius: 4px;
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    }

    body {
      background-image: none;
    }
  }

  @media (max-width: 768px) {
    .main-warp {
      background-image: none;
    }

    .main-content {
      width: 100%;
      margin-top: 0;
      padding: 20px 20px;
    }
  }

  .main-content {
    margin-left: auto;
    margin-right: auto;
    background: #fff;
    margin-bottom: 50px;
  }

  .input-warp {
    border: 1px solid #e9e9e9;
    border-radius: 2px;
    padding: 7px 0;
  }

  .input-warp.focus {
    border-color: #649efd;
  }

  .error-content {
    text-indent: 18px;
  }

  input::-ms-clear {
    display: none;
  }

  input::-ms-reveal {
    display: none;
  }

  .input-icon {
    padding: 0 18px;
    color: #999;
  }
  .iconfont {
    font-size: 20px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .inputs {
    border: 0;
    width: 70%;
    color: #545454;
    background: transparent;
  }

  .inputs:focus {
    outline: 0;
  }

  .lgbtn {
    line-height: 26px;
  }

  .gap {
    margin-top: 20px;
  }

  .biggap {
    margin-top: 40px;
  }

  .gap .split-space {
    color: #649efd;
    margin: 0 10px;
  }

  a.link {
    color: #649efd;
  }

  a.link:hover {
    color: #649efd;
    text-decoration: underline;
  }

  .third-party-title {
    border-bottom: 1px solid #dedede;
  }

  .third-party-title h5 {
    margin-bottom: -5px;
  }

  .third-party-title span {
    background-color: white;
    padding: 0 10px 0 10px;
    color: #545454;
  }

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: #000;
    opacity: 0.85;
    height: 40px;
    line-height: 40px;
    width: 100%;
    color: #999;
    font-size: 12px;
    text-align: center;
  }
</style>
