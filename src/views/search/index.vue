<!-- Search.vue -->
<template>
  <div class="search-container">
    <el-input
      v-model="filterWords"
      placeholder="请输入搜索关键字"
      clearable
      style="width: 30%; margin: 40px auto 0;"
    >
      <el-button slot="append" icon="el-icon-search" @click="searchProjectsHandler"/>
    </el-input>
    <ProjectTable :projects="projects"/>
  </div>
</template>

<script>
import {searchProjects} from '@/api/search'
import ProjectTable from './components/ProjectTable.vue'

export default {
  name: 'Search',
  components: {
    ProjectTable,
  },
  data() {
    return {
      filterWords: '',
      projects: [],
    }
  },
  methods: {
    searchProjectsHandler() {
      if (!this.filterWords) {
        this.$message.error('请输入搜索关键字')
        return
      }
      try {
        searchProjects(this.filterWords).then((res) => {
          console.log(res)
          this.projects = res.data
        }).catch((err) => {
          console.log(err)
        })
      } catch (error) {
        this.$message.error('搜索失败，请稍后再试')
      }
    },
  },
}
</script>

<style>
.search-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
