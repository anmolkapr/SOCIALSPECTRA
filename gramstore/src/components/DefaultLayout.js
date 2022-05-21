import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import './defaultLayout.css'
import React from 'react';
import { Link } from 'react-router-dom';

const { Header, Sider, Content } = Layout;


class DefaultLayout extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout>
        <Layout className="site-layout">
          <Header className="site-layout-background " style={{ padding: 0 }}>
            <div className='d-flex justify-content-between align-items-center bs1'>
            <h4>{JSON.parse(localStorage.getItem('user')).username}</h4>
            <h2>Gram Store </h2>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
            </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={window.location.pathname}>
            <Menu.Item key="/" icon={<UserOutlined />}>
              <Link to =  "/">Home Page </Link>
            </Menu.Item>
            <Menu.Item key="/profile" icon={<VideoCameraOutlined />}>
            <Link to =  "/profile">Profile Page </Link>
            </Menu.Item>
            <Menu.Item key= "/addpost" icon={<UploadOutlined />}>
            <Link to =  "/addpost">Add a post </Link>
            </Menu.Item>

            <Menu.Item icon={<LogoutOutlined />}>
              <Link onClick={() => (localStorage.removeItem('user'), window.location.reload())}>Logout </Link>
            </Menu.Item>
          </Menu>
        </Sider>
      </Layout>
    );
  }
}

export default DefaultLayout
 