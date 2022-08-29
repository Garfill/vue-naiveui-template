import { defineConfig, normalizePath } from 'vite';
import path from 'path';
// 样式相关
import postcssPresetEnv from 'postcss-preset-env';
import Unocss from 'unocss/vite';
import { presetUno, presetAttributify, presetIcons } from 'unocss';

// vite相关
import vue from '@vitejs/plugin-vue';
import viteEslint from 'vite-plugin-eslint';
import vueSetupExtend from 'vite-plugin-vue-setup-extend'; // 扩展setup使用name
// svg
import svgLoader from 'vite-svg-loader';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
// 自动导入
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver, VueUseComponentsResolver } from 'unplugin-vue-components/resolvers';

// scss 全局样式路径
// const variablePath = normalizePath(path.resolve('./src/style/variable.scss'));
const mixinPath = normalizePath(path.resolve('./src/style/mixin.scss'));


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
        additionalData: `
          @import "${mixinPath}";
        `
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
    vueSetupExtend(),
    svgLoader({
      defaultImport: 'component'
    }),
    Unocss({
      // 自定义规则
      rules: [
        ['w100p', { width: '100%' }],
      ],
      presets: [
        presetAttributify({ /* preset options */ }),
        presetIcons({
          extraProperties: {
            'display': 'inline-block',
            'vertical-align': 'middle'
          },
        }),
        presetUno(),
      ],
    }),
    viteEslint({
      // fix: true, 打开时会在保存后按照eslint更改代码规范
      failOnError: false, // 防止eslint报错导致运行失败
    }),
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
    }),
    // 自动引入相关
    AutoImport({
      include: [/\.vue$/, /\.vue\?vue /],
      imports: [
        'vue',
        'vue-router',
        'pinia',
        '@vueuse/core',
        {
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar', 'useOsTheme'],
        },
        {
          '@u/resolvePromise': ['resolve']
        },
      ],
      dts: './auto-imports.d.ts',
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
    }),
    Components({
      dts: true,
      dirs: [],
      types: [{
        from: 'vue-router',
        names: ['RouterLink', 'RouterView'],
      }],
      resolvers: [NaiveUiResolver(), VueUseComponentsResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': resolvePath('src'),
      '@c': resolvePath('src/components'),
      '@i': resolvePath('src/icon'),
      '@v': resolvePath('src/view'),
      '@u': resolvePath('src/utils'),
    }
  }
});
