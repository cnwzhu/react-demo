import React from 'react';
import { connect, Loading } from 'umi';
import { Button, Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import { YoutubeOutlined } from '@ant-design/icons';

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
                        this.props.openRecordVideo(record);
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
        />
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
