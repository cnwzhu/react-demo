import { Effect, Reducer, Subscription } from '@@/plugin-dva/connect';
import { del, pageQuery, save } from '@/pages/device/service';


interface DeviceState {
  deviceEditVisible: boolean
  deviceDetail: any
}

interface DeviceItem {
  key: number,
  id: number
  streamCode: string
  locationInfo?: any
  deviceId: string
  offlineFlag: number
  pushFlag: number
  createdAt: string
  updatedAt: string
}

interface _DeviceItem {
  id: number,
  stream_code: string
  location_info?: any
  device_id: string
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
    queryParamChange: Reducer
    queryParamReset: Reducer
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
      const pageable = payload && payload.pageable ? payload.pageable : {
        page: 1,
        page_count: 10,
      };
      const ret = yield call(pageQuery, {
        ...payload,
        pageable: pageable,
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
      yield call(save, {
        ...payload,
      });
      yield put({
        type: 'pageQuery',
      });
    },
    * del({ payload }, { call, put }) {
      yield call(del, {
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
            streamCode: it.stream_code,
            locationInfo: null,
            deviceId: it.device_id,
            offlineFlag: it.offline_flag,
            pushFlag: it.push_flag,
            createdAt: it.created_at,
            updatedAt: it.updated_at,
          };
        }),
        page: {
          current: payload.current,
          orders: payload.order,
          pages: payload.pages,
          size: payload.size,
          total: payload.total,
        },
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
    queryParamChange(state: DeviceState, { payload }) {
      return {
        ...state,
        queryParam: { ...payload },
      };
    },
    queryParamReset(state: DeviceState, { payload }) {
      return {
        ...state,
        queryParam: {},
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
