<template>
  <div>
    <Richtext
      v-model="content"
      @init-finish="initFinish"></Richtext>
  </div>
</template>

<script lang="ts" setup name="Richtext">
import Richtext from '@c/Richtext/index.vue'
import { Ref } from 'vue'

const content: Ref<string> = ref('')

function initFinish(editor: any) {
  console.log('editor', editor)
}
</script>