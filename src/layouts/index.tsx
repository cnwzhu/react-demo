import { Avatar, Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React from 'react';
import { Link } from 'umi';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class DemoLayout extends React.Component<any, any> {

  state = {
    collapsed: false,
  };

  onCollapse = (collapsed: any) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo"/>
          <Menu theme="dark" defaultSelectedKeys={this.props.selectedMenuKeys} mode="inline"
                selectedKeys={this.props.history.location.pathname}>
            {
              this.props.route.routes.filter((it: any) => it !== '/').map((it: any) => {
                return (
                  <Menu.Item key={it.key}>
                    <Link to={it.path} key={it.key}>
                      <span>{it.title}</span>
                    </Link>
                  </Menu.Item>
                );
              })
            }
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background"
                  style={{ padding: ' 0 20', display: 'flex', justifyContent: 'flex-end' }}>
            <div>
              <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined/>}/>
            </div>
          </Header>
          <Content style={{ margin: '16px 16px 0' }}>
            <div className="site-layout-background" style={{ padding: 24, height: '100%' }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center', padding: '10px' }}>
            <div>Ant Design ©2020</div>
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default DemoLayout;
