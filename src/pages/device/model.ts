import { Effect, Reducer, Subscription } from '@@/plugin-dva/connect';
import { pageQuery } from '@/pages/device/service';


interface DeviceState {
}

interface DeviceItem {
  key: number,
  id: number
  commonCode: string
  infraredCode: string
  locationInfo?: any
  name: string
  offlineFlag: number
  pushFlag: number
  createdAt: string
  updatedAt: string
}

interface _DeviceItem {
  id: number,
  common_code: string
  infrared_code: string
  location_info?: any
  name: string
  offline_flag: number
  push_flag: number
  created_at: string
  updated_at: string
}

interface DeviceModelType {
  namespace: string,
  state: {
    deviceItems: DeviceItem[]
  },
  effects: {
    pageQuery: Effect
  }
  reducers: {
    _pageQuery: Reducer
  }
  subscriptions: {
    setup: Subscription
  }
}

const DeviceModel: DeviceModelType = {
  namespace: 'device',
  state: {
    deviceItems: [],
  },
  effects: {
    * pageQuery({ payload }, { call, put }) {
      const ret = yield call(pageQuery, {
        pageable: {
          page: 1,
          page_count: 10,
        },
      });
      yield put({
        type: '_pageQuery',
        payload: ret.data,
      });
    },
  },
  reducers: {
    _pageQuery(state: DeviceState, { payload }) {
      return {
        deviceItems: payload.records.map((it: _DeviceItem) => {
          return {
            key: it.id,
            id: it.id,
            commonCode: it.common_code,
            infraredCode: it.infrared_code,
            locationInfo: null,
            name: it.name,
            offlineFlag: it.offline_flag,
            pushFlag: it.push_flag,
            createdAt: it.created_at,
            updatedAt: it.updated_at,
          };
        }),
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(async ({ pathname, search }) => {
        if (pathname === '/device') {
          dispatch({ type: 'pageQuery' });
        }
      });
    },
  },
};

export default DeviceModel;
