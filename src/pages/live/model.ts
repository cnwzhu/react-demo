import { Effect, ImmerReducer, Reducer, Subscription} from 'umi'


const LiveModel =  {
  namespace: 'live',
  state: {
    name: '',
  },
  effects: {},
  reducers: {
    demo(){
      console.log("demo")
      return {
        name:"zhansan"
      }
    }
  },
  subscriptions: {

  }
}

export default LiveModel;
