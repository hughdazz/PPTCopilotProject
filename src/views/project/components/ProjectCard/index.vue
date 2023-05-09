<template>
    <el-card :body-style="0" shadow="always" @click="handleClick" class="project-card">
        <img :src="image" class="image">
        <div style="padding: 14px;">
            <div>
                <span>{{ title }}</span>
                <div style="margin: 0;padding: 0;">
                    <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link">操作</span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="rename">重命名</el-dropdown-item>
                            <el-dropdown-item command="delete">删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <span>{{ Updated }}</span>
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
            default: '2023-04-08T10:00:00Z'
        },
        id: {
            type: Number,
            default: 1
        }
    },
    methods: {
        handleClick() {
            // 处理点击事件
            this.$message.error('ok')
        },
        handleCommand(command) {
            switch (command) {
                case 'rename':
                    {
                        this.$prompt('将项目更名为', '提示',
                            {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消'
                            }
                        ).then(({ value }) => {
                            this.title=value
                            this.Updated=new Date().toLocaleString()
                            this.$message({
                                type: 'success',
                                message: '修改成功'
                            })
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '取消输入'
                            })
                        })
                    }
                    break;
                case 'delete':
                    {
                        this.$confirm('请确认是否删除', '提示',
                            {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type:"warning"
                            }
                        ).then(() => {
                            this.$emit("delete",this.id);
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            })
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '取消操作'
                            })
                        })
                    }
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
</style>
  