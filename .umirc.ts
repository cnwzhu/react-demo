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

  routes: [
    {
      path: '/',
      exact: false,
      component: '@/layouts/index',
      routes: [
        { exact: true, path: '/map', component: 'map', title: '主页', key: 'map' },
        { exact: true, path: '/live', component: 'live', title: '直播', key: 'live' },
      ],
    },

  ],
})
;
