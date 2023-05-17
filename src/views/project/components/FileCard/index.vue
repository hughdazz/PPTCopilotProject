<template>
  <el-row class="file-row">
    <el-col :span="8">
      <div class="file-name">{{ name }}</div>
    </el-col>
    <el-col :span="8">
      <div class="file-update-time">{{ updateTime }}</div>
    </el-col>
    <el-col :span="8">
      <el-dropdown trigger="click" class="edit" @command="handleCommand">
        <span class="el-dropdown-link">
          ...
        </span>
        <el-dropdown-menu>
          <el-dropdown-item command="delete">删除</el-dropdown-item>
          <el-dropdown-item command="download">下载</el-dropdown-item>
          <el-dropdown-item command="rename">重命名</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    updateTime: {
      type: String,
      required: true
    },
    renameFile: {
      type: Function,
      required: true
    },
    deleteFile: {
      type: Function,
      required: true
    },
    downloadFile: {
      type: Function,
      required: true
    },
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case 'rename': {
          this.renameFile(this.id)
        }
          break;
        case 'delete': {
          console.log('delete')
          this.deleteFile(this.id, this.name)
        }
          break;
      }
    }
  }
}
</script>

<style scoped>
.file-row {
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 10px;
}

.file-name {
  font-weight: bold;
}

.file-update-time {
  text-align: center;
}

.edit{
  display: flex;
  justify-content: flex-end;
}

.el-dropdown-link {
  cursor: pointer;
  color: #333;
}
</style>
