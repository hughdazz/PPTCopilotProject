<template>
  <div class="project-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>项目列表</span>
        <el-button style="float: right; padding: 3px 0" type="primary" @click="isForm = 1">新建项目</el-button>
      </div>
      <div class="project-list">
        <div class="card-view">
          <el-row>
            <el-col v-for="item in projectList" :key="item.id" :span="6">
              <ProjectCard :image="item.image" :title="item.title" @click="handleClick" @command="handleCommand"/>
            </el-col>
          </el-row>
        </div>
        <div class="table-view">

        </div>
      </div>
    </el-card>
  </div>
</template>
<script>

import ProjectCard from "@/views/project/components/ProjectCard/index.vue";

export default {
  components: {ProjectCard},
  data() {
    return {
      projectList: [
        {
          image: "http://123.249.70.216:8080/static/project/0/cover.png",
          title: "测试项目1"
        }
      ]
    }
  },
  methods: {
    handleClick() {
      // 处理点击事件
      console.log('click')
    },
    handleCommand(command) {
      // 处理操作事件
      console.log(command)
    }
  }
}
</script>
