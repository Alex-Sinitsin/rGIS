import React, {useState} from 'react';
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
    UserOutlined,
    HomeOutlined,
} from '@ant-design/icons';
import Login from "./components/Login";
import Home from "./components/Home";
import Sider from "antd/es/layout/Sider";


const {Header, Content} = Layout;
const { Text } = Typography;

function App() {
    const [collapsed, SetCollapsed] = useState(true);
    const match = useMatch({ path: "/", end: true });

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logotype">
                    <Avatar className="logoImage" src="./assets/images/logo.png" />
                    {!collapsed && <Text className="logoText" strong style={{ color: '#fff', textTransform: 'uppercase', fontSize: '18px' }}>Сатурн ГИС</Text>}
                </div>
                <Menu theme="dark" mode="inline">
                    <Menu.Item className={match?.pathname === "/" ? "ant-menu-item-selected" : ""} key="1" icon={<HomeOutlined/>}>
                        <Link to="/">Главная</Link>
                    </Menu.Item>
                    <Menu.Item className={!match ? "ant-menu-item-selected" : ""} key="2" icon={<UserOutlined/>}>
                        <Link to="/login">Логин</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="layout" style={{ minHeight: '100vh' }}>
                <Header className="site-layout-background" style={{padding: 0}}>
                    <Button className="trigger" style={{ marginLeft: '15px' }} onClick={() => SetCollapsed(!collapsed)}>
                        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    </Button>
                </Header>
                <Content
                    className="mainContent"
                >
                    <Routes>
                        <Route exact path="/" element={<Home/>}/>
                        <Route path="/login" element={<Login/>}/>
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    );
}

export default App;
