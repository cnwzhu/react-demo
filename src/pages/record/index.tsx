import React from 'react';
import { connect, Loading } from 'umi';
import { Button, Modal, Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import { YoutubeOutlined } from '@ant-design/icons';
import Hls from '@/components/hls';

class RecordPage extends React.Component<any, any> {
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
        title: '开始时间',
        dataIndex: 'pushSDate',
        key: 'pushSDate',
      },
      {
        title: '结束时间',
        dataIndex: 'pushUDate',
        key: 'pushUDate',
      },
      {
        title: '查看',
        key: 'watch',
        render: (record) => {
          return <div>
            <Tooltip title="查看">
              <Button type="primary" shape="circle" icon={<YoutubeOutlined/>}
                      onClick={() => {
                        this.props.dispatch({
                          type: 'record/openVideo',
                          payload: record,
                        });
                      }}/>
            </Tooltip>
          </div>;
        },
      },
    ];
  }

  render() {
    return (
      <div>
        <Table
          columns={this.columns}
          loading={this.props.loading}
          dataSource={this.props.recordItems}
          pagination={{
            total: 100,

          }}
        />
        {
          this.props.recordVideoVisible ? (
            <Modal
              title="录播"
              visible={this.props.recordVideoVisible}
              closable={true}
              onCancel={() => {
                this.props.dispatch({
                  type: 'record/closeVideo',
                });
              }}
              destroyOnClose={true}
              footer={null}
            >
              <Hls videoId={this.props.videoRecord.stream}
                   videoRef={this.props.videoRecord.stream}
                   videoUrl={`http://${this.props.videoRecord.vhost}:18080/${this.props.videoRecord.m3u8Url}`}
              />
            </Modal>
          ) : <></>
        }
      </div>
    );
  }
}

const mapStateToProps = ({ record, loading }: { record: any; loading: Loading }) => {
  return {
    ...record,
    loading: loading.models.record,
  };
};

export default connect(mapStateToProps)(RecordPage);
