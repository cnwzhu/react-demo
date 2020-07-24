import { defineConfig } from 'umi';

export default defineConfig({
  proxy: {
    '/api': {
      target: 'http://localhost:9090',
      changeOrigin: true,
    },
  },
  define: {
    'FLV_BASE_URL': 'http://192.168.31.67:18080/ordinary',
  },
  scripts: [
/*    'https://gw.alipayobjects.com/os/lib/react/16.12.0/umd/react.development.js',
    'https://gw.alipayobjects.com/os/lib/react-dom/16.12.0/umd/react-dom.development.js',
    'https://unpkg.com/react-amap@1.2.8/dist/react-amap.js',
    'https://libs.cdnjs.net/flv.js/1.5.0/flv.js',
    'https://libs.cdnjs.net/video.js/7.8.4/video-js.css',
    'https://libs.cdnjs.net/video.js/7.8.4/video.js',*/
  ],
});
