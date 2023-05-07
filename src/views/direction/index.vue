<template>
  <el-tabs v-model="tab_index" @tab-click="handleClick">
    <el-tab-pane label="选择模板" name="tab0">
      <el-row v-for="(row, index) in ppt_template_rows_ls" :key="index">
        <el-col v-for="(item, i) in row" :key="i" :span="8">
          <!-- 这里可以根据需要渲染每个元素的内容 -->
          {{ item }}
        </el-col>
      </el-row>
      <div class="demo-input-suffix">
        <span class="demo-input-label">PPT Topic：</span>
        <el-input
          v-model="ppt_topic"
          placeholder="Please Input Topic"
          suffix-icon="el-icon-date"
        />
      </div>
      <div class="demo-input-suffix">
        <span class="demo-input-label">Presenter’s Name：</span>
        <el-input
          v-model="presenter_name"
          placeholder="Please Input Presenter’s Name"
          suffix-icon="el-icon-date"
        />
      </div>
      <el-button type="primary" @click="next_step">下一步</el-button>
    </el-tab-pane>
    <el-tab-pane label="大纲编辑" name="tab1">
      <el-card style="width: 800px;margin: 10px 10px;">
        <div class="custom-tree-container">
          <div class="block" style="">
            <p style="text-align: center">PPT title</p>
            <el-tree
              :data="data"
              node-key="id"
              default-expand-all
              draggable
              :allow-drop="allowDrop"
              :allow-drag="allowDrag"
              :expand-on-click-node="false"
            >
              <span slot-scope="{ node, data }" class="custom-tree-node">

                <span style="align-items: start">
                  <template v-if="data.edit">
                    <el-input v-model="data.label" class="edit-input" size="mini" />
                    <el-button
                      class="cancel-btn"
                      size="mini"
                      icon="el-icon-refresh"
                      type="warning"
                      @click="cancelEdit(data)"
                    >
                      cancel
                    </el-button>
                  </template>
                  <span v-else>
                    <span v-if="data.label === 'Slides'"> <el-tag type="success">{{ data.label }}</el-tag></span>
                    <span v-else-if="data.label === 'Slide'"> <el-tag type="warning">{{ data.label }}</el-tag></span>
                    <span v-else> <el-tag type="info">{{ data.label }}</el-tag></span>
                  </span>
                </span>

                <span style="align-items: end">
                  <el-button
                    v-if="data.edit&&!data.is_slide&&!data.is_slides&&node.level===3"
                    type="success"
                    size="mini"
                    icon="el-icon-circle-check-outline"
                    @click="confirmEdit(data)"
                  >
                    Ok
                  </el-button>
                  <el-button
                    v-else-if="!data.is_slide&&!data.is_slides&&node.level===3"
                    type="primary"
                    size="mini"
                    icon="el-icon-edit"
                    @click="f(data)"
                  >
                    Edit
                  </el-button>

                  <el-button
                    v-if="node.level===2||node.level===1"
                    type="warning"
                    size="mini"
                    @click="() => append(node)"
                  >
                    Append
                  </el-button>
                  <el-button
                    v-if="node.level!==1"
                    type="danger"
                    size="mini"
                    @click="() => remove(node, data)"
                  >
                    Delete
                  </el-button>
                </span>
              </span>
            </el-tree>
          </div>
        </div>
      </el-card>
      <el-button type="primary" @click="last_step">上一步</el-button>
      <el-button type="primary" @click="next_step">下一步</el-button>
    </el-tab-pane>
    <el-tab-pane label="Role" name="tab2">Role</el-tab-pane>
    <el-tab-pane label="Task" name="tab3">Task</el-tab-pane>
  </el-tabs>
</template>
<script>

let id = 1000
let tab_id = 0

export default {
  data() {
    const render_data = [{
      id: 1,
      label: 'Level one 1',
      children: [{
        id: 4,
        label: 'Level two 1-1',
        children: [{
          id: 9,
          label: 'Level three 1-1-1'
        }, {
          id: 10,
          label: 'Level three 1-1-2'
        }]
      }]
    }, {
      id: 2,
      label: 'Level one 2',
      children: [{
        id: 5,
        label: 'Level two 2-1'
      }, {
        id: 6,
        label: 'Level two 2-2'
      }]
    }, {
      id: 3,
      label: 'Level one 3',
      children: [{
        id: 7,
        label: 'Level two 3-1'
      }, {
        id: 8,
        label: 'Level two 3-2'
      }]
    }]
    const source_xml_data = `
      <slides>
  <slide id="test-slide-1">
    <p id="idn7Mx">论语</p>
    <p id="7stmVP">有朋自远方来，不亦乐乎。</p>
  </slide>
  <slide id="test-slide-1">
    <p id="idn7Mx">礼记</p>
    <p id="7stmVP">小唐，我喜欢你</p>
  </slide>
  <slide id="test-slide-1">
    <p id="idn7Mx">求之不得</p>
    <p id="7stmVP">寤寐思服</p>
  </slide>
</slides>
`
    return {
      activeName: 'first',
      outline_ls: null,
      render_data,
      data: JSON.parse(JSON.stringify(render_data)),
      source_xml_data,
      ppt_template_ls: [],
      ppt_template_rows_ls: [],
      presenter_name: '',
      ppt_topic: ' ',
      tab_index: 'tab' + tab_id
    }
  },
  mounted() {
    // this.dfs(this.data)
    // console.log(JSON.stringify(this.data, ' ', 2))
  },
  created() {
    this.dfs(this.data)
    // this.$set(this, this.data, this.data)
    console.log(JSON.stringify(this.data, ' ', 2))

    this.render_data = this.update_source_xml_data_to_render_data(this.source_xml_data)
    this.dfs(this.render_data)
    console.log(JSON.stringify(this.render_data, ' ', 2))

    this.data = this.render_data

    for (let i = 0; i < 13; i++) {
      this.ppt_template_ls.push({
        'name': i,
        'love': '小唐'
      })
    }

    this.ppt_template_rows_ls = this.get_row(this.ppt_template_ls, 3)

    console.log(JSON.stringify(this.ppt_template_rows_ls, ' ', 2))
  },
  methods: {
    last_step() {
      this.tab_index = 'tab' + (--tab_id) % 4
    },
    next_step() {
      this.tab_index = 'tab' + (++tab_id) % 4
    },
    get_row(data, num_col) {
      const rows = []
      let temp = []
      for (let i = 0; i < data.length; i++) {
        temp.push(data[i])
        if ((i + 1) % num_col === 0 || i === data.length - 1) {
          rows.push(temp)
          temp = []
        }
      }
      return rows
    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.label === 'Level two 3-1') {
        return type !== 'inner'
      } else {
        return true
      }
    },
    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf('Level three 3-1-1') === -1
    },
    dfs(node) {
      if (!Array.isArray(node)) {
        this.$set(node, 'edit', false)
        this.$set(node, 'original_label', node.label)
        let is_slides = false
        let is_slide = false
        if (node.label === 'Slides') { is_slides = true }
        if (node.label === 'Slide') { is_slide = true }
        this.$set(node, 'is_slides', is_slides)
        this.$set(node, 'is_slide', is_slide)
        // node.edit = false
        // node.original_label = node.label
        if ('children' in node) {
          this.dfs(node.children)
        } else { return }
      } else {
        for (var i = 0; i < node.length; i++) {
          this.dfs(node[i])
        }
      }
    },
    f(data) {
      console.log(data)
      data.edit = !data.edit
      // this.$set(data, 'edit', !data.edit)
    },
    append(node) {
      console.log(node)
      let name = ''
      if (node.level === 1) {
        name = 'Slide'
      } else {
        name = 'New Item'
      }
      const newChild = { id: id++, label: name, 'edit': false, 'original_label': 'new item', children: [] }
      if (!node.data.children) {
        this.$set(node.data, 'children', [])
      }
      node.data.children.push(newChild)
    },
    remove(node, data) {
      // console.log((node))
      // console.log(data)
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      // console.log(children)
      // console.log(parent)
      if (children.length === 1 && parent.level === 0) {
        this.$message({
          message: '不能删除根节点！！！',
          type: 'failure'
        })
        return
      }
      children.splice(index, 1)
    },
    cancelEdit(data) {
      data.label = data.original_label
      data.edit = false
      this.$message({
        message: 'The content has been restored to the original value',
        type: 'warning'
      })
    },
    confirmEdit(data) {
      data.edit = false
      data.original_label = data.label
      this.$message({
        message: 'The content has been edited',
        type: 'success'
      })
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    changeText(element, text) {
      // 功能：替换一个元素中的文本
      // 前提：保证一个元素中只有一个文本
      // 实现：dfs遍历

      // 遍历所有子节点
      for (let i = 0; i < element.childNodes.length; i++) {
        const childNode = element.childNodes[i]
        // 如果是文本节点（nodeType为3）
        if (childNode.nodeType === 3) {
          // 使用回调函数处理文本内容
          // console.log('before', childNode.nodeValue)
          childNode.nodeValue = text
          // console.log('after', childNode.nodeValue)
        } else {
          // 如果是元素节点，递归处理子节点
          this.changeText(childNode, text)
        }
      }
    },
    update_source_xml_data_to_render_data(xml) {
      // 功能：将xml转换为前端能渲染的json
      // 参数：gpt返回的xml大纲
      // 说明：
      // 返回值：前端能渲染的json

      const parser = new DOMParser()

      const top_dom = parser.parseFromString(xml, 'application/xml')

      if (top_dom.documentElement.nodeName === 'parsererror') {
        // console.error('XML 解析失败 when update_xml_to_dom_to_slide')
      } else {
        // console.log('XML 解析成功\n', xml)

        const render_data = []
        render_data.push({
          id: id++,
          label: 'Slides',
          children: []

        })

        top_dom.querySelectorAll('slide').forEach((slide) => {
          // console.log(slide)

          render_data[0].children.push({
            id: id++,
            label: 'Slide',
            children: []
          })

          // 注意：这是遍历直接子级元素
          let child = slide.firstChild
          while (child) {
            if (child.nodeType === Node.ELEMENT_NODE) {
              // console.log(child.nodeType, child.textContent, child instanceof Element)
              console.log(child.textContent)

              render_data[0].children[render_data[0].children.length - 1].children.push({
                id: id++,
                label: child.textContent,
                children: []
              })
            }
            if (child?.nextSibling) {
              child = child.nextSibling
            } else {
              break
            }
          }
        }
        )
        return render_data
      }
    }
  }
}
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

</style>
