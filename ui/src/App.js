import React, {useEffect, useState} from 'react';
import './App.css';

import {
    Routes,
    Route,
    Link,
    useMatch
} from "react-router-dom";

import {Avatar, Button, Layout, Menu, Typography} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    HomeOutlined,
} from '@ant-design/icons';
import Login from "./components/Login";
import Home from "./components/Home";
import Sider from "antd/es/layout/Sider";
import {connect} from "react-redux";


const {Header, Content} = Layout;
const { Text } = Typography;

function App() {
    const [collapsed, setCollapsed] = useState(true);
    const match = useMatch({ path: "/", end: true });

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logotype">
                    <Link to="/">
                        <Avatar className="logoImage" src="./assets/images/logo.png" />
                    </Link>
                </div>
                <Menu theme="dark" mode="inline">
                    <Menu.Item className={match?.pathname === "/" ? "ant-menu-item-selected" : ""} key="1" icon={<HomeOutlined/>}>
                        <Link to="/">Главная</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="layout" style={{ minHeight: '100vh' }}>
                <Header className="site-layout-background" style={{padding: 0}}>
                    <Button type='text' className="trigger" style={{ marginLeft: '15px', border: '1px solid #fff', borderRadius: '3px' }} onClick={() => setCollapsed(!collapsed)}>
                        {collapsed ? <MenuUnfoldOutlined style={{ color:'#fff' }} /> : <MenuFoldOutlined style={{ color:'#fff' }} />}
                    </Button>
                </Header>
                <Content
                    className="mainContent"
                >
                    <Routes>
                        <Route exact path="/" element={<Home />}/>
                        <Route path="/login" element={<Login/>}/>
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    );
}

export default connect(
    null,
    null
)(App);

