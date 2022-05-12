import React, {useEffect} from 'react';
import {Avatar, Button, Col, Layout, Popover, Row, Typography} from "antd";
import {
    CaretDownOutlined,
    DashboardOutlined,
    LoginOutlined, LogoutOutlined,
    UserOutlined
} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logoutInitiate} from "../../redux/modules/auth";
import {getItemFromLocalStorage} from "../../redux/utils";

import './customHeader.css';

const { Header } = Layout;
const { Text } = Typography;

const CustomHeader = ({ logoutInitiate, auth, user, setUser }) => {
    const logoutUser = () => {
        logoutInitiate(user?.accessToken);
        setUser(null);
    }

    const content = () => {
      return (
          <div className='popover-content'>
              <Link to="/dashboard"><Button type="ghost"> <DashboardOutlined /> Панель управления</Button></Link>
              <Button type="primary" style={{display: 'block', width: '100%', margin: '10px 0 0 0'}} onClick={logoutUser}><LogoutOutlined/> Выйти</Button>
          </div>
      )
    }

    useEffect(() => {
        const user = getItemFromLocalStorage('auth');
        if (user) setUser(user);
    }, [auth.user, setUser]);

    return (
        <Header className="header" style={{padding: 0}}>
            <Row className="headerRow">
                <Col className="headerUserProfile">
                    {user ? (
                        <>
                            <Popover placement="bottomLeft" className='userProfilePopover' content={content} trigger="click">
                                <Avatar className="avatar" size={43} icon={<UserOutlined/>}/>
                                <div className="userInfo">
                                    <Text className="name">{user?.userInfo?.name + user?.userInfo?.lastName}</Text>
                                    <Text className="position">{user?.userInfo?.position}</Text>
                                </div>
                                <CaretDownOutlined style={{color: '#fff', marginLeft: '10px'}}/>
                            </Popover>
                        </>
                    ) : (<Link to="/login" style={{marginRight: '15px'}}><Button type="primary"><LoginOutlined/> Войти</Button></Link>)}
                </Col>
            </Row>
        </Header>
    );
};

export default connect(
    ({ auth }) => ({ auth }),
    ({logoutInitiate: logoutInitiate})
)(CustomHeader);
