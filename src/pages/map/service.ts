import request from '@/utils/request';

export async function queryAll() {
  return request('/api/v1/device/query_all', {
    method: 'GET',
  });
}
