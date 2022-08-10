import { defineConfig, normalizePath } from 'vite';
import path from 'path';
// 样式相关
import postcssPresetEnv from 'postcss-preset-env';
import Unocss from 'unocss/vite';
import { presetUno, presetAttributify, presetIcons } from 'unocss';

// vite相关
import vue from '@vitejs/plugin-vue';
import viteEslint from 'vite-plugin-eslint';
import svgLoader from 'vite-svg-loader';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

// scss 全局样式路径
const variablePath = normalizePath(path.resolve('./src/style/variable.scss'));


const resolvePath = (dir: string) => {
  return path.resolve(__dirname, dir);
};

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
      presets: [
        presetAttributify({ /* preset options */ }),
        presetIcons({
          extraProperties: {
            'display': 'inline-block',
            'vertical-align': 'middle'
          }
        }),
        presetUno(),
      ],
    }),
    viteEslint({ fix: true }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/icon')],
      symbolId: 'icon-[dir]-[name]',
      svgoOptions: {
        // plugins: [
        //  // 清除图标原有的fill
        //   {
        //     name: "removeAttrs",
        //     params: {
        //       attrs: "fill",
        //     }
        //   }        
        // ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': resolvePath('src'),
      '@assets': resolvePath('src/assets'),
      '@icon': resolvePath('src/icon'),
    }
  }
});
