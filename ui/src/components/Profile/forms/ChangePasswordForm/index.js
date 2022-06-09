import React from 'react';
import {Alert, Button, Form, Input, Typography} from "antd";
import {SaveOutlined} from "@ant-design/icons";
import "./changePasswordForm.css";
const {Text} = Typography;

const ChangePasswordForm = ({form, changePassword, loading, errorMessage}) => {
    return (
        <Form form={form} layout="vertical" className="changePasswordForm" onFinish={changePassword}>
            <Text strong style={{display: 'block', fontSize: '16px', color: '#009892', marginBottom: '15px'}}>Измененить пароль</Text>
            {errorMessage && <Alert type="error" message={errorMessage} style={{marginBottom: '15px'}} showIcon />}
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
    );
};

export default ChangePasswordForm;
