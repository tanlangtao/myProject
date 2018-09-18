import React from 'react';
import App from "./App.js";
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { connect } from "dva";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import { push } from "react-router-redux";
class Buy extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <App k="buy">
                <Layout>
                      <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                          mode="inline"
                          defaultSelectedKeys={[this.props.k]}
                          defaultOpenKeys={['sub1']}
                          style={{ height: '100%', borderRight: 0 }}
                          onClick = {(item)=>{

                            this.props.dispatch(push("/buy/"+item.key))
                          }}
                        >
                          <SubMenu key="sub1" title={<span><Icon type="user" />买车</span>}>
                            <Menu.Item key="carlist">大表选车</Menu.Item>
                            <Menu.Item key="zhuanjia">专家荐车</Menu.Item>
                            <Menu.Item key="yunqi">运气选车</Menu.Item>
                          </SubMenu>
                        </Menu>
                      </Sider>
                      <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                          <Breadcrumb.Item>首页</Breadcrumb.Item>
                          <Breadcrumb.Item>买车</Breadcrumb.Item>
                          <Breadcrumb.Item>
                            {this.props.c}
                          </Breadcrumb.Item>
                        </Breadcrumb>
                        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                          {this.props.children}
                        </Content>
                      </Layout>
                    </Layout>
            </App>
        );
    }
}
export default connect()(Buy)