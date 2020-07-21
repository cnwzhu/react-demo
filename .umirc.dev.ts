import { defineConfig } from 'umi';

export default defineConfig({
  proxy: {
    '/api': {
      target: 'http://localhost:9090',
      changeOrigin: true,
    },
  },
  define: {
    'FLV_BASE_URL': 'http://192.168.31.67:18080/live',
  },
});
