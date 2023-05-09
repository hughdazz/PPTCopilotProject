<template>
  <el-card :body-style="0" shadow="always" @click="handleClick" class="project-card">
    <img :src="image" class="image">
    <div style="padding: 14px;">
      <div class="bottom clearfix">
        <span>{{ title }}</span>
        <div style="margin: 0;padding: 0;">
          <el-dropdown align="right" trigger="hover" @command="handleCommand">
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right"/>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="rename">重命名</el-dropdown-item>
              <el-dropdown-item command="download">下载</el-dropdown-item>
              <el-dropdown-item command="delete">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: {
    image: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleClick(event) {
      console.log(event)
      // 处理点击事件
      this.$emit('click')
    },
    handleCommand(command) {
      // 处理操作事件
      this.$emit('command', command)
    }
  }
}
</script>
<style scoped>
.project-card {
  width: 350px;
  margin: 10px;
}
.image {
  width: 300px;
  height: 200px;
  object-fit: cover;
}
</style>
