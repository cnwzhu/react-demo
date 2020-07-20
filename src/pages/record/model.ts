import { Effect, Reducer, Subscription } from '@@/plugin-dva/connect';
import { pageQuery } from '@/pages/record/service';

interface RecordState {
}

interface RecordItem {
  key: number,
  'id': number,
  'action': string,
  'clientId': number,
  'clientName'?: string,
  'ip'?: string,
  'vhost': string,
  'app': string,
  'stream': string,
  'pushSDate': string,
  'pushUDate': string,
  'param': string,
  'm3u8Url': string,
  'startTs': string,
  'endTs': string
}

interface _RecordItem {
  'id': number,
  'action': string,
  'client_id': number,
  'client_name'?: string,
  'ip'?: string,
  'vhost': string,
  'app': string,
  'stream': string,
  'push_sdate': string,
  'push_udate': string,
  'param': string,
  'm3u8_url': string,
  'start_ts': string,
  'end_ts': string
}

interface RecordModelType {
  namespace: string,
  state: {
    recordItems: RecordItem[]
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

const RecordModel: RecordModelType = {
  namespace: 'record',
  state: {
    recordItems: [],
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
    _pageQuery(state: RecordState, { payload }) {
      return {
        ...state,
        recordItems: payload.map((it: _RecordItem) => {
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
            pushSDate: it.push_sdate,
            pushUDate: it.push_udate,
            param: it.param,
            m3u8Url: it.m3u8_url,
            startTs: it.start_ts,
            endTs: it.end_ts,
          };
        }),
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(async ({ pathname, search }) => {
        if (pathname === '/record') {
          dispatch({ type: 'pageQuery' });
        }
      });
    },
  },
};

export default RecordModel;
