import React from 'react';
import {Button, Col, DatePicker, Form, Input, Row} from "antd";
import "./chooseEventData.css";
import TextArea from "antd/es/input/TextArea";
import 'moment/locale/ru'

const ChooseEventData = ({onFormFinish, data}) => {
    return (
        <Form layout={"vertical"} className="eventForm" onFinish={onFormFinish}>
            <Form.Item
                name="title"
                label="Название события"
                initialValue={data && data.title}
                rules={[
                    {
                        required: true,
                        message: 'Введите название события пожалуйста!',
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            <Row gutter={20}>
                <Col span={12}>
                    <Form.Item
                        name="startDateTime"
                        label="Дата и время начала события"
                        rules={[
                            {
                                required: true,
                                message: 'Заполните поле пожалуйста!',
                            },
                        ]}
                    >
                        <DatePicker format={'DD.MM.YYYY HH:mm'} showTime style={{width: '100%'}} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="endDateTime"
                        label="Дата и время конца события"
                        rules={[
                            {
                                required: true,
                                message: 'Заполните поле пожалуйста!',
                            },
                        ]}
                    >
                        <DatePicker format={'DD.MM.YYYY HH:mm'} showTime style={{width: '100%'}}/>
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item name="description" label="Примечание" initialValue={data && data.description}>
                <TextArea autoSize={{minRows: 4}} />
            </Form.Item>
            <Button type="primary" htmlType="submit" style={{position: 'absolute', right: '5px'}}>
                Далее
            </Button>
        </Form>
    );
};

export default ChooseEventData;
