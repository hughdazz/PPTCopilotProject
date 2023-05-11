<template>
  <div class="project-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>项目列表</span>
        <el-button class="button_type" @click="handleCreate">新建项目</el-button>
      </div>
      <div class="project-list">
        <div class="card-view">
          <el-row>
            <el-col v-for="item in projectList" :key="item.Id" :span="6">
              <ProjectCard :image="getImageUrl(item.Id)" :title="item.Name" :id="item.Id"
                           :handle-delete="handleDelete" :handle-rename="handleRename"
                           />
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
import {getProject, createProject, getProjectList, updateProject, deleteProject} from "@/api/project"
import router from "@/router";

export default {
  components: {ProjectCard},
  data() {
    return {
      projectList: [],
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    getImageUrl(id) {
      return "http://localhost:8080/static/project/" + id + "/cover.png"
    },

    handleCommand(id) {
      //进入文件
      console.log('click')
    },
    handleCreate() {
      this.$prompt('请输入新增项目的标题', '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }
      ).then(({value}) => {
        createProject({
          'name': value,
          'description': '暂无简介'
        }).then(response => {
          console.log(response)
          this.loadData();
          this.$message({
            type: 'success',
            message: '项目' + value + '添加成功'
          })
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          deleteProject(id).then(response => {
            console.log(response)
            this.loadData();
            this.$message({
              type: 'success',
              message: '项目删除成功'
            })
          })
        }
      ).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleRename(id) {
      this.$prompt('请输入新的项目标题', '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }
      ).then(({value}) => {
        updateProject(id, {
          'name': value,
        }).then(response => {
          console.log(response)
          this.loadData();
          this.$message({
            type: 'success',
            message: '项目' + value + '修改成功'
          })
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    loadData() {
      getProjectList().then(response => {
        console.log(response);
        this.projectList = response.data;
      })
    }
  }
}
</script>
<style>
.button_type {
  background: rgb(31, 136, 241);
  color: white;
  margin-bottom: 10px;
  float: right;
}
</style>
