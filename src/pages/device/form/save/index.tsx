import React from 'react';
import { Button, Form, Input, Modal } from 'antd';

interface Props {
  deviceDetail: any
  add: (value: any) => void
  closeEdit: () => void
}

export default class DeviceSaveForm extends React.Component<Props, any> {

  render() {
    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };
    const tailLayout = {
      wrapperCol: {
        offset: 8,
        span: 16,
      },
    };
    const onFinish = (value: any) => {
      this.props.add(value);
    };

    const detail = this.props.deviceDetail ? this.props.deviceDetail : {};
    return (
      <Modal
        title="设备编辑"
        visible={true}
        closable={true}
        onCancel={this.props.closeEdit}
        destroyOnClose={true}
        footer={null}
      >
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            hidden={true}
            label="id"
            name="id"
            initialValue={detail.id}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="设备id"
            name="deviceId"
            initialValue={detail.deviceId}
            rules={[
              {
                required: true,
                message: '名称不能为空',
              },
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="推流码"
            name="streamCode"
            initialValue={detail.streamCode}
            rules={[
              {
                required: true,
                message: '正常推码流不能为空',
              },
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item {...tailLayout} >
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  };

}
