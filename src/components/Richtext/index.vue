<template>
  <div id="editor—wrapper">
    <div id="toolbar-container">
      <!-- 工具栏 -->
    </div>
    <div id="editor-container">
      <!-- 编辑器 -->
    </div>
  </div>
</template>


<script setup lang="ts" name="RichtextComponent">
// 上传图片格式需要按照一定格式或者通过 customInsert 设置
// https://www.wangeditor.com/v5/menu-config.html#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E5%9C%B0%E5%9D%80

import { getToken } from '@/utils/token'
import { createEditor, createToolbar } from '@wangeditor/editor'
import { IEditorConfig } from '@wangeditor/editor'
import '@wangeditor/editor/dist/css/style.css'
import type { RichContentType } from '@c/Richtext/custom-types'

interface EditorProps {
  autofocus?: boolean // 初始化后自动对焦
  content?: string // 初始化内容
  placeholder?: string
  mode?: 'default' | 'simple'
  height?: string
  uploadUrl?: string
  modelValue: RichContentType
}



const props = withDefaults(defineProps<EditorProps>(), {
  autofocus: false,
  content: '<p><br/></p>',
  placeholder: '请输入内容～',
  mode: 'default',
  height: '500px',
})

const emit = defineEmits<{
  (event: 'init-finish', editor: any): void
  (event: 'update:modelValue', content: RichContentType): void
}>()

const editor = shallowRef() // 这里只能用 shallowRef!!
const toolbar = ref()

function handleChange(content: RichContentType) {
  emit('update:modelValue', content)
}

function initEidtor(props: EditorProps) {
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: props.placeholder,
    onChange(editor: any) {
      const html = editor.getHtml()
      const text = editor.getText()
      handleChange({html, text})
    },
    MENU_CONF: {}
  }
  editorConfig.MENU_CONF!['uploadImage'] = {
    server: props.uploadUrl,
    fieldName: 'file',
    headers: {
      'x-token': getToken()
    },
    onBeforeUpload(file: any) {
      return file
    },
  }

  editor.value = createEditor({
    selector: '#editor-container',
    html: props.content,
    config: editorConfig,
    mode: props.mode,
  })

  const toolbarConfig = {}
  toolbar.value = createToolbar({
    editor: editor.value,
    selector: '#toolbar-container',
    config: toolbarConfig,
    mode: props.mode,
  })

  // emit init-finish
  emit('init-finish', editor.value)
}

onMounted(() => {
  initEidtor(props)
})
</script>


<style lang="scss" scoped>
#editor—wrapper {
  border: 1px solid #ccc;
  z-index: 100;
}
#toolbar-container {
  border-bottom: 1px solid #ccc;
}

#editor-container {
  height: v-bind(height);
}
</style>