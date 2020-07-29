import React from 'react';
import { Button, DatePicker, Select, Space } from 'antd';

interface Props {
  queryParam: any
  query: () => void
  reset: () => void
  onchange: (param: any) => void
  showEdit: (param: any) => void
}

export default class Header extends React.Component<Props, any> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <Space size="small">
        <Button onClick={this.props.showEdit}> 添加 </Button>
        <span>
          离线状态
        </span>
        <Select style={{ width: 120 }}
                placeholder="是否离线"
                value={this.props.queryParam.onlineState}
                onChange={(v) => {
                  this.props.onchange({
                    onlineState: v,
                  });
                }}
                allowClear>
          <Select.Option value='1'>是</Select.Option>
          <Select.Option value='2'>否</Select.Option>
        </Select>
        <span>
          推流状态
        </span>
        <Select style={{ width: 120 }}
                placeholder="是否推流"
                value={this.props.queryParam.pushState}
                onChange={(v) => {
                  this.props.onchange({
                    pushState: v,
                  });
                }}
                allowClear>
          <Select.Option value='1'>是</Select.Option>
          <Select.Option value='2'>否</Select.Option>
        </Select>
        <span>
          时间
        </span>
        <DatePicker.RangePicker
          value={this.props.queryParam.dateRange}
          onChange={(v) => {
            this.props.onchange({
              dateRange: v,
            });
          }}
        />
        <Button type={'primary'} onClick={this.props.query}> 查询 </Button>
        <Button type={'primary'} onClick={this.props.reset}> 重置 </Button>
      </Space>
    );
  }
}
