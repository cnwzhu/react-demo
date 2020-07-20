import React, { Ref } from 'react';
import { Button, DatePicker, Form, Select } from 'antd';

interface Props {
  deviceQueryParam: {
    onlineState: number
    pushState: string
    dateRange: any[]
  },
  query: (param: any) => void
}

export default class DeviceQueryForm extends React.Component<Props, any> {
  private readonly formRef: Ref<any>;

  constructor(props: Props) {
    super(props);
    this.formRef = React.createRef();
  }

  render() {
    return (
      <Form
        style={{
          display: 'flex',
          marginLeft:'10px'
        }}
        onFinish={this.props.query}
        ref={this.formRef}
        layout="inline">
        <div style={{ display: 'flex', justifySelf: 'start' }}>
          <Form.Item
            label="是否在线"
            name="onlineState"
            initialValue={this.props.deviceQueryParam.onlineState}>
            <Select style={{ width: 120 }}
                    placeholder="是否离线"
                    allowClear>
              <Select.Option value='1'>是</Select.Option>
              <Select.Option value='2'>否</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="是否推流"
            name="pushState"
            initialValue={this.props.deviceQueryParam.pushState}>
            <Select style={{ width: 120 }}
                    placeholder="是否推流"
                    allowClear>
              <Select.Option value='1'>是</Select.Option>
              <Select.Option value='2'>否</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="添加时间"
            name="dateRange"
            initialValue={this.props.deviceQueryParam.dateRange}
          >
            <DatePicker.RangePicker/>
          </Form.Item>
        </div>
        <div style={{ display: 'flex', justifySelf: 'end' }}>
          <Form.Item>
            <Button type={'primary'} htmlType={'submit'}>
              查询
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type={'primary'} htmlType={'reset'} onClick={(e) => {
              console.log(e);
              /* this.formRef.current.resetFields();*/
            }}>
              重置
            </Button>
          </Form.Item>
        </div>
      </Form>
    );
  }
}
