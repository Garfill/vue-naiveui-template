import { defineConfig } from 'vite';
// 样式相关
import { normalizePath } from 'vite';
import path from 'path';
import postcssPresetEnv from 'postcss-preset-env';
import Unocss from 'unocss/vite';
// vite相关
import vue from '@vitejs/plugin-vue';
import viteEslint from 'vite-plugin-eslint';

const variablePath = normalizePath(path.resolve('./src/assets/style/variable.scss'));

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${variablePath}";`
      }
    },
    postcss: {
      plugins: [
        postcssPresetEnv({
          autoprefixer: {
            overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11']
          }
        })
      ]
    }
  },
  plugins: [
    vue(),
    Unocss({
      presets: [],
      rules: [['m-1', { margin: '10px' }]]
    }),
    viteEslint()
  ]
});
