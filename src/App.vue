<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    if (this.$router.path !== "/layoutindex") {
      this.$router.push({path:"/layoutindex"});
    }
  }
};
</script>
<style>
</style>
