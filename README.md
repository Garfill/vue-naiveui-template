# vite项目开发模板

技术栈: Vue 3 + TypeScript + Vite

[搭建过程参考](https://juejin.cn/book/7050063811973218341)

### 环境区分
- 使用 `.env` 文件区分环境变量

### UI 框架
- 集成 `naive-ui`

### 样式
- 集成使用 `unocss` 和 `scss`

### Icon
- 使用 `@unocss/preset-icons`，图标库使用 `@iconify-json/Phosphor` :) 可以自行替换不同图标库
- 使用 `vite-plugin-svg-icons`生成雪碧图，支持 \<SvgIcon name="icon-name" color="color"/\> 组件，包含所有 src/icon 下的 svg 图标
- 使用 `vite-svg-loader`，使用url或者组件形式直接使用

### Lint
- 使用 `eslint` 和 `stylelint`，配合husky，实现统一样式规范

### Other
- 默认安装 VueUse，不用的可以删除 :)
- `unplugin-vue-components` 自动导入 `src/components` 下的组件(会失去点击跳转进入组件文件的快捷) 和 UI框架组件
- `unplugin-auto-import` 自动导入 Vue 相关 api