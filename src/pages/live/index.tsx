import React from 'react';
import { connect, Loading } from 'umi';
import { Modal, Space, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import Flv from '@/components/flv';

class LivePage extends React.Component<any, any> {
  private readonly columns: ColumnsType<any>;

  constructor(props: any) {
    super(props);
    this.columns = [
      {
        title: '设备号',
        dataIndex: 'deviceId',
        key: 'deviceId',
      },
      {
        title: '推流码',
        dataIndex: 'streamCode',
        key: 'streamCode',
      },
      {
        title: '正常推流状态',
        dataIndex: 'ordinary',
        key: 'ordinaryPushFlag',
        render: (record) => {
          return record.push_flag === 1 ? '推流' : '离线';
        },
      },
      {
        title: '红外推流状态',
        dataIndex: 'infrared',
        key: 'infraredPushFlag',
        render: (record) => {
          return record.push_flag === 1 ? '推流' : '离线';
        },
      },
      {
        title: '查看',
        key: 'watch',
        render: (record) => {
          return <Space size="middle">
            <a onClick={() => {
              if (record.ordinary.push_flag === 1) {
                this.props.dispatch({
                  type: 'live/openVideo',
                  payload: {
                    vhost: record.ordinary.vhost,
                    app: record.ordinary.app,
                    stream: record.streamCode,
                  },
                });
              } else {
                Modal.error({
                  title: '警告',
                  content: '设备未推流',
                });
              }
            }}> 普通 </a>
            <a style={{ color: 'red' }} onClick={() => {
              if (record.infrared.push_flag === 1) {
                this.props.dispatch({
                  type: 'live/openVideo',
                  payload: {
                    vhost: record.infrared.vhost,
                    app: record.infrared.app,
                    stream: record.streamCode,
                  },
                });
              } else {
                Modal.error({
                  title: '警告',
                  content: '设备未推流',
                });
              }
            }}>
              红外
            </a>
          </Space>;
        },
      },
    ];
  }

  render() {
    return (
      <div>
        <Table columns={this.columns}
               dataSource={this.props.liveItems}
               loading={this.props.loading}
        />
        {
          this.props.liveVideoVisible ? (
            <Modal
              title="直播"
              visible={this.props.liveVideoVisible}
              closable={true}
              destroyOnClose={true}
              footer={null}
              onCancel={() => {
                this.props.dispatch({
                  type: 'live/closeVideo',
                });
              }}
            >
              <Flv videoId={this.props.videoRecord.stream}
                   videoRef={this.props.videoRecord.stream}
                   controls={true}
                   videoUrl={`http://${this.props.videoRecord.vhost}:18080/${this.props.videoRecord.app}/${this.props.videoRecord.stream}.flv`}
              />
            </Modal>
          ) : <></>
        }
      </div>
    );
  }
}

const mapStateToProps = ({ live, loading }: { live: any; loading: Loading }) => {
  return {
    ...live,
    loading: loading.models.live,
  };
};

export default connect(mapStateToProps)(LivePage);
