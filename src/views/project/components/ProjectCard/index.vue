<template>
  <div class="project-card">
    <div class="project-image">
      <img :src="image" alt="">
    </div>
    <h3>{{ title }}</h3>
    <p>{{ Updated }}</p>
    <div class="project-actions">
      <el-button type="primary" @click="openFile">打开</el-button>
      <el-dropdown @command="handleCommand">
        <i class="el-icon-more"></i>
        <el-dropdown-menu>
          <el-dropdown-item command="rename">重命名</el-dropdown-item>
          <el-dropdown-item command="delete">删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: {
    image: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    Updated: {
      type: String,
      // 获取当前日期，不需要小时
      default: new Date().toLocaleDateString()
    },
    id: {
      type: Number,
      default: 1
    },
    handleDelete: {
      type: Function,
      required: true
    },
    handleRename: {
      type: Function,
      required: true
    }
  },
  methods: {
    handleClick() {
      // 处理点击事件
      this.$message.error('ok')
    },
    openFile(){
      console.log(1)
      this.$router.push({path: '/project/' + this.id+'/file'})
    },
    handleCommand(command) {
      switch (command) {
        case 'rename': {
          this.handleRename(this.id)
        }
          break;
        case 'delete': {
          this.handleDelete(this.id)
        }
          break;
        // case 'rename': {
        //   this.$prompt('将项目更名为', '提示',
        //     {
        //       confirmButtonText: '确定',
        //       cancelButtonText: '取消'
        //     }
        //   ).then(({value}) => {
        //     this.title = value
        //     this.Updated = new Date().toLocaleString()
        //     this.$message({
        //       type: 'success',
        //       message: '修改成功'
        //     })
        //   }).catch(() => {
        //     this.$message({
        //       type: 'info',
        //       message: '取消输入'
        //     })
        //   })
        // }
        //   break;
        // case 'delete': {
        //   this.$confirm('请确认是否删除', '提示',
        //     {
        //       confirmButtonText: '确定',
        //       cancelButtonText: '取消',
        //       type: "warning"
        //     }
        //   ).then(() => {
        //     this.$emit("delete", this.id);
        //     this.$message({
        //       type: 'success',
        //       message: '删除成功'
        //     })
        //   }).catch(() => {
        //     this.$message({
        //       type: 'info',
        //       message: '取消操作'
        //     })
        //   })
        // }
      }

    }
  }
}
</script>
<style scoped>
.project-card {
  border: 1px solid #ebebeb;
  border-radius: 4px;
  padding: 20px;
  margin: 10px;
}

.project-card:hover {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.project-image {
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.project-image img {
  max-width: 100%;
  max-height: 100%;
}

.project-actions {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

