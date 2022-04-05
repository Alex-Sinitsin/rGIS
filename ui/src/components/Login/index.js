import React from 'react';
import { Form, Input, Button } from 'antd';
import {MailOutlined, LockOutlined, LoginOutlined} from '@ant-design/icons';

import "./login.css";
import Title from "antd/es/typography/Title";

const Login = props => {

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
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

export default Login;
