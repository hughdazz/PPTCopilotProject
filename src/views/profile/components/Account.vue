<template>
  <el-form>
    <el-form-item>
      <div>昵称</div>
      <el-input v-model.trim="user.name" />
    </el-form-item>
    <el-form-item>
      <div>Email</div>
      <el-row>
        <el-col style="width: 92%;">
          <el-input v-model.trim="user.email" />
        </el-col>
        <el-button type="primary" @click="validateEmail" style="margin-left: 1%; width: 7%;" >验证</el-button>
      </el-row>
    </el-form-item>
    <el-form-item>
      <div>验证码</div>
      <el-input v-model.trim="user.email" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">Update</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: ''
        }
      }
    }
  },
  methods: {
    submit() {
      this.$message({
        message: 'User information has been updated successfully',
        type: 'success',
        duration: 5 * 1000
      })
    }
  }
}
</script>
