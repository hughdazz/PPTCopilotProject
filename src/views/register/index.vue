<template>
  <div class="auth-container">
    <el-form ref="registerForm" :model="registerForm" :rules="registerRules" class="auth-form" auto-complete="on"
             label-position="left">
      <div class="wrapper">
        <div class="title-container">
          <img
            src="https://user-images.githubusercontent.com/75596353/236753989-c95dd9d6-029e-4456-aec4-dd65363a9c5d.png"
            alt="PPTCopilot Logo" class="logo">
          <h1 class="title">注册</h1>
        </div>

        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user"/>
          </span>
          <el-input ref="username" v-model="registerForm.username" placeholder="Username"
                    name="username" type="text" tabindex="1" auto-complete="on"/>
        </el-form-item>

        <el-form-item prop="email">
          <span class="svg-container">
            <svg-icon icon-class="email"/>
          </span>
          <el-input ref="email" v-model="registerForm.email" placeholder="Email"
                    name="email" type="text" tabindex="2" auto-complete="on"/>
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password"/>
          </span>
          <el-input :key="passwordType" ref="password" v-model="registerForm.password" :type="passwordType"
                    placeholder="Password" name="password" tabindex="3" auto-complete="on"
                    @keyup.enter.native="handleRegister"/>
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
          </span>
        </el-form-item>

        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
                   @click.native.prevent="handleRegister">注册
        </el-button>

        <div class="auth-footer">
          <span>已经有账号？</span>
          <router-link to="/login">登录</router-link>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { register } from "@/api/user";

export default {
  name: 'Register',

  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error('用户名必须大于等于4个字符'));
      } else {
        callback();
      }
    };

    const validateEmail = (rule, value, callback) => {
      const emailRegEx = /\S+@\S+\.\S+/;
      if (!emailRegEx.test(value)) {
        callback(new Error('请输入正确的邮箱'));
      } else {
        callback();
      }
    };

    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码必须大于等于6个字符'));
      } else {
        callback();
      }
    };

    return {
      registerForm: {
        username: '',
        email: '',
        password: ''
      },
      registerRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        email: [{ required: true, trigger: 'blur', validator: validateEmail }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      formErrors: {} // Store form validation errors
    };
  },

  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = '';
      } else {
        this.passwordType = 'password';
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleRegister() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          register(this.registerForm)
            .then(() => {
              this.$router.push({ path: '/login' });
              this.loading = false;
              this.$message({
                type: 'success',
                message: '注册成功，请登录'
              });
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          this.$message.error('请正确填写表单');
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/auth.scss";

@include authInput();

.el-form-item__error {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}
</style>

<style lang="scss" scoped>
@import "@/assets/css/auth.scss";

@include authBackground();
</style>



