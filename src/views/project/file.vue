<template>
  <div class="app-container">
    <el-button class="button_type" @click="create">新增文件</el-button>
    <el-button class="button_type" @click="isForm=!isForm">切换视图模式</el-button>
    <div v-if="isForm">
      <!-- Note that row-key is necessary to get a correct row order. -->
      <el-table ref="dragTable" v-loading="listLoading" :data="list" row-key="id" border fit highlight-current-row style="width: 100%">
        <el-table-column align="center" label="ID" width="65">
          <template slot-scope="{row}">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column width="180px" align="center" label="Date">
          <template slot-scope="{row}">
            <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>

        <el-table-column min-width="300px" label="Title">
          <template slot-scope="{row}">
            <span>{{ row.title }}</span>
            <div style="margin: 0;padding: 0;">
              <el-dropdown align="right" trigger="hover" @command="handleCommand">
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="a">重命名</el-dropdown-item>
                  <el-dropdown-item command="b">下载</el-dropdown-item>
                  <el-dropdown-item command="c">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </template>
        </el-table-column>

        <el-table-column width="110px" align="center" label="Author">
          <template slot-scope="{row}">
            <span>{{ row.author }}</span>
          </template>
        </el-table-column>

        <el-table-column class-name="status-col" label="Status" width="110">
          <template slot-scope="{row}">
            <el-tag :type="row.status | statusFilter">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column align="center" label="Drag" width="80">
          <template slot-scope="{}">
            <svg-icon class="drag-handler" icon-class="drag" />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-else>
      <el-row v-for="(i) in 2" :key="i" :gutter="20" justify="space-between">
        <el-col v-for="(o) in 4" :key="o" :span="6">
          <el-card :body-style="0" shadow="always">
            <img
              src="../../assets/test-image/test.png"
              class="image"
            >
            <div style="padding: 14px;">
              <span>测试图片</span>
              <div class="bottom clearfix">
                <div style="margin: 0;padding: 0;">
                  <el-dropdown align="right" trigger="hover" @command="handleCommand">
                    <span class="el-dropdown-link">
                      操作<i class="el-icon-arrow-down el-icon--right" />
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="a">重命名</el-dropdown-item>
                      <el-dropdown-item command="b">下载</el-dropdown-item>
                      <el-dropdown-item command="c">删除</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getFile } from '@/api/project'
import Sortable from 'sortablejs'

export default {
  name: 'DragTable',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      isForm: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      sortable: null,
      oldList: [],
      newList: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      const { data } = await getFile(this.listQuery)
      this.list = data.items
      this.total = data.total
      this.listLoading = false
      this.oldList = this.list.map(v => v.id)
      this.newList = this.oldList.slice()
      this.$nextTick(() => {
        this.setSort()
      })
    },
    setSort() {
      const el = this.$refs.dragTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        setData: function(dataTransfer) {
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
          dataTransfer.setData('Text', '')
        },
        onEnd: evt => {
          const targetRow = this.list.splice(evt.oldIndex, 1)[0]
          this.list.splice(evt.newIndex, 0, targetRow)

          // for show the changes, you can delete in you code
          const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
          this.newList.splice(evt.newIndex, 0, tempIndex)
        }
      })
    },
    handleCommand(command) {
      switch (command) {
        case 'a':
          // 重命名
          // this.reName();
          break
        case 'b':
          // 下载
          // this.downLoad();
          break
        case 'c':
          // 删除
          // this.deleteName();
          break
        default:
          break
      }
    },
    create() {
      this.$prompt('请输入新增的文件名', '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }
      ).then(({ value }) => {
        this.$message({
          type: 'success',
          message: value + '添加成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    del() {
      this.$prompt('删除文件', '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }
      ).then(({ value }) => {
        this.$message({
          type: 'success',
          message: value + '删除成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    }
  }
}
</script>

  <style>
  .sortable-ghost{
    opacity: .8;
    color: #fff!important;
    background: #42b983!important;
  }
  </style>

  <style scoped>
  .drag-handler{
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}

.el-icon-arrow-down {
    font-size: 12px;
}
.button_type {
    background: rgb(31, 136, 241);
    color: white;
    margin-bottom: 10px;
}
.el-card{
    margin-top: 20px;
    margin-bottom:20px;
}
.image {
    width: 90%;
    display: block;
  }
  .text {
    font-size: 14px;
  }
  </style>
