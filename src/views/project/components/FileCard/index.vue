<template>
  <el-row class="file-row">
    <el-col :span="8">
      <div class="file-name">{{ name }}</div>
    </el-col>
    <el-col :span="8">
      <div class="file-update-time">{{ updateTime }}</div>
    </el-col>
    <el-col :span="8">
      <el-dropdown trigger="click" class="edit">
        <span class="el-dropdown-link">
          ...
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="onDelete">删除</el-dropdown-item>
          <el-dropdown-item @click.native="onDownload">下载</el-dropdown-item>
          <el-dropdown-item @click.native="onRename">重命名</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
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
    }
  },
  methods: {
    onDelete() {
      // 处理删除逻辑
    },
    onDownload() {
      // 处理下载逻辑
    },
    onRename() {
      // 处理重命名逻辑
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
