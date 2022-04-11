import React, {useEffect, useState} from 'react';
import {Avatar, Button, Col, Layout, Row, Typography} from "antd";
import {LoginOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logoutInitiate} from "../../redux/modules/auth";
import {getItemFromLocalStorage} from "../../redux/utils";

const { Header } = Layout;
const { Text } = Typography;

const CustomHeader = ({ collapsed, setCollapsed, logoutInitiate, auth }) => {
    const [user, setUser] = useState(null);
    const logoutUser = () => {
        logoutInitiate(user?.accessToken);
        setUser(null);
    }

    useEffect(() => {
        const user = getItemFromLocalStorage('auth');
        if (user) setUser(user);
    }, [auth.user]);

    return (
        <Header className="header" style={{padding: 0}}>
            <Row className="headerRow">
                <Col span={2}>
                    <Button type='text' className="trigger"
                            style={{marginLeft: '15px', border: '1px solid #fff', borderRadius: '3px'}}
                            onClick={() => setCollapsed(!collapsed)}>
                        {collapsed ? <MenuUnfoldOutlined style={{color: '#fff'}}/> :
                            <MenuFoldOutlined style={{color: '#fff'}}/>}
                    </Button>
                </Col>
                <Col className="headerUserProfile" span={18}>
                    {user ? (
                        <>
                            <Avatar className="avatar" size={43} icon={<UserOutlined/>}/>
                            <div className="userInfo">
                                <Text className="name">{user?.userInfo?.name + user?.userInfo?.lastName}</Text>
                                <Text className="position">{user?.userInfo?.position}</Text>
                            </div>
                            <Button type="primary" style={{marginLeft: '15px'}} onClick={logoutUser}><LogoutOutlined/> Выйти</Button>
                        </>
                    ) : (<Link to="/login"><Button type="primary"><LoginOutlined/> Войти</Button></Link>)}
                </Col>
            </Row>
        </Header>
    );
};

export default connect(
    ({ auth }) => ({ auth }),
    ({logoutInitiate: logoutInitiate})
)(CustomHeader);
