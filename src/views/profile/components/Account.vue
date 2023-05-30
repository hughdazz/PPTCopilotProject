<template>
  <!--上传文件-->
  <div>
    <t-button type="primary" @click="handleCreate">
      <cloud-upload-icon slot="icon" />
      上传头像
    </t-button>
    <el-form>
      <el-form-item>
        <div>昵称</div>
        <el-input v-model.trim="user.name" />
      </el-form-item>
      <el-form-item>
        <div>Email</div>
        <el-row>
          <el-col style="width: 92%;">
            <el-input v-model.trim="user.email" />
          </el-col>
          <t-button type="primary" @click="validateEmail" style="margin-left: 1%; width: 7%;">验证</t-button>
        </el-row>
      </el-form-item>
      <el-form-item>
        <div>验证码</div>
        <el-input v-model.trim="code" />
      </el-form-item>
      <el-form-item>
        <t-button type="primary" @click="submit">更新</t-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  AddIcon,
  HeartIcon,
  HeartFilledIcon,
  CloudUploadIcon,
  ArrowDownRectangleIcon,
  ShareIcon,
} from 'tdesign-icons-vue';
import { upload } from '@/api/user'
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: ''
        }
      }
    }
  },
  components: {
    CloudUploadIcon,
  },
  data() {
    return {
      code: ''
    }
  },
  computed: {
    ...mapGetters(["id"]),
  },
  methods: {
    submit() {
      this.$message({
        message: 'User information has been updated successfully',
        type: 'success',
        duration: 5 * 1000
      })
    },
    handleCreate() {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';

      fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        // 在这里可以对文件进行处理，例如发送到服务器等
        const formData = new FormData();
        formData.append('savedir', 'static/user/' + this.id);
        formData.append('uploadname', file, file.name);
        formData.append('savename', 'avatar.png');
        upload(formData).then(response => {
          this.$message({
            message: '上传成功',
            type: 'success',
            duration: 1 * 1000
          })
        })
      });
      fileInput.click();
    },
  }
}
</script>
