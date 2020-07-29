import React from 'react';
import { connect, Loading } from 'umi';
import { Divider, Space, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import DeviceSaveForm from '@/pages/device/form/save';
import Header from '@/pages/device/header';

interface Props {
  dispatch: any
  page: Page
  deviceItems: any
  loading: boolean
  deviceEditVisible: any
  deviceDetail: any
  queryParam: any
}

class DevicePage extends React.Component<Props, any> {
  private readonly columns: ColumnsType<any>;

  constructor(props: any) {
    super(props);
    this.columns = [
      {
        title: '设备id',
        dataIndex: 'deviceId',
        key: 'name',
      },
      {
        title: '正常推流码',
        dataIndex: 'streamCode',
        key: 'commonCode',
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
            {/*        <a style={{ color: 'red' }} onClick={() => {
              Modal.confirm(
                {
                  title: '警告',
                  content: '确定删除吗',
                  onOk: () => {
                    this.props.dispatch({
                      type: 'device/del',
                      payload:{
                        id:record.id
                      },
                    });
                  },
                  okText: '确定',
                  cancelText: '取消',
                },
              );
            }}> 删除 </a>*/}
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

  pageQuery = () => {
    const param = this.props.queryParam ? this.props.queryParam : {};
    console.log(param);
    this.props.dispatch({
      type: 'device/pageQuery',
      payload: {
        online_state: param.onlineState,
        push_state: param.pushState,
        device_add_date_start: !param.dateRange ? null : param.dateRange[0] ? param.dateRange[0].format('yyyy-MM-DD') : null,
        device_add_date_end: !param.dateRange ? null : param.dateRange[1] ? param.dateRange[1].format('yyyy-MM-DD') : null,
        pageable: param.pageable,
      },
    });
  };

  queryParamChange = (v: any) => {
    this.props.dispatch({
      type: 'device/queryParamChange',
      payload: {
        ...this.props.queryParam,
        ...v,
      },
    });
  };

  render() {
    const page = this.props.page ? this.props.page : {
      total: 0,
      pageSize: 0,
      current: 0,
      size: 0,
    };
    const queryParam = this.props.queryParam ? this.props.queryParam : {};
    return (
      <div>
        <Header
          query={this.pageQuery}
          reset={() => {
            this.props.dispatch({ type: 'device/queryParamReset' });
            this.props.dispatch({ type: 'device/pageQuery' });
          }}
          onchange={(v) => this.queryParamChange(v)}
          queryParam={queryParam}
          showEdit={() => this.props.dispatch({ type: 'device/showEdit' })}/>
        <Divider/>
        <Table
          columns={this.columns}
          dataSource={this.props.deviceItems}
          loading={this.props.loading}
          pagination={{
            total: page.total,
            pageSize: page.size,
            current: page.current,
            onChange: (page, pageSize) => {
              this.queryParamChange({
                pageable: { page: page, page_count: pageSize },
              });
            },
          }}
        />
        {this.props.deviceEditVisible ?
          <DeviceSaveForm
            add={(value: any) => {
              this.props.dispatch({
                type: 'device/save',
                payload: {
                  id: value.id,
                  stream_code: value.streamCode,
                  device_id: value.deviceId,
                },
              });
            }}
            closeEdit={() => {
              this.props.dispatch({
                type: 'device/closeEdit',
              });
              this.props.dispatch({
                type: 'device/pageQuery',
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
