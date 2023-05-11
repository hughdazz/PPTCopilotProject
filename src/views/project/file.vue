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
        :id="id"
        :name="file.Name"
        :description="file.Project.Description"
        :updateTime="file.Updated"
        :deleteFile="deleteFile"
        :downloadFile="downloadFile"
        :renameFile="renameFile"
      />
    </div>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
import FileRow from '@/views/project/components/FileCard/index.vue';
import { getFile,uploadFile,deleteFile } from "@/api/project"
export default {
  components: {
    FileRow
  },
  data() {
    return {
      id : this.$route.params.id,
      files: []
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getProjectFiles(this.id)
  },
  methods: {
    getProjectFiles(id) {
      getFile(id).then(response => {
        this.files = response.data
        console.log(this.files)
      })
    },
    deleteFile(id,filename) {
      deleteFile(id,filename).then(response => {
        this.getProjectFiles(this.id)
      })
      // 实现删除文件的逻辑
    },
    downloadFile(id) {
      // 实现下载文件的逻辑

    },
    renameFile(id) {
      // 实现重命名文件的逻辑

    },
    handleCreate(){
      const fileInput = document.createElement('input');
      fileInput.type = 'file';

      fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        // 在这里可以对文件进行处理，例如发送到服务器等
        const formData = new FormData();
        formData.append('uploadname', file, file.name);
        formData.append('savename', file.name);
        console.log("uploaded")
        uploadFile(this.id,formData).then(response => {
          this.getProjectFiles(this.id)
        })
      });
      fileInput.click();
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
