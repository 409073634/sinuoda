<template>
  <section class="content">
    <h3 v-for="i in 21">Welcome {{i}}!</h3>
  </section>
</template>

<script>
import api from '@/api'
export default {
  name: 'HomeView',
  mounted () {
    api.role.getAll({})
  }
}
</script>

<style scoped>
</style>
