<template>
  <div class="search-container">
    <el-input
      v-model="filterWords"
      placeholder="请输入搜索关键字"
      clearable
      style="width: 30%; margin: 40px auto 0;"
    >
      <el-button slot="append" icon="el-icon-search" @click="searchProjectsHandler" />
    </el-input>
    <el-card v-for="(project, index) in projects" :key="index" class="project-card">
      <div class="project-name">{{ project.name }}</div>
      <div class="project-description">{{ project.description }}</div>
    </el-card>
  </div>
</template>

<script>
import { searchProjects } from '@/api/search'

export default {
  name: 'Search',
  data() {
    return {
      filterWords: '',
      projects: []
    }
  },
  methods: {
    searchProjectsHandler() {
      if (!this.filterWords) {
        this.$message.error('请输入搜索关键字')
        return
      }
      try {
        const response = searchProjects(this.filterWords)
        this.projects = response.projects
      } catch (error) {
        this.$message.error('搜索失败，请稍后再试')
      }
    }
  }
}
</script>

<style>
.search-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.project-card {
  width: 400px;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
}

.project-name {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.project-description {
  font-size: 16px;
}
</style>
