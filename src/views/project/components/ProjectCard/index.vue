<template>
  <el-card :body-style="0" shadow="always" @click="handleClick"  class="project-card">
    <img :src="image" class="image">
    <div style="padding: 14px;">
      <div>
        <span class="title">{{ title }}</span>
        <span class="update-date">{{ Updated }}</span>
        <div class="command" style="margin: 0;padding: 0;">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">操作</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="rename">重命名</el-dropdown-item>
              <el-dropdown-item command="delete">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </el-card>
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
  width: 350px;
  margin: 10px;
}

.image {
  width: 300px;
  height: 200px;
  object-fit: cover;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
  font-size: 15px;
}

.title {
  font-size: 20px;
  font-weight: bold;
}

.command {
  float: right;
  margin-top: -20px;
}

.update-date {
  font-size: 12px;
  color: #999;
}
</style>
