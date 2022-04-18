import React, {useState} from 'react';
import './App.css';

import {
    Routes,
    Route,
    Link,
    useMatch,
} from "react-router-dom";

import {Avatar,Layout, Menu} from 'antd';
import {
    AppstoreAddOutlined,
    HomeOutlined,
} from '@ant-design/icons';
import {CustomHeader as Header, Home, Login, CreateEvent} from "./components"
import {connect} from "react-redux";


const {Sider, Content} = Layout;


function App() {
    const match = useMatch({path: "/", end: true});

    const [collapsed, setCollapsed] = useState(true);

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logotype">
                    <Link to="/">
                        <Avatar className="logoImage" src="./assets/images/logo.png"/>
                    </Link>
                </div>
                <Menu theme="dark" mode="inline">
                    <Menu.Item className={match?.pathname === "/" ? "ant-menu-item-selected" : ""} key="1"
                               icon={<HomeOutlined/>}>
                        <Link to="/">Главная</Link>
                    </Menu.Item>
                    <Menu.Item className={match === null ? "ant-menu-item-selected" : ""} key="2"
                               icon={<AppstoreAddOutlined />}>
                        <Link to="/event">Бронирование</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="layout" style={{minHeight: '100vh'}}>
                <Header setCollapsed={setCollapsed} collapsed={collapsed} />
                <Content className="mainContent">
                    <Routes>
                        <Route exact path="/" element={<Home/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/event" element={<CreateEvent/>}/>
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

