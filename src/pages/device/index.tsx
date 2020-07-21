import React from 'react';
import { connect, Loading } from 'umi';
import { Button, Divider, Modal, Space, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import DeviceSaveForm from '@/pages/device/form/save';
import DeviceQueryForm from '@/pages/device/form/query';

class DevicePage extends React.Component<any, any> {
  private readonly columns: ColumnsType<any>;

  constructor(props: any) {
    super(props);
    this.columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '正常推流码',
        dataIndex: 'commonCode',
        key: 'commonCode',
      },
      {
        title: '红外推流码',
        dataIndex: 'infraredCode',
        key: 'infraredCode',
      },
      {
        title: '在线',
        dataIndex: 'offlineFlag',
        key: 'offlineFlag',
        render: (record) => {
          return record === 1 ? '是' : '否';
        },
      },
      {
        title: '推流',
        dataIndex: 'pushFlag',
        key: 'pushFlag',
        render: (record) => {
          return record === 1 ? '是' : '否';
        },
      },
      {
        title: '添加时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
      },
      {
        title: '修改时间',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
      },
      {
        title: '操作',
        key: 'watch',
        render: (record) => {
          return <Space size="middle">
            <a onClick={() => {
              Modal.confirm(
                {
                  title: '警告',
                  content: '确定删除吗',
                  onOk: () => {
                    this.props.delete(record.id);
                  },
                  okText: '确定',
                  cancelText: '取消',
                },
              );
            }}> 删除 </a>
            <a onClick={() => {
              this.props.dispatch({
                type: 'device/showEdit',
                payload: record,
              });
            }}>
              编辑
            </a>
          </Space>;
        },
      },
    ];
  }

  render() {
    return (
      <div>
        <Space size="small">
          <Button onClick={() => {
            this.props.dispatch({
              type: 'device/showEdit',
            });
          }}>
            添加
          </Button>
          <DeviceQueryForm
            deviceQueryParam={{
              onlineState: 1,
              pushState: 'string',
              dateRange: [],
            }}
            query={() => {

            }}
          />
        </Space>
        <Divider/>
        <Table
          columns={this.columns}
          dataSource={this.props.deviceItems}
          loading={this.props.loading}
        />
        {this.props.deviceEditVisible ?
          <DeviceSaveForm
            add={(value: any) => {

            }}
            closeEdit={() => {
              this.props.dispatch({
                type: 'device/closeEdit',
              });
            }}
            deviceDetail={this.props.deviceDetail}
          /> : <></>}
      </div>
    );
  }
}

const mapStateToProps = ({ device, loading }: { device: any; loading: Loading }) => {
  return {
    ...device,
    loading: loading.models.device,
  };
};

export default connect(mapStateToProps)(DevicePage);
