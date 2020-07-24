import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'FLV_BASE_URL': 'http://117.83.178.146:18080/ordinary',
  },
  chunks: ['umi'],
  externals: {
    'react': 'window.React',
    'react-dom': 'window.ReactDOM',
    'react-amap': 'window.ReactAMAP',
    'flv.js': 'window.flvjs',
    'video.js': 'window.videojs',
  },
  scripts: [
    'https://gw.alipayobjects.com/os/lib/react/16.12.0/umd/react.production.min.js',
    'https://gw.alipayobjects.com/os/lib/react-dom/16.12.0/umd/react-dom.production.min.js',
    'https://unpkg.com/react-amap@1.2.8/dist/react-amap.min.js',
    'https://libs.cdnjs.net/flv.js/1.5.0/flv.min.js',
    'https://libs.cdnjs.net/video.js/7.8.4/video-js.min.css',
    'https://libs.cdnjs.net/video.js/7.8.4/video.min.js',
  ],
});
