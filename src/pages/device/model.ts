import { Effect, Reducer, Subscription } from '@@/plugin-dva/connect';
import { del, pageQuery, save } from '@/pages/device/service';


interface DeviceState {
  deviceEditVisible: boolean
  deviceDetail: any
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
    pageQuery: Effect,
    save: Effect
    del: Effect
  }
  reducers: {
    _pageQuery: Reducer,
    showEdit: Reducer
    closeEdit: Reducer
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
        ...payload,
        pageable: {
          page: 1,
          page_count: 10,
        },
      });
      yield put({
        type: 'closeEdit',
      });
      yield put({
        type: '_pageQuery',
        payload: ret.data,
      });
    },
    * save({ payload }, { call, put }) {
      const ret = yield call(save, {
        ...payload,
      });
      yield put({
        type: 'pageQuery',
      });
    },
    * del({ payload }, { call, put }) {
      const ret = yield call(del, {
        ...payload,
      });
      yield put({
        type: 'pageQuery',
      });
    },
  },
  reducers: {
    _pageQuery(state: DeviceState, { payload }) {
      return {
        ...state,
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
    showEdit(state: DeviceState, { payload }) {
      return {
        ...state,
        deviceEditVisible: true,
        deviceDetail: payload,
      };
    },
    closeEdit(state: DeviceState, { payload }) {
      return {
        ...state,
        deviceEditVisible: false,
        deviceDetail: null,
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
