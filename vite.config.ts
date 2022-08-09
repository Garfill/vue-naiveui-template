import { defineConfig, normalizePath } from 'vite';
// 样式相关
import path from 'path';
import postcssPresetEnv from 'postcss-preset-env';
import Unocss from 'unocss/vite';
// vite相关
import vue from '@vitejs/plugin-vue';
import viteEslint from 'vite-plugin-eslint';
import svgLoader from 'vite-svg-loader';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

const variablePath = normalizePath(path.resolve('./src/style/variable.scss'));

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
  },
  optimizeDeps: {
    force: true,
    entries: ['**/*.vue']
  },
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
            overrideBrowserslist: ['last 2 version, >1%, not dead']
          }
        })
      ]
    }
  },
  plugins: [
    vue(),
    svgLoader({
      defaultImport: 'component'
    }),
    Unocss({
      presets: [],
      rules: [['m-1', { margin: '10px' }]]
    }),
    viteEslint({ fix: true }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/icon')],
      symbolId: 'icon-[dir]-[name]',
    })
  ],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets')
    }
  }
});
