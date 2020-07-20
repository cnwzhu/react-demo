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
  proxy: {
    '/api': {
      target: 'http://localhost:9090',
      changeOrigin: true,
    },
  },
  routes: [
    {
      path: '/',
      exact: false,
      component: '@/layouts/index',
      routes: [
        {
          exact: true,
          path: '/',
          component: 'home',
          title: '主页',
          key: 'home',
          icon: 'HomeOutlined',
        },
        {
          exact: true,
          path: '/map',
          component: 'map',
          title: '地图',
          key: 'map',
          icon: 'EnvironmentOutlined',
        },
        {
          exact: true,
          path: '/live',
          component: 'live',
          title: '直播',
          key: 'live',
          icon: 'VideoCameraAddOutlined',
        },
        {
          exact: true,
          path: '/record',
          component: 'record',
          title: '录播',
          key: 'record',
          icon: 'PlaySquareOutlined',
        },
        {
          exact: true,
          path: '/device',
          component: 'device',
          title: '设备',
          key: 'device',
          icon: 'MobileOutlined',
        },
      ],
    },
  ],
});
