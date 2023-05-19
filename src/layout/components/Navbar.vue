<template>
  <div class="navbar">
    <img src="https://github.com/rumengkai/awesome-vue/assets/91320586/83f64d27-20a7-42e7-b6a4-30d828ff4365" class="user-avatar" @click="handlegotoDashboard">
    <div class="search-wrapper">
      <el-input type="text" v-model="search" placeholder="点此进入搜索" @click="handlegotoSearch"></el-input>
    </div>

    <div class="right-menu">

      <div class="avatar-wrapper">
        <img src="https://user-images.githubusercontent.com/91320586/236814430-708d8c48-f9a0-49e2-94f6-b25f33a03af8.png"
          class="user-avatar">
      </div>
      <button class="nav-button" @click="handlegotoProjects">我的项目</button>
      <button class="nav-button" @click.native="logout">登出</button>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data(){
    return{
      search:''
    }
  },

  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    handlegotoDashboard() {
      this.$router.push('/dashboard')
    },

    handlegotoSearch() {
      this.$router.push('/search')
    },

    handlegotoProjects(){
      this.$router.push('/project/index')
    },

    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 80px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

  .avatar-wrapper {
    display: flex;
    align-items: center;
  }

  .right-menu {
    display: flex;
    align-items: center;
  }

  .nav-button {
    margin-left: 10px;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 14px;
  }

  .user-avatar {
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }
}
</style>

