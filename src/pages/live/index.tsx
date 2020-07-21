import React from 'react';
import { connect, Loading } from 'umi';
import { Button, Modal, Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import { YoutubeOutlined } from '@ant-design/icons';
import Flv from '@/components/flv';

class LivePage extends React.Component<any, any> {
  private readonly columns: ColumnsType<any>;

  constructor(props: any) {
    super(props);
    this.columns = [
      {
        title: '应用',
        dataIndex: 'app',
        key: 'app',
      },
      {
        title: '推流码',
        dataIndex: 'stream',
        key: 'stream',
      },
      {
        title: '状态',
        dataIndex: 'pushFlag',
        key: 'pushFlag',
        render: (record) => {
          return record === 1 ? '在线' : '离线';
        },
      },
      {
        title: '查看',
        key: 'watch',
        render: (record) => {
          return <div>
            <Tooltip title="查看">
              <Button type="primary" shape="circle" icon={<YoutubeOutlined/>}
                      disabled={record.pushFlag !== 1}
                      onClick={() => {
                        this.props.dispatch({
                          type: 'live/openVideo',
                          payload: record,
                        });
                      }}
              />
            </Tooltip>
          </div>;
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
              onCancel={()=>{
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
