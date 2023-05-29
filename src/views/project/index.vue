<template>
  <div class="project-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-row>
          <span>项目列表</span>
          <el-button class="button_type" @click="handleCreate">新建项目</el-button>
        </el-row>
        <el-row>
          <ProjectList :project-list="this.projectList"  :edit = "this.edit" />
        </el-row>
      </div>
    </el-card>
  </div>
</template>
<script>

import ProjectList from "@/views/project/components/ProjectList/index.vue"
import {createProject, getProjectList} from "@/api/project"
import {mapGetters} from "vuex";

export default {
  components: {ProjectList},
  data() {
    return {
      projectList: [],
      edit: true,
    }
  },
  mounted() {
    this.loadData();
  },
  computed: {
    ...mapGetters([
      'id',
    ])
  },
  methods: {
    getImageUrl(id) {
      return "http://localhost:8080/_static/project/" + id + "/cover.png"
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
    loadData() {
      getProjectList(this.id).then(response => {
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
