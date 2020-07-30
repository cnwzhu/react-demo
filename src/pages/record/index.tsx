import React from 'react';
import { connect, Loading } from 'umi';
import { Divider, Modal, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import Hls from '@/components/hls';
import Header from '@/pages/record/header';

interface Props {
  dispatch: any
  page: Page
  loading: boolean
  queryParam: any
  recordVideoVisible: boolean
  recordItems: any
  videoRecord: any
}

class RecordPage extends React.Component<Props, any> {
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
            <a onClick={() => {
              this.props.dispatch({
                type: 'record/openVideo',
                payload: record,
              });
            }}> 查看 </a>
          </div>;
        },
      },
    ];
  }

  pageQuery = () => {
    const param = this.props.queryParam ? this.props.queryParam : {};
    this.props.dispatch({
      type: 'record/pageQuery',
      payload: {
        app: param.app,
        stream: param.stream,
        device_add_date_start: !param.dateRange ? null : param.dateRange[0] ? param.dateRange[0].format('yyyy-MM-DD') : null,
        device_add_date_end: !param.dateRange ? null : param.dateRange[1] ? param.dateRange[1].format('yyyy-MM-DD') : null,
        pageable: param.pageable,
      },
    });
  };

  queryParamChange = (v: any) => {
    this.props.dispatch({
      type: 'record/queryParamChange',
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
        <Header queryParam={queryParam}
                query={this.pageQuery}
                reset={() => {
                  this.props.dispatch({ type: 'record/queryParamReset' });
                  this.props.dispatch({ type: 'record/pageQuery' });
                }}
                onchange={this.queryParamChange}/>
        <Divider/>
        <Table
          columns={this.columns}
          loading={this.props.loading}
          dataSource={this.props.recordItems}
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
