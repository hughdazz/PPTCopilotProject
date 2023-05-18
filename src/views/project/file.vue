<template>
  <div class="project-container">
    <el-col :span="18">
      <el-card class="box-card">
        <div class="project-container">
          <div class="project-header">
            <h2>项目文件</h2>
            <div v-if="this.name === this.username">
              <el-button type="primary" @click="dialogFormVisible = true" style = "margin-right: 10px">新建PPT文件</el-button>
              <el-dialog title="Shipping address" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                  <el-form-item label="Promotion name" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">Cancel</el-button>
                  <el-button type="primary" @click="goto_direction">Confirm</el-button>
                </span>
              </el-dialog>
              <el-button type="primary" @click="handleCreate">上传文件</el-button>
            </div>
            <div v-else>
              <el-button type="primary" @click="cloneProject">克隆项目</el-button>
            </div>
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
    </el-col>
    <el-col :span="6">
      <el-card>
        <div class="project-container">
          <el-row>
            <el-col :span="18">
              <h2>{{ this.projectName }}</h2>

            </el-col>
            <el-col :span="6">
              <div v-if="this.liked">
                <h4>
                  <el-button type="primary" @click="unlikeProject">取消收藏</el-button>
                </h4>
              </div>
              <div v-else>
                <h4>
                  <el-button type="primary" @click="likeProject">收藏</el-button>
                </h4>
              </div>
            </el-col>
            <el-col span="24">
              <h3>
                已被收藏{{ this.star }}次</h3>
            </el-col>
          </el-row>
        </div>

        <div class="project-container">
          <el-row>
            <h3>项目信息</h3>
            <h4>作者：</h4>
            <h4>
              <el-row>
                <el-col :span="8">
                  <img
                    src="https://user-images.githubusercontent.com/91320586/236814430-708d8c48-f9a0-49e2-94f6-b25f33a03af8.png">
                </el-col>
                <el-col :span="16">
                  <h2>{{ this.username }}</h2>
                </el-col>
              </el-row>
            </h4>
            <el-row>
              <el-col :span="24">
                <h4>修改时间：{{ this.ProUpdated }}</h4>
              </el-col>
            </el-row>
            <h4>描述：{{ this.description }}</h4>
          </el-row>
        </div>
      </el-card>
    </el-col>
  </div>

</template>

<script>
import FileRow from '@/views/project/components/FileCard/index.vue';
import {
  getFile,
  uploadFile,
  deleteFile,
  getProject,
  likeProject,
  cloneProject,
  unlikeProject,
  checkLikePorject
} from "@/api/project"
import {mapGetters} from 'vuex'

export default {
  components: {
    FileRow
  },
  data() {
    return {
      id: this.$route.params.id,
      files: [],
      projectName: "我的项目",
      star: "0",
      ProUpdated: "2020-01-01",
      username: "",
      description: "",
      mine: false,
      liked: false,
      dialogFormVisible: false,
      form : {
        name: '',
      },
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getProjectFiles(this.id);
    this.getProjectInfo();
    this.checklikepro();
  },
  computed: {
    ...mapGetters([
      'name',
    ])
  },
  methods: {
    goto_direction() {
      this.dialogFormVisible = false
      this.$router.push({
        path: '/direction/index',
        query: {
          project_id: this.project_id,
          file_name: this.form.name,
        }
      });
    },
    getProjectInfo() {
      getProject(this.id).then(response => {
        this.projectName = response.data.Name
        this.star = response.data.Star
        this.ProUpdated = response.data.Updated
        this.username = response.data.Creator.Username
        this.description = response.data.Description
      })
    },
    getProjectFiles(id) {
      getFile(id).then(response => {
        this.files = response.data
      })
    },
    deleteFile(id, filename) {
      deleteFile(id, filename).then(response => {
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
    handleCreate() {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';

      fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        // 在这里可以对文件进行处理，例如发送到服务器等
        const formData = new FormData();
        formData.append('uploadname', file, file.name);
        formData.append('savename', file.name);
        uploadFile(this.id, formData).then(response => {
          this.getProjectFiles(this.id)
        })
      });
      fileInput.click();
    },
    likeProject() {
      // 实现收藏项目的逻辑
      likeProject(this.id).then(response => {
        this.$message({
          type: 'success',
          message: '收藏项目成功'
        })
        this.checklikepro()
        this.getProjectInfo()
      })
        .catch(error => {
          this.$message({
            type: 'error',
            message: '收藏项目失败'
          })
        })
    },
    cloneProject() {
      // 实现克隆项目的逻辑
      cloneProject(this.id).then(response => {
        this.$message({
          type: 'success',
          message: '克隆项目成功'
        })
      })
        .catch(error => {
          this.$message({
            type: 'error',
            message: '克隆项目失败'
          })
        })
    },
    unlikeProject() {
      // 实现取消收藏项目的逻辑
      unlikeProject(this.id).then(response => {
        this.$message({
          type: 'success',
          message: '取消收藏项目成功'
        })
        this.checklikepro()
        this.getProjectInfo()
      })
        .catch(error => {
          this.$message({
            type: 'error',
            message: '取消收藏项目失败'
          })
        })
    },
    checklikepro() {
      checkLikePorject(this.id).then(response => {
        this.liked = response.data
      })
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

.el-card {
  margin: 10px;
}
</style>
