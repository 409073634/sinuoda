<template>
  <div class="page-container">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'PageView'
  }
</script>

<style scoped>
  .page-container {
    height: 100vh;
  }
</style>
