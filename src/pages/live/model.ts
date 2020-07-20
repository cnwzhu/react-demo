import { Effect, Reducer, Subscription } from 'umi';
import { pageQuery } from '@/pages/live/service';

interface LiveState {
  liveItems: LiveItem[]
  liveVideoVisible: boolean
}

interface LiveItem {
  key: number,
  'id': number,
  'action': string,
  'clientId': number,
  'clientName'?: string,
  'ip'?: string,
  'vhost': string,
  'app': string,
  'stream': string,
  'pushFlag': number,
  'pushSDate': string,
  'pushEDate': string
}

interface _LiveItem {
  'id': number,
  'action': string,
  'client_id': number,
  'client_name'?: string,
  'ip'?: string,
  'vhost': string,
  'app': string,
  'stream': string,
  'push_flag': number,
  'push_sdate': string,
  'push_edate': string
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
            action: it.action,
            clientId: it.client_id,
            clientName: it.client_name,
            ip: it.ip,
            vhost: it.vhost,
            app: it.app,
            stream: it.stream,
            pushFlag: it.push_flag,
            pushSDate: it.push_sdate,
            pushEDate: it.push_edate,
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
