<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <p>{{ str }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { test } from '@/api/test';
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    test().then(res => {
      this.str = res.data
    })
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
