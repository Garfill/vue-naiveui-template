<template>
  <div>
    <Richtext
      v-model="content"
      @init-finish="initFinish"></Richtext>
  </div>
</template>

<script lang="ts" setup name="Richtext">
import Richtext from '@c/Richtext/index.vue'
import type { RichContentType } from '@c/Richtext/custom-types'
import { Ref } from 'vue'

const content: Ref<RichContentType> = ref({})

function initFinish(editor: any) {
  console.log('editor', editor)
}
</script>