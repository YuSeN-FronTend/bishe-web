import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "../src/styles/index.scss";`
      }
    }
  },
  // 前端跨域配置
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://127.0.0.1:7001/',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, "")
  //     }
  //   }
  // }
})
