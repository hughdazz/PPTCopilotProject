<template>
  <div class="navbar">
    <img
      src="https://github.com/rumengkai/awesome-vue/assets/91320586/83f64d27-20a7-42e7-b6a4-30d828ff4365"
      class="user-avatar1"
      @click="handlegotoDashboard"
    />

    <div class="right-menu">
      <div class="avatar-wrapper">
        <el-button-group style="margin-right: 20px">
          <el-button
            icon="el-icon-search"
            @click="handlegotoSearch"
          ></el-button>
          <el-button @click="handlegotoSearch">点此进入搜索页</el-button>
        </el-button-group>

        <img
          src="http://123.249.70.216:8080/_static/user/1/avatar.png"
          class="user-avatar2"
          @click="handlegotoProfile"
        />
        <el-button
          type="primary"
          class="nav-button"
          @click="handlegotoProjects"
          round>我的项目</el-button
        >
        <el-button
          type="primary"
          class="nav-button"
          @click.native="logout"
          round
        >登出</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
    };
  },

  computed: {
    ...mapGetters(["sidebar", "avatar"]),
  },
  methods: {
    handlegotoDashboard() {
      this.$router.push("/dashboard");
    },
    handlegotoSearch() {
      this.$router.push("/index");
    },

    handlegotoProjects() {
      this.$router.push("/project/index");
    },
    handlegotoProfile() {
      this.$router.push("/profile");
    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    getPic() {
      getAvatar(this.id).then(response => {
        this.picture = response.data
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 80px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .search-button-container {
    margin-top: -5px;
  }

  .avatar-wrapper {
    display: flex;
    align-items: center;
  }

  .right-menu {
    float: right;
    margin-top: 20px;
  }

  .nav-button {
    margin-left: 10px;
    margin-right: 10px;
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 14px;
  }

  .user-avatar1 {
    cursor: pointer;
    width: 60px;
    height: 60px;
    margin-top: 5px;
  }
  .user-avatar2 {
    cursor: pointer;
    width: 40px;
    height: 40px;
  }
}
</style>
