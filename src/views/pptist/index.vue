<template>
  <!--  显示外部界面-->

  <div id="app">
    <iframe src="http://localhost:7777" id="pptist-frame" frameborder="0" @load="handleIframeLoad" width="100%"
            height="100%"></iframe>
  </div>
</template>

<script>
// alert(Cookies.get("token")

export default {
  data() {
    return {}
  },
  mounted() {

  },
  methods: {
    handleIframeLoad() {
      console.log("father0:" + JSON.stringify(document.cookie))
      let matches = document.cookie.match(/token=([^;]+)/);
      console.log("father1:" + JSON.stringify(matches))
      let token = (matches ? matches[1] : null);
      var iframe = document.getElementById('pptist-frame');
      var iframeWindow = iframe.contentWindow;
      iframeWindow.postMessage(token, 'http://localhost:7777');
      console.log("father2: " + token)
    }
  }
}


</script>

<style scoped>
#app {
  height: 800px;
  width: 100%;
}
</style>
