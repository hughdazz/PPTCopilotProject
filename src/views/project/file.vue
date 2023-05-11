<template>
  <div class="project-container">
    <el-card class="box-card">
      <div class="project-container">
        <div class="project-header">
          <h2>项目文件</h2>
          <el-button type="primary" @click="handleCreate">上传文件</el-button>
        </div>
      </div>
    <div v-for="file in files" :key="file.Id" class="file-item">
      <FileRow
        :name="file.Name"
        :description="file.Project.Description"
        :updateTime="file.Updated"
        @delete="deleteFile(file.Id)"
        @download="downloadFile(file.Id)"
        @rename="renameFile(file.Id)"
      />
    </div>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
import FileRow from '@/views/project/components/FileCard/index.vue';
import { getFile } from "@/api/project"
export default {
  components: {
    FileRow
  },
  data() {
    return {
      files: []
    }
  },
  mounted() {
    const id = this.$route.params.id;
    this.getProjectFiles(id)
  },
  methods: {
    getProjectFiles(id) {
      getFile(id).then(response => {
        this.files = response.data
        console.log(this.files)
      })
    },
    deleteFile(id) {
      // 实现删除文件的逻辑
    },
    downloadFile(id) {
      // 实现下载文件的逻辑
    },
    renameFile(id) {
      // 实现重命名文件的逻辑
    }
  }
}
</script>

<style scoped>
.project-container {
  padding: 20px;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.file-item {
  margin-bottom: 10px;
}
</style>
