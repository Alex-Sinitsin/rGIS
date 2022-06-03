import React, {useEffect, useState} from 'react';

import "./profile.css";
import {Avatar, Button, Card, Col, Divider, Form, Input, Row, Typography} from "antd";
import {SaveOutlined, UserOutlined} from "@ant-design/icons";

const {Text} = Typography;

const Profile = ({user}) => {

    const {name, lastName, position, email, role} = user ? user : null;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.title = "Профиль пользователя - Сатурн ГИС";
    }, []);

    useEffect(() => {
        console.log(user)
    }, [user]);

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
                        <Form layout="vertical" className="changePasswordForm">
                            <Text strong style={{display: 'block', fontSize: '16px', color: '#009892', marginBottom: '15px'}}>Измененить пароль</Text>
                            <Form.Item
                                name="currentPassword"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Введите текущий пароль!',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input.Password placeholder="Текущий пароль" />
                            </Form.Item>
                            <Form.Item
                                name="newPassword"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Введите новый пароль!',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input.Password placeholder="Новый пароль" />
                            </Form.Item>
                            <Form.Item
                                name="confirmPassword"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Подтвердите пароль!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('newPassword') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Введенные пароли не совпадают!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password placeholder="Подтверждение пароля"/>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="change-password-button"
                                    loading={loading}
                                    icon={<SaveOutlined />}
                                    style={{width: '100%'}}
                                >
                                    Сохранить
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Profile;
