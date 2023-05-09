<template>
  <div class="container">
    <el-card>
      <el-row :gutter="20">
        <el-tag style="margin: 10px 10px;">{{ template_id | templateStatus }}</el-tag>
      </el-row>
      <el-row :gutter="20">
        <el-input
          v-model="topic"
          placeholder="请输入主题"
          style="width: 300px;margin: 10px 10px;"
        />
      </el-row>
      <el-row :gutter="20">
        <el-input
          v-model="sponsor"
          placeholder="请输入汇报人"
          style="width: 300px;margin: 10px 10px;"
        />
      </el-row>
      <el-row :gutter="20">
        <el-button
          type="primary"
          @click="createPPT"
          style="margin: 10px 10px;"
        >创建PPT
        </el-button>
      </el-row>
      <h1>
        选择模板
      </h1>
      <div style="width: 70% ;margin: 0 auto;">
        <el-row :gutter="20" class="template-row">
          <el-col v-for="(card, index) in paginatedCards" :key="index" :span="6">
            <el-card class="template-card">
              <el-image :src="card.imageUrl" class="template-cover"/>
              <el-radio v-model="template_id" :label="card.id" class="template-title">{{ card.title }}</el-radio>
            </el-card>
          </el-col>
        </el-row>
        <div class="pagination-container">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            :total="cards.length"
            layout="prev, pager, next, jumper"
          />
        </div>
      </div>


    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      topic: '',
      sponsor: '',
      template_id: 0,
      currentPage: 1,
      pageSize: 4,
      cards: [
        {
          id: 1,
          title: '清新绿',
          imageUrl: 'https://user-images.githubusercontent.com/91320586/236781759-d196f1ce-141d-49ff-abf7-214398f265c9.jpg'
        },
        {
          id: 2,
          title: '思政红',
          imageUrl: 'https://user-images.githubusercontent.com/91320586/236781963-d0de5751-63a2-4633-8f40-3d466b8e883f.jpg'
        },
        {
          id: 3,
          title: '酷黑',
          imageUrl: 'https://user-images.githubusercontent.com/91320586/236782076-768f4b57-5e0b-4a81-a587-cd982cd5a079.jpg'
        },
        {
          id: 4,
          title: '卡通蓝色',
          imageUrl: 'https://user-images.githubusercontent.com/91320586/236782243-6f64cfbd-6493-4547-b889-ca3cf5f2afd9.jpg'
        },
        {
          id: 5,
          title: '纯白',
          imageUrl: 'https://user-images.githubusercontent.com/91320586/236782311-a49671af-cfea-4079-87c3-d7e6da7165e3.jpg'
        },
        {
          id: 6,
          title: '白蓝',
          imageUrl: 'https://user-images.githubusercontent.com/91320586/236782162-f1494a70-aece-4932-8e6d-faafe90c7cbc.jpg'
        },
        {
          id: 7,
          title: '灰',
          imageUrl: 'https://user-images.githubusercontent.com/91320586/236782426-40f69d80-304a-4a94-a7a3-c3a33c92cda4.jpg'
        }
      ]
    };
  },
  filters: {
    templateStatus(value) {
      if (value === 0) {
        return '未选择模板';
      } else {
        return '已选择模板';
      }
    }
  },
  computed: {
    paginatedCards() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.cards.slice(startIndex, endIndex);
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    createPPT() {
      if (this.template_id === 0) {
        this.$message({
          message: '请选择模板',
          type: 'warning'
        });
      } else if (this.topic === '') {
        this.$message({
          message: '请输入主题',
          type: 'warning'
        });
      } else if (this.sponsor === '') {
        this.$message({
          message: '请输入汇报人',
          type: 'warning'
        });
      } else {
        this.$router.push({
          path: '/direction/edit',
          query: {
            topic: this.topic,
            sponsor: this.sponsor,
            template_id: this.template_id
          }
        });
      }
    }
  }
};
</script>
<style scoped>
.container {
  max-width: 1500px;
  margin: 0 auto;
  padding: 20px;
}

.template-row {
  margin-top: 20px;
  margin-left: -10px;
  margin-right: -10px;
}

.template-card {
  margin-bottom: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.template-cover {
  height: 120px;
  object-fit: cover;
  border-radius: 4px 4px 0 0;
}

.template-title {
  display: block;
  margin-top: 10px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

</style>
