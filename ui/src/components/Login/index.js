import React, {useEffect} from 'react';
import {Form, Input, Button, Alert} from 'antd';
import {connect} from "react-redux";
import { useNavigate } from "react-router-dom";

import {MailOutlined, LockOutlined, LoginOutlined} from '@ant-design/icons';
import {loginInitiate} from "../../redux/modules/auth";

import "./login.css";
import Title from "antd/es/typography/Title";


const Login = ({loginInitiate, auth, user}) => {

    const navigate = useNavigate();

    useEffect(() => {
        if(user) navigate('/');
    },[auth.user, navigate, user]);

    const onFinish = (values) => {
        loginInitiate(values.email, values.password);
    };

    const validateMessages = {
        required: 'Поле обязательно для заполнения!',
        types: {
            email: 'Некорректный формат поля Email!',
        },
    };

    return (
        <div className="loginPageContainer">
            <Form
                name="loginForm"
                className="loginForm"
                validateMessages={validateMessages}
                onFinish={onFinish}
            >
                <Title className="login-form-title" level={3}>Авторизация</Title>
                {auth.error && <Alert type="error" message={auth?.error} style={{marginBottom: '15px'}} />}
                <Form.Item
                    name="email"
                    rules={[{ type: "email", required: true }]}
                >
                    <Input prefix={<MailOutlined className="login-form-item-icon" />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true }]}
                >
                    <Input
                        prefix={<LockOutlined className="login-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        <LoginOutlined /> Войти
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default connect(
    ({ auth }) => ({ auth }),
    ({loginInitiate: loginInitiate})
)(Login);
