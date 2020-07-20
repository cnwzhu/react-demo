import React from 'react';
import { connect, Loading } from 'umi';
import { Button, Divider, Modal, Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
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
          return <div>
            <Tooltip title="删除">
              <DeleteOutlined
                style={{ fontSize: '20px' }}
                onClick={() => {
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
                }}/>
            </Tooltip>
            <Tooltip title="编辑">
              <EditOutlined
                style={{ fontSize: '20px', marginLeft: '5px' }}
                onClick={() => {
                  this.props.dispatch({
                    type: 'device/showEdit',
                    payload: record,
                  });
                }}>
              </EditOutlined>
            </Tooltip>
          </div>;
        },
      },
    ];
  }

  render() {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'start' }}>
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
        </div>
        <Divider/>
        <Table
          columns={this.columns}
          dataSource={this.props.deviceItems}
          loading={this.props.loading}
        />;
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
