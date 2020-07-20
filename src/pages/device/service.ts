import request from '@/utils/request';

interface DevicePageQueryParam {
  online_state?: number
  push_state?: number
  device_add_date_start?: string,
  device_add_date_end?: string,
  pageable: {
    page: number,
    page_count: number,
  },
}

export async function pageQuery(params: DevicePageQueryParam) {
  return request('/api/v1/device/query', {
    method: 'POST',
    data: { ...params },
    requestType: 'json',
  });
}
