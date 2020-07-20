import React from 'react';
import { connect, Loading } from 'umi';
import { Button, Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import { YoutubeOutlined } from '@ant-design/icons';

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
                        this.props.openLiveVideo(record);
                      }}
              />
            </Tooltip>
          </div>;
        },
      },
    ];
  }

  render() {
    console.log(this.props.loading)
    return (
      <div>
        <Table columns={this.columns}
               dataSource={this.props.liveItems}
               loading={this.props.loading}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ live, loading }: { live: any; loading: Loading }) => {
  console.log(loading)
  return {
    ...live,
    loading: loading.models.live,
  };
};

export default connect(mapStateToProps)(LivePage);
