import { Effect, Reducer, Subscription } from 'umi';
import { pageQuery } from '@/pages/live/service';

interface LiveState {
  liveItems: LiveItem[]
  liveVideoVisible: boolean
}

interface LiveItem {
  key: number,
  'id': number,
  'deviceId': number,
  'streamCode': string,
  'pushFlag': number,
  'ordinary': {}
  'infrared': {}
}

interface _LiveItem {
  'id': number,
  'device_id': string,
  'stream_code': string,
  'push_flag': number,
  'ordinary': {}
  'infrared': {}
}

interface LiveModelType {
  namespace: string,
  state: {
    liveItems: LiveItem[]
  },
  effects: {
    pageQuery: Effect
  }
  reducers: {
    _pageQuery: Reducer,
    openVideo: Reducer,
    closeVideo: Reducer
  }
  subscriptions: {
    setup: Subscription
  }
}

const LiveModel: LiveModelType = {
  namespace: 'live',
  state: {
    liveItems: [],
  },
  effects: {
    * pageQuery({ payload }, { call, put }) {
      const ret = yield call(pageQuery, {});
      yield put({
        type: '_pageQuery',
        payload: ret.data,
      });
    },
  },
  reducers: {
    _pageQuery(state: LiveState, { payload }) {
      return {
        ...state,
        liveItems: payload.map((it: _LiveItem) => {
          return {
            key: it.id,
            id: it.id,
            deviceId: it.device_id,
            streamCode: it.stream_code,
            pushFlag: it.push_flag,
            ordinary: it.ordinary,
            infrared: it.infrared,
          };
        }),
      };
    },

    openVideo(state: LiveState, { payload }) {
      return {
        ...state,
        videoRecord: payload,
        liveVideoVisible: true,
      };
    },

    closeVideo(state: LiveState, { payload }) {
      return {
        ...state,
        liveVideoVisible: false,
        videoRecord: null,
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(async ({ pathname, search }) => {
        if (pathname === '/live') {
          dispatch({ type: 'pageQuery' });
        }
      });
    },
  },
};

export default LiveModel;
