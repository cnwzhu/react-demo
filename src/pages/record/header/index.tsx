import React from 'react';
import { Button, DatePicker, Input, Space } from 'antd';

interface Props {
  queryParam: any
  query: () => void
  reset: () => void
  onchange: (param: any) => void
}

export default class Header extends React.Component<Props, any> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <Space>
        <span>
          应用
        </span>
        <Input placeholder="请输入"
               allowClear
               value={this.props.queryParam.app}
               onChange={({ target: { value } }) => {
                 this.props.onchange({
                   app: value,
                 });
               }}/>
        <span>
          推流码
        </span>
        <Input placeholder="请输入"
               allowClear
               value={this.props.queryParam.stream}
               onChange={({ target: { value } }) => {
                 this.props.onchange({
                   stream: value,
                 });
               }}/>
        <span>
          开始时间
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
