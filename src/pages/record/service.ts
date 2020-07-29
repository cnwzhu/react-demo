import request from '@/utils/request';

interface RecordPageQueryParam {

}

export async function pageQuery(params: RecordPageQueryParam) {
  return request('/api/v1/m3u8/page_query', {
    method: 'POST',
    data: { ...params },
    requestType: 'json',
  });
}
