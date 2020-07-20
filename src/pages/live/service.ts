import request from '@/utils/request';

interface LivePageQueryParam {

}

export async function livePageQuery(params: LivePageQueryParam) {
  return request('/api/v1/publish', {
    method: 'GET',
  });
}
