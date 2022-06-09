import React from 'react';
import {Avatar, Button, Col, Layout, Popover, Row, Typography} from "antd";
import {
    CaretDownOutlined,
    DashboardOutlined, LoginOutlined,
    LogoutOutlined, ProfileOutlined,
    UserOutlined
} from "@ant-design/icons";
import {Link, useNavigate} from "react-router-dom";
import {connect} from "react-redux";
import {logoutInitiate} from "../../redux/modules/auth";

import './customHeader.css';

const { Header } = Layout;
const { Text } = Typography;

const CustomHeader = ({ logoutInitiate, user, setUser}) => {
    const navigate = useNavigate();

    const logoutUser = () => {
        logoutInitiate(user?.accessToken);
        setUser(null);
        navigate("/login");
    }

    const content = () => {
      return (
          <div className='popover-content'>
              {user.userInfo.role === 'Admin' && <Link to="/dashboard"><Button type="ghost"> <DashboardOutlined /> Панель управления</Button></Link>}
              <Link to="/profile"><Button type="ghost" style={{display: 'block', minWidth: '188px', width: '100%', margin: '10px 0 0 0', textAlign: 'left', padding: '0 22px'}}><ProfileOutlined /> Профиль</Button></Link>
              <Button type="primary" style={{display: 'block', minWidth: '188px', width: '100%', margin: '10px 0 0 0'}} onClick={logoutUser}><LogoutOutlined/> Выйти из системы</Button>
          </div>
      )
    }

    return (
        <Header className="header" style={{padding: 0}}>
            <Row className="headerRow">
                <Col xl={{span: 22}} lg={{span: 21}} md={{span: 20}} sm={{span: 19}} span={16} className='headerLogo'>{!user ? <Avatar className="logoImage" src="/assets/images/logo.png" style={{marginLeft: '15px'}}/> : null}</Col>
                <Col className="headerUserProfile">
                    {user ? (
                        <>
                            <Popover placement="bottomLeft" className='userProfilePopover' content={content} trigger="click">
                                <Avatar className="avatar" size={43} icon={<UserOutlined/>}/>
                                <div className="userInfo">
                                    <Text className="name">{user?.userInfo?.name + " " + user?.userInfo?.lastName}</Text>
                                    <Text className="position">{user?.userInfo?.position}</Text>
                                </div>
                                <CaretDownOutlined style={{color: '#fff', marginLeft: '10px'}}/>
                            </Popover>
                        </>
                    ) : (<div className="signInBlock"><Link to="/login" style={{marginRight: '15px'}}><Button type="primary"><LoginOutlined/> Войти</Button></Link></div>)}
                </Col>
            </Row>
        </Header>
    );
};

export default connect(
    null,
    ({logoutInitiate: logoutInitiate})
)(CustomHeader);
