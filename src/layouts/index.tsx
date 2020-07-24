import { Avatar, Layout, Menu, Popover } from 'antd';
import * as Icon from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import React from 'react';
import { history, Link } from 'umi';

const { Header, Content, Footer, Sider } = Layout;

class DemoLayout extends React.Component<any, any> {

  state = {
    collapsed: false,
  };

  onCollapse = (collapsed: any) => {
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          style={{ width: 100 }}
          collapsible={false}
        >
          {this.state.collapsed ?
            (
              <div className={'logo'}/>
            ) : (
              <div className={'logo-jet'} onClick={() => {
                history.push('/');
              }}>
                <div className={'logo1'}/>
                <div style={{ marginTop: 'auto', marginBottom: 'auto' }}>JET STDIO</div>
              </div>
            )}

          <Menu
            theme="dark"
            defaultSelectedKeys={this.props.selectedMenuKeys}
            mode="inline"
            selectedKeys={this.props.history.location.pathname}
          >
            {this.props.route.routes
              .filter((it: any) => it.path !== '/')
              .map((it: any) => {
                return (
                  <Menu.Item key={it.key}>
                    <Link to={it.path} key={it.key}>
                      {React.createElement(
                        // @ts-ignore
                        Icon[it.icon],
                        {},
                      )}
                      <span>{it.title}</span>
                    </Link>
                  </Menu.Item>
                );
              })}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: ' 0 20',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <div>
              <Popover placement="left" content={'张三'}>
                <Avatar
                  icon={<UserOutlined/>}
                />
              </Popover>
            </div>
          </Header>
          <Content style={{ margin: '16px 16px 0' }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, height: '100%', borderRadius: '8px' }}
            >
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center', padding: '10px' }}>
            <div>JET ©2020</div>
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default DemoLayout;
