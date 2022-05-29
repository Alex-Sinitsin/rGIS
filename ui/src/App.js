import React, {useState} from 'react';
import './App.css';

import {
    Routes,
    Route,
    Link,
    useMatch,
} from "react-router-dom";

import {Avatar, Layout, Menu} from 'antd';
import {
    AppstoreAddOutlined, AppstoreOutlined, DashboardOutlined,
    HomeOutlined, UserSwitchOutlined,
} from '@ant-design/icons';
import {CustomHeader as Header, Home, Login, CreateEvent, Dashboard, AdminUsers, AdminItems, ForbiddenElement} from "./components"
import {connect} from "react-redux";
import moment from "moment";

const {Sider, Content} = Layout;

function App() {
    const [user, setUser] = useState(null);
    const [isTokenExpired, setIsTokenExpired] = useState(false);
    const pathnameLocation = window.location.pathname;
    const match = useMatch({path: pathnameLocation, end: true});

    const checkJwtTokenDate = (token) => {
        if (token) {
            const payload = JSON.parse(atob(token.split(".")[1]));
            const expiration = payload && moment(payload.exp * 1000).format('YYYY-MM-DD HH:mm:ss');
            const dateNow = moment().format('YYYY-MM-DD HH:mm:ss');
            setIsTokenExpired(dateNow > expiration);
        } else return null;
    }

    return (
        <Layout>
            {user &&
                <Sider trigger={null} collapsible collapsed={true}>
                    <div className="logotype">
                        <Link to="/">
                            <Avatar className="logoImage" src="/assets/images/logo.png"/>
                        </Link>
                    </div>
                    <Menu theme="dark" mode="inline">
                        <Menu.Item className={match.pathname === '/' ? "ant-menu-item-selected" : ""} key="1"
                                   icon={<HomeOutlined/>}>
                            <Link to="/">Главная</Link>
                        </Menu.Item>
                        <Menu.Item className={match.pathname === '/booking' ? "ant-menu-item-selected" : ""} key="2"
                                   icon={<AppstoreAddOutlined/>}>
                            <Link to="/booking">Бронирование</Link>
                        </Menu.Item>
                        {user?.userInfo?.role === "Admin" &&
                            <Menu.SubMenu title='Панель управления'
                                          className={
                                              match.pathname === '/dashboard' ||
                                              match.pathname === '/dashboard/users' ||
                                              match.pathname === '/dashboard/items'
                                                  ? "ant-menu-item-selected" : ""
                                          }
                                          key='3' mode={'inline'} icon={<DashboardOutlined/>}>
                                <Menu.Item key="3.1">
                                    <Link to="/dashboard/items"><AppstoreOutlined style={{marginRight: '10px'}}/>Помещения / объекты</Link>
                                </Menu.Item>
                                <Menu.Item key="3.2">
                                    <Link to="/dashboard/users"><UserSwitchOutlined style={{marginRight: '10px'}}/>Пользователи</Link>
                                </Menu.Item>
                            </Menu.SubMenu>
                        }
                    </Menu>
                </Sider>
            }
            <Layout className="layout" style={{minHeight: '100vh'}}>
                <Header user={user} setUser={setUser} isTokenExp={isTokenExpired} setIsTokenExp={setIsTokenExpired} checkJWT={checkJwtTokenDate}/>
                <Content className="mainContent">
                    <Routes>
                        <Route exact path="/" element={user ? <Home user={user} /> : <ForbiddenElement /> }/>
                        <Route path="/login" element={<Login user={user}/>}/>
                        <Route path="/booking" element={user ? <CreateEvent user={user} /> : <ForbiddenElement />}/>
                        <Route path="/dashboard" element={user ? <Dashboard/> : <ForbiddenElement />}/>
                        <Route path="/dashboard/users" element={user ? <AdminUsers/> : <ForbiddenElement />}/>
                        <Route path="/dashboard/items" element={user ? <AdminItems/> : <ForbiddenElement />}/>
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

