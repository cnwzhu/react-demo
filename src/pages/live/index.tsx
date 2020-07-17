import React from 'react';
import {connect,Loading} from 'umi'

class LivePage extends React.Component<any, any> {
  render() {
    return (<div>
      demo
    </div>);
  }
}

const mapStateToProps = ({ live, loading }: { live: any; loading: Loading })=>{
  return {
    ...live,
    loading: loading.models.index,
  }
}

export default connect(mapStateToProps)(LivePage);
