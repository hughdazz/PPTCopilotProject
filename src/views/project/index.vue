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
            <el-col v-for="item in projectList" :key="item.id" :span="8">
              <ProjectCard :image="item.image" :title="item.title" :id="item.id" @delete="handleDelete(item.id)" @click="handleClick(id)" @command="handleCommand"/>
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
import {getProject} from "@/api/project"

export default {
  components: {ProjectCard},
  data() {
    return {
      projectList: []
    }
  },
  mounted(){
    this.loadData();
  },
  methods: {
    handleClick(id) {
      // 处理点击事件
      console.log('click')
    },
    handleCommand(command,id) {
      // 处理操作事件
      console.log("command",id)
    },
    handleCreate(){
      this.$prompt('请输入新增项目的标题', '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }
      ).then(({ value }) => {
        this.id++
        this.projectList.push({
          image:"http://123.249.70.216:8080/static/project/"+this.id+"/cover.png",
          title:value,
          id:this.projectList.length+1
        })
        this.$message({
          type: 'success',
          message: '项目'+value + '添加成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    handleDelete(id){
      this.projectList=this.projectList.filter(item=>item.id!==id);
    },
    loadData(){
      getProject().then(response=>{
        console.log(response);
        this.projectList=response.data;
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