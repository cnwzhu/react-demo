import { Subscription } from 'umi';
import { queryAll } from '@/pages/device/service';
import { Effect, Reducer } from '@@/plugin-dva/connect';

interface MapState {

}

interface MapItem {

}

interface LiveModelType {
  namespace: string,
  state: {
    mapItems: MapItem[]
  },
  effects: {
    queryAll: Effect
  }
  reducers: {
    _queryAll: Reducer
  }
  subscriptions: {
    setup: Subscription
  }
}

const MapModel: LiveModelType = {
  namespace: 'map',
  state: {
    mapItems: [],
  },
  effects: {
    * queryAll({ payload }, { call, put }) {
      const ret = yield call(queryAll);
      yield put({
        type: '_queryAll',
        payload: ret.data,
      });
    },
  },
  reducers: {
    _queryAll(state: any, { payload }) {
      return {
        ...state,
        allDevice: payload.map((it: any) => {
          return {
            key: it.id,
            id: it.id,
            commonCode: it.common_code,
            infraredCode: it.infrared_code,
            locationInfo: it.location_info,
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
        if (pathname === '/map') {
          dispatch({ type: 'queryAll' });
        }
      });
    },
  },
};

export default MapModel;
