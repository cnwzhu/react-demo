import React from 'react';
import { connect, Loading } from 'umi';

class DevicePage extends React.Component<any, any> {
  render() {
    return <div>demo</div>;
  }
}

const mapStateToProps = ({
  record,
  loading,
}: {
  record: any;
  loading: Loading;
}) => {
  return {
    ...record,
    loading: loading.models.index,
  };
};

export default connect(mapStateToProps)(DevicePage);
