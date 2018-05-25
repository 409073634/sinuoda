<template>

  <section class="content">

    <div class="clearfix">
      <la-card size="12" title="WYSIWYG Editor" :options="{collapsable: true, color: 'warning'}">
        <div class="editor-wrapper">
          <vue-editor v-model="editorContent"></vue-editor>
        </div>
      </la-card>

      <la-card size="12" title="Markdown Editor" :options="{collapsable: true}">
        <la-markdown></la-markdown>
      </la-card>
    </div>

  </section>

</template>

<script>
import { VueEditor } from 'vue2-editor'   // >= IE11
import LaCard from 'lazuli/src/components/containers/LaCard'
import LaMarkdown from 'lazuli/src/components/plugins/LaMarkdown'

export default {
  name: 'EditorsView',

  components: {
    VueEditor,
    LaCard,
    LaMarkdown
  },

  data () {
    return {
      editorContent: ''
    }
  }
}
</script>

<style scoped>
.editor-wrapper {
  background-color: white;
}
</style>
