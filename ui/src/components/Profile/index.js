import React, {useEffect, useState} from 'react';

import "./profile.css";
import {Avatar, Card, Col, Divider, Form, message, Row, Typography} from "antd";
import {changeUserPassword as changeUserPasswordAction} from "../../redux/modules/users";
import {UserOutlined} from "@ant-design/icons";
import {ChangePasswordForm} from "../index";
import {connect} from "react-redux";

const {Text} = Typography;

const Profile = ({user, changeUserPassword}) => {

    const {name, lastName, position, email, role} = user ? user : null;
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [changePasswordForm] = Form.useForm();

    useEffect(() => {
        document.title = "Профиль пользователя - Сатурн ГИС";
    }, []);
    
    const changePassword = (values) => {
        message.config({
            top: 70,
            duration: 5,
            maxCount: 3,
        });
        setLoading(true)
        changeUserPassword(values)
            .then(res => {
                if (res.status === "success") {
                    setErrorMessage(null);
                    setTimeout(() => {
                        message.success(res.message);
                        setLoading(false);
                        changePasswordForm.resetFields();
                    }, 500)
                }
            })
            .catch(error => {
                setTimeout(() => {setLoading(false); setErrorMessage(error.message);}, 500)
            })
    }

    return (
        <>
            <Row className="profileContainer">
                <Col span={16}>
                    <Card className="profile-card" style={{ borderColor: '#CFD8DC'}}>
                        <div className="userAvatar">
                            <Avatar shape="square" size={160} icon={<UserOutlined />} style={{ color: '#2c7700', backgroundColor: '#87d068', borderRadius: '3px' }} />
                        </div>
                        <div className="userInfo">
                            <div className="mainInfo">
                                <Text strong style={{fontSize: '26px', display: "block", letterSpacing: '0.07em'}}>{user ? name + " " + lastName : ""}</Text>
                                <Text style={{color: '#009892', letterSpacing: '0.1em'}} strong>{user ? position : ""}</Text>
                            </div>
                            <Divider style={{margin: '16px 0'}}/>
                            <div className="additionInfo">
                                <span style={{display: 'block', fontSize: '16px', letterSpacing: '0.07em'}}>
                                    <Text strong>E-Mail: </Text>
                                    <Text>{user ? email : ""}</Text>
                                </span>
                                <span style={{display: 'block', fontSize: '16px', letterSpacing: '0.07em'}}>
                                    <Text strong>Роль: </Text>
                                    <Text>{user && role === "Admin" ? "Администратор" : "Пользователь"}</Text>
                                </span>
                            </div>
                        </div>
                        <Divider />
                        <ChangePasswordForm
                            form={changePasswordForm}
                            errorMessage={errorMessage}
                            changePassword={changePassword}
                            loading={loading}
                        />
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default connect(
    null,
    ({changeUserPassword: changeUserPasswordAction})
)(Profile);
