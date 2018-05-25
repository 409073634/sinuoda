<template>
  <div class="text-center">
    <h3>
    {{ emptyId }}
    </h3>
  </div>
</template>

<script>
export default {
  name: 'EmptyView',
  data () {
    return {
      emptyId: ''
    }
  },
  watch: {
    '$route.path' () {
      this.checkPath()
    }
  },
  methods: {
    checkPath () {
      this.emptyId = this.$route.params['id'] || ''
    }
  },
  mounted () {
    this.checkPath()
  }
}
</script>
