import React, {useState} from 'react';
import {Col, Form, Input, Modal, Row} from "antd";

const AddUserModal = ({visible, onCancel, onCreate, hideModal}) => {

    const [form] = Form.useForm();
    const [confirmLoading, setConfirmLoading] = useState(false);

    return (
        <Modal
            title="Добавление нового пользователя"
            centered
            visible={visible}
            confirmLoading={confirmLoading}
            okText="Добавить"
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        setConfirmLoading(true);
                        onCreate(values)
                            .then(res => {
                                if (res.status === "success") {
                                    setTimeout(() => {
                                        setConfirmLoading(false);
                                        hideModal();
                                        form.resetFields();
                                    }, 1000);
                                }
                            })

                    })
                    .catch(_ => setTimeout(() => setConfirmLoading(false), 1000))
            }}
            onCancel={onCancel}
        >
            <Form form={form} layout="vertical" name="userForm">
                <Row gutter={20}>
                    <Col span={12}>
                        <Form.Item name="name" label="Имя пользователя"
                                   rules={[{required: true, message: 'Введите Имя пользователя'}]}>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="lastName" label="Фамилия пользователя"
                                   rules={[{required: true, message: 'Введите Фамилию пользователя'}]}>
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'Некорренктный формат E-mail!',
                        },
                        {
                            required: true,
                            message: 'Введите E-mail пользователя'
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="position"
                    label="Должность"
                    rules={[
                        {
                            required: true,
                            message: 'Введите Должность пользователя'
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Пароль"
                    rules={[
                        {
                            required: true,
                            message: 'Введите пароль!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    label="Подтверждение пароля"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Подтвердите пароль!',
                        },
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Введенные пароли не совпадают!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password/>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddUserModal;
