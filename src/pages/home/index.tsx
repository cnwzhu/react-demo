import React from 'react';
import { Result } from 'antd';

type Props = {}

export default function HomePage({}: Props) {
  return (
    <Result
      status="success"
      title="欢迎"
      subTitle="欢迎，访问主页"
    />
  );
}
