<template>
  <div class="project-list">
    <div class="card-view">
      <el-row>
        <el-col v-for="item in projectList" :key="item.Id" :span="6">
          <ProjectCard :image="getImageUrl(item.Id)" :title="item.Name" :id="item.Id"
                       :handle-delete="handleDelete" :handle-rename="handleRename" :edit="edit"
          />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import ProjectCard from "@/views/project/components/ProjectCard/index.vue";
import {deleteProject, getProjectList, updateProject} from "@/api/project";
import {mapGetters} from "vuex";
export default {
  name: "ProjectList",
  components: { ProjectCard },
  props: {
    projectList: {
      type: Object,
      required: true,
    },
    edit: {
      type: Boolean,
      required: true,
    },


  },

  methods: {
    getImageUrl(id) {
      return "http://123.249.70.216:8080/_static/project/" + id + "/cover.png"
    },

    handleCommand(id) {
      //进入文件
      console.log('click')
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

  }

}

</script>

<style scoped>

</style>
