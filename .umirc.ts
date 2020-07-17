import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  dva: {
    skipModelValidate: true,
    hmr: true,
  },
  antd: {
    compact: false,
  },
  dynamicImport: {},
  routes: [
    {
      path: '/',
      exact: false,
      component: '@/layouts/index',
      routes: [
        { exact: true, path: '/', component: 'home', title: '主页', key: 'map' },
        { exact: true, path: '/map', component: 'map', title: '地图', key: 'map' },
        { exact: true, path: '/live', component: 'live', title: '直播', key: 'live' },
        { exact: true, path: '/record', component: 'record', title: '录播', key: 'record' },
        { exact: true, path: '/device', component: 'device', title: '设备', key: 'device' },
      ],
    },

  ],
})
;
