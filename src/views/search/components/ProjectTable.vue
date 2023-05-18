<template>
  <div class="project-table">
    <el-card v-for="project in projects" :key="project.Id" class="project-card" shadow="hover">
      <div slot="header" class="project-card-header" @click="redirectToProject(project.Id)">{{ project.Name }}</div>
      <div class="project-card-body" @click="redirectToProject(project.Id)">
        <p class="project-card-description">描述：{{ project.Description }}</p>
        <p class="project-card-created">{{ project.Created }}</p>
        <p class="project-card-updated">上次更新：{{ project.Updated }}</p>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ProjectTable',
  props: {
    projects: {
      type: Array,
      default: () => [],
    },
  },
  methods:{
    redirectToProject(id) {
      this.$router.push({path: '/project/' + id + '/file'})
    },
  }
}
</script>

<style scoped>
.project-table {
  margin-top: 20px;
}

.project-card {
  width: 700px;
  margin-bottom: 20px;
  border-radius: 10px;
}


.project-card-header {
  font-size: 20px;
  font-weight: bold;
}

.project-card-body {
  margin-top: 10px;
}

.project-card-description {
  font-size: 16px;
}

.project-card-created {
  font-size: 14px;
}

.project-card-updated {
  font-size: 12px;
}
</style>
